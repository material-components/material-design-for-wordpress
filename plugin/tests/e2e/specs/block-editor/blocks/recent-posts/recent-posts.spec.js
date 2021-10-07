/**
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * WordPress dependencies
 */
import { createNewPost } from '@wordpress/e2e-test-utils';

/**
 * Internal dependencies
 */
import { insertBlock, selectBlockByName } from '../../../../utils';

describe( 'blocks: material/recent-posts', () => {
	beforeEach( async () => {
		await createNewPost( {} );
	} );

	it( 'should be inserted', async () => {
		await insertBlock( 'Recent Posts (Material)' );

		// Check if block was inserted
		expect(
			await page.$( '[data-type="material/recent-posts"]' )
		).not.toBeNull();
	} );

	it( 'should have a "Styles" radio selection attribute with Masonry being the default', async () => {
		await insertBlock( 'Recent Posts (Material)' );
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
		await insertBlock( 'Recent Posts (Material)' );
		await selectBlockByName( 'material/recent-posts' );

		expect(
			await page.$(
				`.components-input-control__input[aria-label="Columns"],
				.components-range-control__number[aria-label="Columns"]`
			)
		).not.toBeNull();
	} );

	// TODO: check that this control is not showing when "Style" is not Masonry or Grid
	it( 'should have a "Content layout" radio selection attribute with default being "Test above Media" ', async () => {
		await insertBlock( 'Recent Posts (Material)' );
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
		await insertBlock( 'Recent Posts (Material)' );
		await selectBlockByName( 'material/recent-posts' );

		expect(
			await page.$(
				`.components-input-control__input[aria-label="Number of posts"],
				.components-range-control__number[aria-label="Number of posts"]`
			)
		).not.toBeNull();
	} );

	it( 'should have an "Elevation style" radio selection attribute with default being global', async () => {
		await insertBlock( 'Recent Posts (Material)' );
		await selectBlockByName( 'material/recent-posts' );

		expect(
			await page.$x( "//label[contains(text(), 'Elevation style')]" )
		).toHaveLength( 1 );

		expect(
			await page.$x(
				"//label[contains(text(), 'Inherit from Global Settings')]/preceding-sibling::input[@type = 'radio' and @checked]"
			)
		).toHaveLength( 1 );
	} );

	it( 'should have a "Post date" toggle selection attribute with default being on', async () => {
		await insertBlock( 'Recent Posts (Material)' );
		await selectBlockByName( 'material/recent-posts' );

		expect(
			await page.$x(
				"//label[contains(text(), 'Post date')]/preceding-sibling::span/input[@type = 'checkbox' and @checked]"
			)
		).toHaveLength( 1 );
	} );

	it( 'should have a "Post excerpt" toggle selection attribute with default being on', async () => {
		await insertBlock( 'Recent Posts (Material)' );
		await selectBlockByName( 'material/recent-posts' );

		expect(
			await page.$x(
				"//label[contains(text(), 'Post excerpt')]/preceding-sibling::span/input[@type = 'checkbox' and @checked]"
			)
		).toHaveLength( 1 );
	} );

	// TODO: check that this control is not showing when "Post excerpt" is not selected
	it( 'should have a "Max number of words in post excerpt" range selection attribute with default being 20', async () => {
		await insertBlock( 'Recent Posts (Material)' );
		await selectBlockByName( 'material/recent-posts' );

		expect(
			await page.$(
				`.components-input-control__input[aria-label="Max number of words in post excerpt"],
				.components-range-control__number[aria-label="Max number of words in post excerpt"]`
			)
		).not.toBeNull();
	} );

	it( 'should have a "Featured image" toggle selection attribute with default being on', async () => {
		await insertBlock( 'Recent Posts (Material)' );
		await selectBlockByName( 'material/recent-posts' );

		expect(
			await page.$x(
				"//label[contains(text(), 'Featured image')]/preceding-sibling::span/input[@type = 'checkbox' and @checked]"
			)
		).toHaveLength( 1 );
	} );

	it( 'should have a "Comments count" toggle selection attribute with default being on', async () => {
		await insertBlock( 'Recent Posts (Material)' );
		await selectBlockByName( 'material/recent-posts' );

		expect(
			await page.$x(
				"//label[contains(text(), 'Comments count')]/preceding-sibling::span/input[@type = 'checkbox' and @checked]"
			)
		).toHaveLength( 1 );
	} );

	it( 'should have a "Post author" toggle selection attribute with default being on', async () => {
		await insertBlock( 'Recent Posts (Material)' );
		await selectBlockByName( 'material/recent-posts' );

		expect(
			await page.$x(
				"//label[contains(text(), 'Post author')]/preceding-sibling::span/input[@type = 'checkbox' and not(@checked)]"
			)
		).toHaveLength( 1 );
	} );

	// TODO: check the options in the selectbox
	it( 'should have a "Category" selectbox attribute', async () => {
		await insertBlock( 'Recent Posts (Material)' );
		await selectBlockByName( 'material/recent-posts' );
		expect(
			await page.$x( "//label[contains(text(), 'Category')]" )
		).toHaveLength( 1 );
	} );
} );
