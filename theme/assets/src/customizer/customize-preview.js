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

/* global jQuery */

/**
 * External dependencies
 */
import { debounce } from 'lodash';

/**
 * Internal dependencies
 */
import { masonryInit } from '../front-end/components/masonry';

import { ICONS as SWITCHER_ICONS } from '../../../../plugin/assets/src/front-end/dark-mode-switch';

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

	const updateColorMode = debounce( mode => {
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
