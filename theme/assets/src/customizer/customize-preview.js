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

/* global jQuery, materialDesignThemeColorControls */

( function( $ ) {
	const api = wp.customize;
	const parentApi = window.parent.wp.customize;

	Object.keys( materialDesignThemeColorControls ).forEach( control => {
		api( control, value => value.bind( generatePreviewStyles ) );
	} );

	// Site title and description.
	api( 'blogname', function( value ) {
		value.bind( function( to ) {
			$( '.site-title a' ).text( to );
		} );
	} );
	api( 'blogdescription', function( value ) {
		value.bind( function( to ) {
			$( '.site-description' ).text( to );
		} );
	} );

	// Header text color.
	api( 'header_textcolor', function( value ) {
		value.bind( function( to ) {
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
	api( 'material_archive_width', function( value ) {
		value.bind( function( to ) {
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
	 * @return {void}
	 */
	const generatePreviewStyles = () => {
		const stylesheetID = 'material-customizer-preview-styles';
		let stylesheet = $( '#' + stylesheetID ),
			styles = '';

		// If the stylesheet doesn't exist, create it and append it to <head>.
		if ( ! stylesheet.length ) {
			$( 'head' ).append( '<style id="' + stylesheetID + '"></style>' );
			stylesheet = $( '#' + stylesheetID );
		}

		// Generate the styles.
		Object.keys( materialDesignThemeColorControls ).forEach( control => {
			const cssVar = materialDesignThemeColorControls[ control ];
			const color = parentApi( control ).get();
			if ( ! color ) {
				return;
			}

			styles += `${ cssVar }: ${ color };`;
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

		// Header colors should fallback to primary colors.
		if ( ! styles.includes( '--mdc-theme-header' ) ) {
			styles += `--mdc-theme-header: var(--mdc-theme-primary);`;
			styles += `--mdc-theme-header-rgb: var(--mdc-theme-primary-rgb);`;
		}

		if ( ! styles.includes( '--mdc-theme-on-header' ) ) {
			styles += `--mdc-theme-on-header: var(--mdc-theme-on-primary);`;
			styles += `--mdc-theme-on-header-rgb: var(--mdc-theme-on-primary-rgb);`;
		}

		styles = `:root {
			${ styles }
		}`;

		// Add styles.
		stylesheet.html( styles );
	};

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
} )( jQuery );
