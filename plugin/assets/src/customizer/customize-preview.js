/**
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* global jQuery, _wpCustomizeSettings */
/* istanbul ignore file */

/**
 * Customizer enhancements for a better user experience.
 *
 * Contains handlers to make Customizer preview reload changes asynchronously.
 *
 * @since 1.0.0
 */

/**
 * External dependencies
 */
import debounce from 'lodash/debounce';
import {
	argbFromHex,
	themeFromSourceColor,
	applyTheme,
} from '@material/material-color-utilities';

/**
 * Internal dependencies
 */
import { STYLES } from './components/google-fonts-control/styles';
import { setConfig } from '../block-editor/utils/get-config';
import { applyRgbValue } from '../helper/apply-rgb-value';

const getIconFontName = iconStyle => {
	return iconStyle === 'filled'
		? 'Material Icons'
		: `Material Icons ${ iconStyle
				.replace( '-', ' ' )
				.replace( /(^\w{1})|(\s{1}\w{1})/g, match =>
					match.toUpperCase()
				) }`;
};

const HAS_DARK_MODE_CLASS = 'top-app-bar--has-dark-mode';
export const COLOR_MODES = {
	default: 'default',
	dark: 'dark',
};

( $ => {
	// Bail out if this isn't loaded in an iframe.
	if (
		! window.parent ||
		! window.parent.wp ||
		! window.parent._wpCustomizeSettings
	) {
		return;
	}

	const api = wp.customize;
	const parentApi = window.parent.wp.customize;
	const parentControls = window.parent._wpCustomizeSettings.controls;
	let colorControls = {};
	const typographyControls = {};
	const cornerStyleControls = {};
	const iconControls = {};
	const settingsControls = {};
	const defaultModeControls = {};
	const darkModeControls = {};

	$( function () {
		api.preview.bind( 'active', function () {
			api.preview.send( 'materialDesign', {
				notificationCount:
					_wpCustomizeSettings.values.material_design_notify,
			} );

			api.preview.bind( 'materialDesignPaletteUpdate', message => {
				updateColorMode( message );
			} );

			api.preview.bind(
				'materialDesignM3PaletteUpdate',
				( { color, isDarkMode } ) => {
					const intColor = argbFromHex( color );
					const colorPallete = themeFromSourceColor( intColor );
					setConfig( 'sourceColor', color );

					applyTheme( colorPallete, {
						target: document.body,
						dark: isDarkMode,
					} );

					applyRgbValue( colorPallete, {
						target: document.body,
						dark: isDarkMode,
					} );
				}
			);
		} );
	} );

	const generateCSSVarMappings = controls => {
		if ( ! controls ) {
			return;
		}

		Object.keys( controls ).forEach( control => {
			const args = controls[ control ];

			if (
				args &&
				!! args.cssVar &&
				( !! args.relatedTextSetting || !! args.relatedSetting )
			) {
				if ( COLOR_MODES.dark === args.colorModeType ) {
					darkModeControls[ control ] = args.cssVar;
				} else {
					// Save a refertence to default colors.
					defaultModeControls[ control ] = args.cssVar;
					colorControls[ control ] = args.cssVar;
				}
			}

			if ( args && args.cssVars && args.type === 'google_fonts' ) {
				typographyControls[ control ] = args.cssVars;
			}

			if ( args && !! args.cssVar && args.type === 'range_slider' ) {
				cornerStyleControls[ control ] = args;

				if ( args.children && Array.isArray( args.children ) ) {
					generateCSSVarMappings(
						args.children.reduce(
							( acc, childControl ) => ( {
								...acc,
								[ childControl.id ]: {
									...childControl,
									type: 'range_slider',
									cssVar: childControl.css_var,
									initialValue: childControl.initial_value,
								},
							} ),
							{}
						)
					);
				}
			}

			if ( args && !! args.cssVar && args.type === 'icon_radio' ) {
				iconControls[ control ] = args.cssVar;
			}

			if ( args && !! args.cssVar && args.type === 'style_settings' ) {
				settingsControls[ control ] = args.cssVar;
			}
		} );
	};

	generateCSSVarMappings( parentControls );

	/**
	 * Add styles to elements in the preview pane.
	 *
	 * @since 1.0.0
	 *
	 * @return {void}
	 */
	const generatePreviewStyles = debounce( () => {
		const stylesheetID = 'material-design-customizer-preview-styles';
		let stylesheet = $( '#' + stylesheetID ),
			styles = '';

		// If the stylesheet doesn't exist, create it and append it to <head>.
		if ( ! stylesheet.length ) {
			$( 'head' ).append( '<style id="' + stylesheetID + '"></style>' );
			stylesheet = $( '#' + stylesheetID );
		}

		Object.keys( typographyControls ).forEach( control => {
			if ( typographyControls[ control ].family ) {
				typographyControls[ control ].family.forEach( varName => {
					styles += `${ varName }: ${ parentApi( control ).get() };`;
				} );
			} else {
				const ruleValue = parentApi( control ).get();
				let rules;

				if ( ! ruleValue ) {
					return;
				}

				// Bail if json is invalid.
				try {
					rules = JSON.parse( ruleValue );
				} catch {
					return;
				}

				for ( const rule in rules ) {
					if (
						'style' === rule ||
						'undefined' === typeof rules[ rule ]
					) {
						return;
					}

					if ( 'size' === rule ) {
						styles += `${ typographyControls[ control ][ rule ] }: ${ rules[ rule ] }px !important;`;
					} else if ( 'tracking' === rule ) {
						// Compute tracking to line-height.
						const lineHeight = rules[ rule ] / ( rules.size || 16 );
						styles += `${ typographyControls[ control ][ rule ] }: ${ lineHeight }rem !important;`;
					} else if ( 'weight' === rule ) {
						const fontStyle = /italic$/.test( rules[ rule ] )
							? 'italic'
							: 'normal';
						const weight = [ 'regular', 'italic' ].includes(
							rules[ rule ]
						)
							? 400
							: parseInt( rules[ rule ], 10 );

						styles += `${ typographyControls[ control ].style }: ${ fontStyle } !important;`;
						styles += `${ typographyControls[ control ][ rule ] }: ${ weight } !important;`;
					} else {
						styles += `${ typographyControls[ control ][ rule ] }: ${ rules[ rule ] } !important;`;
					}
				}
			}
		} );

		Object.keys( cornerStyleControls ).forEach( control => {
			let settingValue = parentApi( control ).get();
			const args = cornerStyleControls[ control ];

			if ( 'number' === typeof args.min && settingValue < args.min ) {
				settingValue = args.min;
			}

			if ( 'number' === typeof args.max && settingValue > args.max ) {
				settingValue = args.max;
			}

			styles += `${ args.cssVar }: ${ settingValue }px;`;
		} );

		Object.keys( iconControls ).forEach( control => {
			styles += `${ iconControls[ control ] }: '${ getIconFontName(
				parentApi( control ).get()
			) }';`;
		} );

		Object.keys( settingsControls ).forEach( control => {
			const settings = parentApi( control ).get();

			toggleDarkModeSwitch( settings );
		} );

		styles = `body {
			${ styles }
		}
		`;

		// Add styles.
		stylesheet.html( styles );
	}, 300 );

	/**
	 * Update Google fonts CDN URL based on selected font families.
	 *
	 * @since 1.0.0
	 *
	 * @return {void}
	 */
	const updateGoogleFontsURL = debounce( () => {
		const fonts = [],
			baseURL = 'https://fonts.googleapis.com/css?family=';

		Object.keys( typographyControls ).forEach( control => {
			if ( ! /family]$/.test( control ) ) {
				return;
			}

			const selectedFont = parentApi( control ).get();

			fonts.push(
				selectedFont.replace( /\s/g, '+' ) +
					':' +
					Object.keys( STYLES ).join( ',' )
			);
		} );

		const $fontStyle = $( '#material-google-fonts-cdn-css' );
		const fontURL = `${ baseURL }${ [ ...new Set( fonts ) ].join( '|' ) }`;

		if ( $fontStyle.attr( 'href' ) !== fontURL ) {
			$fontStyle.attr(
				'href',
				`${ baseURL }${ [ ...new Set( fonts ) ].join( '|' ) }`
			);
		}
	}, 300 );

	/**
	 * Toggle dark mode button based on user choice.
	 *
	 * @param {string} value Current settings value
	 *
	 * @return {void}
	 */
	const toggleDarkModeSwitch = debounce( value => {
		const darkModeData =
			'string' === typeof value ? JSON.parse( value ) : value;

		const topAppBar = document.querySelector( '.mdc-top-app-bar' );

		if ( ! topAppBar ) {
			return;
		}

		if ( darkModeData.switcher ) {
			topAppBar.classList.add( HAS_DARK_MODE_CLASS );
		} else {
			topAppBar.classList.remove( HAS_DARK_MODE_CLASS );
		}
	}, 300 );

	const updateColorMode = debounce( mode => {
		if ( COLOR_MODES.dark === mode ) {
			colorControls = darkModeControls;
		} else {
			colorControls = defaultModeControls;
		}

		document.body.removeAttribute( 'data-color-scheme' );

		generatePreviewStyles();
	}, 300 );

	/**
	 * Generate preview styles for any control value change.
	 */
	Object.keys( colorControls )
		.concat( Object.keys( cornerStyleControls ) )
		.concat( Object.keys( typographyControls ) )
		.concat( Object.keys( iconControls ) )
		.concat( Object.keys( settingsControls ) )
		.concat( Object.keys( darkModeControls ) )
		.forEach( control => {
			parentApi( control, value => {
				value.bind( () => {
					if ( typographyControls.hasOwnProperty( control ) ) {
						updateGoogleFontsURL();
					}

					if ( settingsControls.hasOwnProperty( control ) ) {
						toggleDarkModeSwitch( value.get() );
					}

					generatePreviewStyles();
				} );
			} );
		} );

	// Load all material icon styles in preview.
	$( 'head' ).append(
		'<link href="https://fonts.googleapis.com/css?family=Material+Icons|Material+Icons+Outlined|Material+Icons+Two+Tone|Material+Icons+Round|Material+Icons+Sharp" rel="stylesheet">'
	);
} )( jQuery );
