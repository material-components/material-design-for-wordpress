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

	document
		.querySelector( '.material-notice-container a.install-theme' )
		.addEventListener( 'click', event => {
			const className = event.target.className,
				matches = ( className || '' ).match(
					/material-theme-(install|activate)/
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
