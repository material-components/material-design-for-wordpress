/* global page */

/**
 * Switches editor mode.
 *
 * @param {string} mode String editor mode.
 */
export async function switchEditorModeTo( mode ) {
	if ( mode === 'Code' ) {
		await page.evaluate( () => {
			window.wp.data.dispatch( 'core/edit-post' ).switchEditorMode( 'text' );
		} );
	} else {
		await page.evaluate( () => {
			window.wp.data.dispatch( 'core/edit-post' ).switchEditorMode( 'visual' );
		} );
	}
}
