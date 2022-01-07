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

/**
 * Customizer enhancements for a better user experience.
 *
 * Contains extra logic for our Customizer controls & settings.
 *
 * @since 1.0.0
 */

/* global jQuery, materialDesignThemeColorControls, materialDesignThemeColorControlsDark, materialDesignThemeColorControlsTheme */

/**
 * External dependencies
 */
import { debounce } from 'lodash';

/**
 * Internal dependencies
 */
import { masonryInit } from '../front-end/components/masonry';
import { ICONS as SWITCHER_ICONS } from '../front-end/components/dark-mode-switch';

export const COLOR_MODES = {
	default: 'default',
	dark: 'dark',
	contrast: 'contrast',
};

const api = window.wp.customize;

( function ( $ ) {
	// Bail out if this isn't loaded in an iframe.
	if (
		! window.parent ||
		! window.parent.wp ||
		! window.parent._wpCustomizeSettings
	) {
		return;
	}

	const parentApi = window.parent.wp.customize;

	Object.keys( materialDesignThemeColorControls ).forEach( control => {
		api( control, value =>
			value.bind( () =>
				generatePreviewStyles( materialDesignThemeColorControls )
			)
		);
	} );

	if ( materialDesignThemeColorControlsDark ) {
		Object.keys( materialDesignThemeColorControlsDark ).forEach(
			control => {
				api( control, value =>
					value.bind( () =>
						generatePreviewStyles(
							materialDesignThemeColorControlsDark
						)
					)
				);
			}
		);
	}

	$( function () {
		api.preview.bind( 'active', function () {
			api.preview.bind( 'materialDesignThemePaletteUpdate', message => {
				updateColorMode( message );
			} );
		} );
	} );

	// Site title and description.
	api( 'blogname', function ( value ) {
		value.bind( function ( to ) {
			$( '.site-title a' ).text( to );
		} );
	} );
	api( 'blogdescription', function ( value ) {
		value.bind( function ( to ) {
			$( '.site-description' ).text( to );
		} );
	} );

	// Header text color.
	api( 'header_textcolor', function ( value ) {
		value.bind( function ( to ) {
			if ( 'blank' === to ) {
				$( '.site-title, .site-description' ).css( {
					clip: 'rect(1px, 1px, 1px, 1px)',
					position: 'absolute',
				} );
			} else {
				$( '.site-title, .site-description' ).css( {
					clip: 'auto',
					position: 'relative',
				} );
				$( '.site-title a, .site-description' ).css( {
					color: to,
				} );
			}
		} );
	} );

	// Archive width
	api( 'archive_width', function ( value ) {
		value.bind( function ( to ) {
			if ( 'wide' === to ) {
				$( '.content-area' ).removeClass( 'material-archive__normal' );
				$( '.content-area' ).addClass( 'material-archive__wide' );
			} else {
				$( '.content-area' ).removeClass( 'material-archive__wide' );
				$( '.content-area' ).addClass( 'material-archive__normal' );
			}
		} );
	} );

	/**
	 * Add styles to elements in the preview pane.
	 *
	 * @since 1.0.0
	 *
	 * @param {Array} selectedControls Variables to generate.
	 *
	 * @return {void}
	 */
	const generatePreviewStyles = selectedControls => {
		const stylesheetID = 'material-customizer-preview-styles';
		let stylesheet = $( '#' + stylesheetID ),
			footerStylesheet = $( `.${ stylesheetID }` ),
			styles = '',
			darkStyles = '',
			lightStyles = '';

		// If the stylesheet doesn't exist, create it and append it to <head>.
		if ( ! stylesheet.length ) {
			$( 'head' ).append( '<style id="' + stylesheetID + '"></style>' );
			stylesheet = $( '#' + stylesheetID );
		}
		if ( ! footerStylesheet.length ) {
			// FSE appends to head and footer both.
			$( 'body' ).append(
				'<style class="' + stylesheetID + '"></style>'
			);
		}

		// Generate the styles.
		Object.keys( selectedControls ).forEach( control => {
			const cssVar = selectedControls[ control ];
			const color = parentApi( control ).get();
			if ( ! color ) {
				return;
			}

			styles += `${ cssVar }: ${ color };`;
			if ( materialDesignThemeColorControlsTheme[ control ] ) {
				styles += `${ materialDesignThemeColorControlsTheme[ control ] }: ${ color };`;
			}
			styles += `${ cssVar }-rgb: ${ hexToRgb( color ).join( ',' ) };`;

			if ( '--mdc-theme-background' === cssVar ) {
				styles += `
					--mdc-theme-text-primary-on-background: rgba(--mdc-theme-on-background-rgb, 0.87);
					--mdc-theme-text-secondary-on-background: rgba(--mdc-theme-on-background-rgb, 0.54);
					--mdc-theme-text-hint-on-background: rgba(--mdc-theme-on-background-rgb, 0.38);
					--mdc-theme-text-disabled-on-background: rgba(--mdc-theme-on-background-rgb, 0.38);
					--mdc-theme-text-icon-on-background: rgba(--mdc-theme-on-background-rgb, 0.38);`;
			}
		} );

		// Generate the styles.
		Object.keys( materialDesignThemeColorControlsDark ).forEach(
			control => {
				const cssVar = materialDesignThemeColorControlsDark[ control ];
				const color = parentApi( control ).get();
				if ( ! color ) {
					return;
				}

				darkStyles += `${ cssVar }: ${ color };`;
				if ( materialDesignThemeColorControlsTheme[ control ] ) {
					darkStyles += `${ materialDesignThemeColorControlsTheme[ control ] }: ${ color };`;
				}
				darkStyles += `${ cssVar }-rgb: ${ hexToRgb( color ).join(
					','
				) };`;

				if ( '--mdc-theme-background' === cssVar ) {
					darkStyles += `
					--mdc-theme-text-primary-on-background: rgba(--mdc-theme-on-background-rgb, 0.87);
					--mdc-theme-text-secondary-on-background: rgba(--mdc-theme-on-background-rgb, 0.54);
					--mdc-theme-text-hint-on-background: rgba(--mdc-theme-on-background-rgb, 0.38);
					--mdc-theme-text-disabled-on-background: rgba(--mdc-theme-on-background-rgb, 0.38);
					--mdc-theme-text-icon-on-background: rgba(--mdc-theme-on-background-rgb, 0.38);`;
				}
			}
		);

		// Generate the styles.
		Object.keys( materialDesignThemeColorControls ).forEach( control => {
			const cssVar = materialDesignThemeColorControls[ control ];
			const color = parentApi( control ).get();

			if ( ! color ) {
				return;
			}

			lightStyles += `${ cssVar }: ${ color };`;
			if ( materialDesignThemeColorControlsTheme[ control ] ) {
				lightStyles += `${ materialDesignThemeColorControlsTheme[ control ] }: ${ color };`;
			}
			lightStyles += `${ cssVar }-rgb: ${ hexToRgb( color ).join(
				','
			) };`;

			if ( '--mdc-theme-background' === cssVar ) {
				lightStyles += `
					--mdc-theme-text-primary-on-background: rgba(--mdc-theme-on-background-rgb, 0.87);
					--mdc-theme-text-secondary-on-background: rgba(--mdc-theme-on-background-rgb, 0.54);
					--mdc-theme-text-hint-on-background: rgba(--mdc-theme-on-background-rgb, 0.38);
					--mdc-theme-text-disabled-on-background: rgba(--mdc-theme-on-background-rgb, 0.38);
					--mdc-theme-text-icon-on-background: rgba(--mdc-theme-on-background-rgb, 0.38);`;
			}
		} );

		styles = `body {
			${ styles }

			body[data-color-scheme="dark"] {
				${ darkStyles }
			}

			body[data-color-scheme="light"] {
				${ lightStyles }
			}
		}`;

		// Add styles.
		stylesheet.html( styles );
		footerStylesheet.html( styles );
	};

	const updateColorMode = debounce( mode => {
		let colorControls;

		if ( COLOR_MODES.dark === mode ) {
			colorControls = materialDesignThemeColorControlsDark;
		} else {
			colorControls = materialDesignThemeColorControls;
		}

		generatePreviewStyles( colorControls );

		const switcherIcon = document.querySelector( '.dark-mode__button' );

		if ( ! switcherIcon ) {
			return;
		}

		if ( 'dark' === mode ) {
			switcherIcon.innerText = SWITCHER_ICONS.LIGHT_MODE;
		} else {
			switcherIcon.innerText = SWITCHER_ICONS.DARK_MODE;
		}
	}, 300 );

	const hexToRgb = hex =>
		! hex
			? []
			: hex
					.replace(
						/^#?([a-f\d])([a-f\d])([a-f\d])$/i,
						( m, r, g, b ) => '#' + r + r + g + g + b + b
					)
					.substring( 1 )
					.match( /.{2}/g )
					.map( x => parseInt( x, 16 ) );

	api.selectiveRefresh.bind(
		'partial-content-rendered',
		function ( placement ) {
			if ( 'archive_layout' !== placement.partial.id ) {
				return;
			}

			masonryInit();
		}
	);
} )( jQuery );
