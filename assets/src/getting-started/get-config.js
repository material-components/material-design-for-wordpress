/* istanbul ignore file */

/**
 * Get Material Getting Started Module config value.
 *
 * @param {string} name Name of the config value to retrieve.
 * @return {string|Object|undefined} Value of config.
 */
const getConfig = name => {
	const configData = window.mtbGsm;

	if ( undefined === configData ) {
		return undefined;
	}

	return configData[ name ];
};

export default getConfig;
