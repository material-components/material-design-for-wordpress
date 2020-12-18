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

/* istanbul ignore file */

/**
 * WordPress dependencies
 */
import apiFetch from '@wordpress/api-fetch';
import domReady from '@wordpress/dom-ready';

/**
 * Internal dependencies
 */
import getConfig from './get-config';

const initNotificationActions = () => {
	let requesting = false;

	const actionButton = document.querySelector(
		'.material-notice-container a.install-theme'
	);

	if ( ! actionButton ) {
		return;
	}

	actionButton.addEventListener( 'click', event => {
		const className = event.target.className,
			matches = ( className || '' ).match(
				/material-design-(install|activate)/
			);

		let action = '';

		if ( matches && matches[ 1 ] ) {
			action = matches[ 1 ];
		}

		if ( 'activate' !== action && 'install' !== action ) {
			return;
		}

		event.preventDefault();

		if ( requesting ) {
			return;
		}

		requesting = true;

		const span = document.createElement( 'span' );
		span.setAttribute( 'class', 'spinner is-active' );
		event.target.appendChild( span );

		const requestArgs = {
			path: `${ getConfig( 'restPath' ) }${ action }-theme`,
			method: 'POST',
			headers: {
				'X-WP-Nonce': getConfig( 'nonce' ),
			},
		};

		apiFetch( requestArgs )
			.then( () => {
				if ( 'install' === action ) {
					requestArgs.path = `${ getConfig( 'restPath' ) }activate-theme`;

					apiFetch( requestArgs )
						.then( () => ( window.location.href = getConfig( 'redirect' ) ) )
						.catch( error => console.error( error ) );
				} else {
					window.location.href = getConfig( 'redirect' );
				}
			} )
			.catch( error => console.error( error ) );
	} );
};

domReady( initNotificationActions );
