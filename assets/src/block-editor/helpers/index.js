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
		const { name, settings } = blocks( modulePath );

		registerBlockType( name, settings );
	} );
};
