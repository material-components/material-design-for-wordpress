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

/**
 * Internal dependencies
 */
import colorUtils from '../common/color-utils';
import { STYLES } from '../customizer/components/google-fonts-control/styles';

const getIconFontName = iconStyle => {
	return iconStyle === 'filled'
		? 'Material Icons'
		: `Material Icons ${ iconStyle
				.replace( '-', ' ' )
				.replace( /(^\w{1})|(\s{1}\w{1})/g, match => match.toUpperCase() ) }`;
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
	const colorControls = {};
	const typographyControls = {};
	const cornerStyleControls = {};
	const iconControls = {};

	$( function() {
		api.preview.bind( 'active', function() {
			api.preview.send( 'mtb', {
				notificationCount: _wpCustomizeSettings.values.mtb_notify,
			} );
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
				colorControls[ control ] = args.cssVar;
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
		const stylesheetID = 'mtb-customizer-preview-styles';
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
					if ( 'style' === rule || 'undefined' === typeof rules[ rule ] ) {
						return;
					}

					if ( 'size' === rule ) {
						styles += `${ typographyControls[ control ][ rule ] }: ${ rules[ rule ] }px !important;`;
					} else {
						const fontStyle = /italic$/.test( rules[ rule ] )
							? 'italic'
							: 'normal';
						const weight = [ 'regular', 'italic' ].includes( rules[ rule ] )
							? 400
							: parseInt( rules[ rule ], 10 );

						styles += `${ typographyControls[ control ].style }: ${ fontStyle } !important;`;
						styles += `${ typographyControls[ control ][ rule ] }: ${ weight } !important;`;
					}
				}
			}
		} );

		// Generate the styles.
		Object.keys( colorControls ).forEach( control => {
			const color = parentApi( control ).get(),
				colorRgb = colorUtils.hexToRgb( color ).join( ',' );

			styles += `${ colorControls[ control ] }: ${ color };
				${ colorControls[ control ] }-rgb: ${ colorRgb };
			`;
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

		styles = `:root {
			${ styles }
		}`;

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
	 * Generate preview styles for any control value change.
	 */
	Object.keys( colorControls )
		.concat( Object.keys( cornerStyleControls ) )
		.concat( Object.keys( typographyControls ) )
		.concat( Object.keys( iconControls ) )
		.forEach( control => {
			parentApi( control, value => {
				value.bind( () => {
					if ( typographyControls.hasOwnProperty( control ) ) {
						updateGoogleFontsURL();
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
