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

/**
 * Set focus to and element and move the cursor to end for contenteditable.
 *
 * @param {HTMLElement} element Element to set focus to.
 */
export const setFocusAndMoveCursorToEnd = element => {
	element.focus();

	if ( document && document.execCommand ) {
		// select all the content in the element
		document.execCommand( 'selectAll', false, null );

		// collapse selection to the end
		document.getSelection().collapseToEnd();
	}
};
