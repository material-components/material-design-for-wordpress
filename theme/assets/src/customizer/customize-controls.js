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

/* global jQuery */

/**
 * Customizer enhancements for a better user experience.
 *
 * Contains extra logic for our Customizer controls & settings.
 *
 * @since 1.0.0
 */

( ( $, api ) => {
	api.MoreOptionsControl = api.Control.extend( {
		ready() {
			const control = this;

			control.container
				.find( '.material-show-more-options' )
				.on( 'click', event => {
					event.preventDefault();

					if (
						control.params &&
						Array.isArray( control.params.controls )
					) {
						const display = $( event.target ).is( '.less-options' )
							? 'none'
							: 'list-item';

						hideOrShowControls( control.params.controls, display );
					}

					control.container.parent().toggleClass( 'show-options' );
				} );

			if ( control.params && Array.isArray( control.params.controls ) ) {
				hideOrShowControls( control.params.controls, 'none' );
			}
		},
	} );

	/**
	 * Extends wp.customize.controlConstructor with custom controls.
	 */
	$.extend( api.controlConstructor, {
		more_options: api.MoreOptionsControl,
	} );

	const hideOrShowControls = ( controls, display ) => {
		controls.forEach( controlId => {
			const colorControl = api.control( controlId );

			if ( colorControl ) {
				colorControl.container.css( 'display', display );
			}
		} );
	};

	const displayColorMode = event => {
		const { target } = event;

		if ( ! target ) {
			return;
		}

		const { palette } = target.dataset;

		if ( ! palette ) {
			return;
		}

		// Setup new colors.
		api.previewer.send( 'materialDesignThemePaletteUpdate', palette );
	};

	api.bind( 'ready', () => {
		api( 'archive_layout' ).bind( value => {
			const isCardLayout = 'card' === value;

			const controls = [
				'archive_card_options',
				'archive_comments',
				'archive_author',
				'archive_excerpt',
				'archive_date',
				'archive_outlined',
			];
			controls.forEach( control =>
				api.control( control ).active.set( isCardLayout )
			);
		} );

		const hideHeaderDescription = document.querySelector(
			'#customize-control-header_title_display'
		);

		const hideHeaderDescriptionEl = hideHeaderDescription.querySelector(
			'.description'
		);

		const colorModeTabs = document.querySelectorAll(
			'.material-design-section-tabs .material-design-tab-link'
		);

		if ( colorModeTabs ) {
			colorModeTabs.forEach( tab =>
				tab.addEventListener( 'click', displayColorMode )
			);
		}

		if ( hideHeaderDescription.querySelector( 'input:checked' ) ) {
			hideHeaderDescriptionEl.classList.add( '-display' );
		}

		api( 'header_title_display' ).bind( value => {
			if ( value ) {
				hideHeaderDescriptionEl.classList.add( '-display' );
			} else {
				hideHeaderDescriptionEl.classList.remove( '-display' );
			}
		} );
	} );
} )( jQuery, wp.customize );
