/**
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
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
import {
	createNewPost,
	getEditedPostContent,
	insertBlock,
} from '@wordpress/e2e-test-utils';

/**
 * Get Query without query id to match snapshot.
 *
 * @param {string} text string snapshot text.
 * @return {string} snapshot without query id.
 */
const getQueryWithoutId = text => {
	const regex = /(\"queryId\":\d{1,3}\,)/gm;
	return text.replace( regex, '' );
};

const maybe = process.env.JEST_ALLOW_SKIP_CARD ? describe.skip : describe;

maybe( 'blocks: Material card and image card', async () => {
	beforeEach( async () => {
		await createNewPost( { postType: 'page', title: `Query Page` } );
	} );

	it( 'match material card', async () => {
		await insertBlock( 'Query Loop' );

		await page.waitForSelector(
			'.block-editor-block-pattern-setup__container .wp-block-post-title'
		);

		// This inserts a pattern with mdc-card for query.
		await page.waitForSelector(
			'li.pattern-slide.active-slide[aria-label="Query with material Card"]'
		);

		// Choose the selected pattern.
		const chooseButton = await page.waitForXPath(
			'//div[contains(@class, "block-editor-block-pattern-setup__actions")]//button[text()="Choose"]'
		);

		await chooseButton.click();

		// Wait for the block to be inserted and test if mdc-card is added.
		await page.waitForSelector( 'ul li:first-child .mdc-card.post-card' );

		// Test pagination first.
		await page.waitForSelector(
			'.wp-block-material-query-pagination-first'
		);

		// Test pagination previous.
		await page.waitForSelector(
			'.wp-block-material-query-pagination-previous'
		);

		// Test pagination next.
		await page.waitForSelector(
			'.wp-block-material-query-pagination-next'
		);

		// Test pagination last.
		await page.waitForSelector(
			'.wp-block-material-query-pagination-last'
		);

		const snapshot = await getEditedPostContent();
		// Snapshot.
		expect( getQueryWithoutId( snapshot ) ).toMatchSnapshot();
	} );

	it( 'match material image card', async () => {
		await insertBlock( 'Query Loop' );

		await page.waitForSelector(
			'.block-editor-block-pattern-setup__container .wp-block-post-title'
		);

		const nextPatternButton = await page.waitForSelector(
			'.block-editor-block-pattern-setup__navigation button[aria-label="Next pattern"]'
		);
		await nextPatternButton.click();

		// This inserts a pattern with mdc image card for query.
		await page.waitForSelector(
			'li.pattern-slide.active-slide[aria-label="Query with material image card."]'
		);

		// Choose the selected pattern.
		const chooseButton = await page.waitForXPath(
			'//div[contains(@class, "block-editor-block-pattern-setup__actions")]//button[text()="Choose"]'
		);

		await chooseButton.click();

		// Wait for the block to be inserted and test if mdc-card is added.
		await page.waitForSelector(
			'ul li:first-child .wp-block-material-image-card-query'
		);

		// Test pagination first.
		await page.waitForSelector(
			'.wp-block-material-query-pagination-first'
		);

		// Test pagination previous.
		await page.waitForSelector(
			'.wp-block-material-query-pagination-previous'
		);

		// Test pagination next.
		await page.waitForSelector(
			'.wp-block-material-query-pagination-next'
		);

		// Test pagination last.
		await page.waitForSelector(
			'.wp-block-material-query-pagination-last'
		);

		// Snapshot.
		const snapshot = await getEditedPostContent();
		// Snapshot.
		expect( getQueryWithoutId( snapshot ) ).toMatchSnapshot();
	} );
} );
