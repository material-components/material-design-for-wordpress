/* globals mtbWizard, mtbOnboarding, fetch */
/**
 * Functions that don't change the state of the world
 */

/**
 * Install theme if necessary
 * Activate theme
 *
 */
export const handleThemeActivation = () => {
	const action = mtbWizard.themeStatus;
	if ( 'ok' === action ) {
		return new Promise( resolve => {
			return resolve( 'ok' );
		} );
	}

	const parameters = {
		method: 'POST',
		headers: { 'X-WP-Nonce': mtbOnboarding.nonce },
	};

	return new Promise( ( resolve, reject ) => {
		fetch( `${ mtbOnboarding.restUrl }${ action }-theme`, parameters )
			.then( response => response.json() )
			.then( data => {
				if ( data.code ) {
					return reject( data );
				}

				if ( 'install' === action ) {
					fetch( `${ mtbOnboarding.restUrl }activate-theme`, parameters )
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
		headers: { 'X-WP-Nonce': mtbWizard.nonce },
	};

	return new Promise( ( resolve, reject ) => {
		fetch( `${ mtbWizard.restUrl }install-content`, parameters )
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
