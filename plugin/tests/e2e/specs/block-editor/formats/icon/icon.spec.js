/**
 * WordPress dependencies
 */
import {
	clickBlockAppender,
	getEditedPostContent,
	createNewPost,
	clickBlockToolbarButton,
	clickButton,
} from '@wordpress/e2e-test-utils';

describe( 'formats: adding inline icon', () => {
	beforeEach( async () => {
		await createNewPost( {} );
	} );

	it( 'should insert inline icon', async () => {
		// Create a paragraph.
		await clickBlockAppender();
		await page.keyboard.type( 'a ' );

		await clickBlockToolbarButton( 'More' );
		await clickButton( 'Inline icon' );

		// Wait for icon popover to appear
		await page.waitForSelector( '.components-inline-icon-popover' );

		// Insert icon into content
		await page.click( '.icons-container__icon__icon-btn' );

		// Check the content.
		const content =
			'<!-- wp:paragraph -->\n<p>a <span className="material-icons" class="material-icons">10k</span></p>\n<!-- /wp:paragraph -->';

		expect( await getEditedPostContent() ).toBe( content );
	} );
} );
