/**
 * WordPress dependencies
 */
import { createNewPost, insertBlock } from '@wordpress/e2e-test-utils';

import { selectBlockByName } from '../../../../utils';

describe( 'blocks: material/recent-posts', () => {
	beforeEach( async () => {
		await createNewPost( {} );
	} );

	it( 'should be inserted', async () => {
		await insertBlock( 'Recent Posts Cards' );

		// Check if block was inserted
		expect(
			await page.$( '[data-type="material/recent-posts"]' )
		).not.toBeNull();
	} );

	it( 'should have a "Styles" radio selection attribute with Masonry being the default', async () => {
		await insertBlock( 'Recent Posts Cards' );
		await selectBlockByName( 'material/recent-posts' );

		expect(
			await page.$x(
				"//input[contains(@type, 'radio') and contains(@value, 'masonry') and @checked]"
			)
		).toHaveLength( 1 );
		expect(
			await page.$x(
				"//input[contains(@type, 'radio') and contains(@value, 'list') and not(@checked)]"
			)
		).toHaveLength( 1 );
		expect(
			await page.$x(
				"//input[contains(@type, 'radio') and contains(@value, 'grid') and not(@checked)]"
			)
		).toHaveLength( 1 );
	} );

	// TODO: check that this control is not showing when "Style" is not Masonry or Grid
	it( 'should have a "Columns" range selection attribute with default being 3', async () => {
		await insertBlock( 'Recent Posts Cards' );
		await selectBlockByName( 'material/recent-posts' );

		expect(
			await page.$x(
				"//input[contains(@class, 'components-range-control__number') and contains(@aria-label, 'Columns') and contains(@value, '3')]"
			)
		).toHaveLength( 1 );
	} );

	// TODO: check that this control is not showing when "Style" is not Masonry or Grid
	it( 'should have a "Content layout" radio selection attribute with default being "Test above Media" ', async () => {
		await insertBlock( 'Recent Posts Cards' );
		await selectBlockByName( 'material/recent-posts' );

		expect(
			await page.$x(
				"//label[contains(text(), 'Text above media')]/preceding-sibling::input[1][contains(@type, 'radio') and @checked]"
			)
		).toHaveLength( 1 );

		expect(
			await page.$x(
				"//label[contains(text(), 'Text over media')]/preceding-sibling::input[1][contains(@type, 'radio') and not(@checked)]"
			)
		).toHaveLength( 1 );

		expect(
			await page.$x(
				"//label[contains(text(), 'Text under media')]/preceding-sibling::input[1][contains(@type, 'radio') and not(@checked)]"
			)
		).toHaveLength( 1 );
	} );

	it( 'should have a "Number of posts" range selection attribute with default being 12', async () => {
		await insertBlock( 'Recent Posts Cards' );
		await selectBlockByName( 'material/recent-posts' );

		expect(
			await page.$x(
				"//input[contains(@class, 'components-range-control__number') and contains(@aria-label, 'Number of posts') and contains(@value, '12')]"
			)
		).toHaveLength( 1 );
	} );

	it( 'should have an "Outlined" toggle selection attribute with default being off', async () => {
		await insertBlock( 'Recent Posts Cards' );
		await selectBlockByName( 'material/recent-posts' );

		expect(
			await page.$x(
				"//label[contains(text(), 'Outlined')]/preceding-sibling::span/input[@type = 'checkbox' and not(@checked)]"
			)
		).toHaveLength( 1 );
	} );

	it( 'should have a "Post date" toggle selection attribute with default being on', async () => {
		await insertBlock( 'Recent Posts Cards' );
		await selectBlockByName( 'material/recent-posts' );

		expect(
			await page.$x(
				"//label[contains(text(), 'Post date')]/preceding-sibling::span/input[@type = 'checkbox' and @checked]"
			)
		).toHaveLength( 1 );
	} );

	it( 'should have a "Post excerpt" toggle selection attribute with default being on', async () => {
		await insertBlock( 'Recent Posts Cards' );
		await selectBlockByName( 'material/recent-posts' );

		expect(
			await page.$x(
				"//label[contains(text(), 'Post excerpt')]/preceding-sibling::span/input[@type = 'checkbox' and @checked]"
			)
		).toHaveLength( 1 );
	} );

	// TODO: check that this control is not showing when "Post excerpt" is not selected
	it( 'should have a "Max number of words in post excerpt" range selection attribute with default being 20', async () => {
		await insertBlock( 'Recent Posts Cards' );
		await selectBlockByName( 'material/recent-posts' );

		expect(
			await page.$x(
				"//input[contains(@class, 'components-range-control__number') and contains(@aria-label, 'Max number of words in post excerpt') and contains(@value, '20')]"
			)
		).toHaveLength( 1 );
	} );

	it( 'should have a "Featured image" toggle selection attribute with default being on', async () => {
		await insertBlock( 'Recent Posts Cards' );
		await selectBlockByName( 'material/recent-posts' );

		expect(
			await page.$x(
				"//label[contains(text(), 'Featured image')]/preceding-sibling::span/input[@type = 'checkbox' and @checked]"
			)
		).toHaveLength( 1 );
	} );

	it( 'should have a "Comments count" toggle selection attribute with default being on', async () => {
		await insertBlock( 'Recent Posts Cards' );
		await selectBlockByName( 'material/recent-posts' );

		expect(
			await page.$x(
				"//label[contains(text(), 'Comments count')]/preceding-sibling::span/input[@type = 'checkbox' and @checked]"
			)
		).toHaveLength( 1 );
	} );

	it( 'should have a "Post author" toggle selection attribute with default being on', async () => {
		await insertBlock( 'Recent Posts Cards' );
		await selectBlockByName( 'material/recent-posts' );

		expect(
			await page.$x(
				"//label[contains(text(), 'Post author')]/preceding-sibling::span/input[@type = 'checkbox' and not(@checked)]"
			)
		).toHaveLength( 1 );
	} );

	// TODO: check the options in the selectbox
	it( 'should have a "Category" selectbox attribute', async () => {
		await insertBlock( 'Recent Posts Cards' );
		await selectBlockByName( 'material/recent-posts' );
		expect(
			await page.$x(
				"//label[contains(text(), 'Category')]/following-sibling::select"
			)
		).toHaveLength( 1 );
	} );
} );
