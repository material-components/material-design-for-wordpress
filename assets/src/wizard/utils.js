/* globals mtbWizard, mtbOnboarding, fetch */
/**
 * Functions that don't affect the state of the world
 */

/**
 * Install theme if necessary
 * Actvate theme
 *
 */
export const handleThemeActivation = () => {
	const action = mtbWizard.themeStatus;
	const parameters = {
		method: 'POST',
		headers: { 'X-WP-Nonce': mtbOnboarding.nonce },
	};

	fetch( `${ mtbOnboarding.restUrl }${ action }-theme`, parameters )
		.then( response => response.json() )
		.then( data => {
			if ( 'install' === action ) {
				fetch( `${ mtbOnboarding.restUrl }activate-theme`, parameters )
					.then( response => response.json() )
					.then( redirectToSettings );
			} else {
				redirectToSettings( data );
			}
		} );
};

/**
 * Import demo content
 */
export const handleDemoImporter = () => {
	const parameters = {
		method: 'POST',
		headers: { 'X-WP-Nonce': mtbWizard.nonce },
	};

	fetch( `${ mtbWizard.restUrl }install-content`, parameters )
		.then( response => response.json() )
		.then( redirectToSettings );
};

/**
 * Redirect to settings location
 * @param {*} data Request json response
 */
const redirectToSettings = data => {
	if ( 'success' === data.status ) {
		window.location.replace( mtbWizard.settingsUrl );
	}
};
