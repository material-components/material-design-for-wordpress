/**
 * Search and find a material icon by name.
 *
 * @param {string} icon Icon name or object.
 */
export default icon => {
	if ( 'string' === typeof icon || ! icon || ! icon.hasOwnProperty( 'name' ) ) {
		return icon;
	}

	return icon.name;
};
