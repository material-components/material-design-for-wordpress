/* global page */

/**
 * Remove all blocks from editor.
 */
export const removeAllBlocks = async () => {
	await page.evaluate( async () => {
		await wp.data
			.dispatch( 'core/block-editor' )
			.removeBlocks( wp.data.select( 'core/block-editor' ).getBlockOrder() );
	} );
};
