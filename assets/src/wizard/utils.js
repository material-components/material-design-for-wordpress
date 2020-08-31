/* globals fetch */

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

	const parameters = {
		method: 'POST',
		headers: { 'X-WP-Nonce': getConfig( 'nonce' ) },
	};

	return new Promise( ( resolve, reject ) => {
		fetch( `${ getConfig( 'restUrl' ) }${ action }-theme`, parameters )
			.then( response => response.json() )
			.then( data => {
				if ( data.code ) {
					return reject( data );
				}

				if ( 'install' === action ) {
					fetch( `${ getConfig( 'restUrl' ) }activate-theme`, parameters )
						.then( response => response.json() )
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
	const parameters = {
		method: 'POST',
		headers: { 'X-WP-Nonce': getConfig( 'nonce' ) },
	};

	return new Promise( ( resolve, reject ) => {
		fetch( `${ getConfig( 'restUrl' ) }install-content`, parameters )
			.then( response => response.json() )
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
