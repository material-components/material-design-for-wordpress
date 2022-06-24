/**
 * WordPress dependencies
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Registers the blocks with the proper settings.
 *
 * @param {Object} blocks The blocks to register.
 */
export const registerBlocks = blocks => {
	blocks.keys().forEach( modulePath => {
		const { name, settings, metadata } = blocks( modulePath );
		if ( typeof name !== 'string' ) {
			return;
		}
		registerBlockType( name, { ...settings, ...( metadata || {} ) } );
	} );
};

/**
 * Generates a template part Id based on slug and theme inputs.
 *
 * @param {string} theme the template part's theme.
 * @param {string} slug  the template part's slug
 * @return {string|null} the template part's Id.
 */
export const createTemplatePartId = ( theme, slug ) => {
	return theme && slug ? theme + '//' + slug : null;
};
