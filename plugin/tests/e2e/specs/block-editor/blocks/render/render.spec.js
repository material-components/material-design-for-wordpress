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
 * External dependencies
 */
import fs from 'fs';
import path from 'path';

/**
 * WordPress dependencies
 */
import { createNewPost } from '@wordpress/e2e-test-utils';

/**
 * Internal dependencies
 */
import { switchEditorModeTo } from '../../../../utils';

const blocksHTML = fs.readFileSync(
	path.join( __dirname, './', 'blocks.html' ),
	'utf-8'
);

describe( 'blocks: all', () => {
	beforeEach( async () => {
		await createNewPost( {} );
	} );

	it( 'should render all blocks', async () => {
		switchEditorModeTo( 'Code' );
		await page.waitForSelector( '.editor-post-text-editor' );

		await page.$eval(
			'.editor-post-text-editor',
			( el, value ) => ( el.value = value ),
			blocksHTML
		);

		const textEditor = await page.$( '.editor-post-text-editor' );
		await textEditor.click();
		await textEditor.press( 'Home', { delay: 50 } );
		await page.keyboard.type( ' ', { delay: 50 } );

		const postTitle = await page.$( '.editor-post-title__input' );
		await postTitle.click();
		await page.waitFor( 500 );

		switchEditorModeTo( 'Visual' );
		await page.waitForSelector( '.edit-post-visual-editor' );

		// Check if buttons block is rendered.
		expect(
			await page.$$( '[data-type="material/buttons"]' )
		).toHaveLength( 1 );

		// Check if button blocks are rendered.
		expect( await page.$$( '[data-type="material/button"]' ) ).toHaveLength(
			6
		);

		// Check if card block is rendered.
		expect( await page.$$( '[data-type="material/card"]' ) ).toHaveLength(
			1
		);

		// Check if cards-collections block is rendered.
		expect(
			await page.$$( '[data-type="material/cards-collection"]' )
		).toHaveLength( 1 );

		// Check if list block is rendered.
		expect( await page.$$( '[data-type="material/list"]' ) ).toHaveLength(
			1
		);

		// Check if material/data-table block is rendered.
		expect(
			await page.$$( '[data-type="material/data-table"]' )
		).toHaveLength( 1 );

		// Check if image-list block is rendered.
		expect( await page.$$( '.wp-block-material-image-list' ) ).toHaveLength(
			1
		);

		// Check if recent posts block is rendered.
		expect(
			await page.$$( '[data-type="material/recent-posts"]' )
		).toHaveLength( 1 );

		// Check if hand picked posts block is rendered.
		expect(
			await page.$$( '.wp-block-material-hand-picked-posts' )
		).toHaveLength( 1 );

		// Check if contact form block is rendered.
		expect(
			await page.$$( '[data-type="material/contact-form"]' )
		).toHaveLength( 1 );
	} );
} );
