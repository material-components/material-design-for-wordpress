/* istanbul ignore file */

/**
 * Get Material onboarding wizard config value.
 *
 * @param {string} name Name of the config value to retrieve.
 * @return {string|Object|undefined} Value of config.
 */
const getConfig = name => {
	const configData = window.mtb;

	if ( undefined === configData ) {
		return undefined;
	}

	return configData[ name ];
};

export default getConfig;
