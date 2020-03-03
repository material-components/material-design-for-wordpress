/**
 * WordPress dependencies
 */
import {
	createNewPost,
	insertBlock,
	publishPost,
} from '@wordpress/e2e-test-utils';

/**
 * WordPress dependencies
 */
import { clickButton } from '../../../utils';

describe( 'blocks: material/hello-world', () => {
	beforeEach( async () => {
		await createNewPost( {} );
	} );

	it( 'should be inserted', async () => {
		await insertBlock( 'Hello World' );

		// Check if block was inserted
		expect(
			await page.$( '[data-type="material/hello-world"]' )
		).not.toBeNull();
	} );

	it( 'should have the correct edit text', async () => {
		await insertBlock( 'Hello World' );

		const content = await page.$eval(
			'[data-type="material/hello-world"] h2',
			node => node.textContent
		);
		expect( content ).toStrictEqual( 'Hello Editor' );
	} );

	it( 'should have the correct save text', async () => {
		await insertBlock( 'Hello World' );

		await page.waitForSelector( '[data-type="material/hello-world"] h2' );
		await publishPost();

		await page.waitForSelector(
			'.post-publish-panel__postpublish-post-address input'
		);

		const url = await page.$eval(
			'.post-publish-panel__postpublish-post-address input',
			el => el.value
		);
		const edit = await page.url();

		await page.goto( url );
		await page.waitForSelector( '.wp-block-material-hello-world' );
		const content = await page.$eval(
			'.wp-block-material-hello-world',
			node => node.textContent
		);

		await page.goto( edit );
		await page.waitForSelector( '.editor-post-trash' );
		await clickButton( 'Move to Trash' );

		expect( content ).toStrictEqual( 'Hello Website' );
	} );
} );
