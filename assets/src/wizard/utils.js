/**
 * WordPress dependencies
 */
import apiFetch from '@wordpress/api-fetch';

/**
 * Internal dependencies
 */
import getConfig from '../admin/get-config';

/**
 * Functions that don't change the state of the world
 */

/**
 * Install theme if necessary
 * Activate theme
 *
 */
export const handleThemeActivation = () => {
	const action = getConfig( 'themeStatus' );
	if ( 'ok' === action ) {
		return new Promise( resolve => {
			return resolve( 'ok' );
		} );
	}

	return new Promise( ( resolve, reject ) => {
		apiFetch( {
			path: `${ getConfig( 'restPath' ) }${ action }-theme`,
			method: 'POST',
			headers: {
				'X-WP-Nonce': getConfig( 'nonce' ),
			},
		} )
			.then( data => {
				if ( data.code ) {
					return reject( data );
				}

				if ( 'install' === action ) {
					apiFetch( {
						path: `${ getConfig( 'restPath' ) }activate-theme`,
						method: 'POST',
						headers: {
							'X-WP-Nonce': getConfig( 'nonce' ),
						},
					} )
						.then( resolve )
						.catch( error => reject( error ) );
				} else {
					resolve( data );
				}
			} )
			.catch( error => reject( error ) );
	} );
};

/**
 * Import demo content
 *
 */
export const handleDemoImporter = () => {
	return new Promise( ( resolve, reject ) => {
		apiFetch( {
			path: `${ getConfig( 'restPath' ) }install-content`,
			method: 'POST',
			headers: {
				'X-WP-Nonce': getConfig( 'nonce' ),
			},
		} )
			.then( response => {
				if ( response.code ) {
					reject( response );
				} else {
					resolve( response );
				}
			} )
			.catch( error => reject( error ) );
	} );
};
