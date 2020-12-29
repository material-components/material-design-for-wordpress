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
import { selectBlockByName } from '../../../../utils';
import { insertBlockByKeyword } from '../../../../utils/insert-block';

describe( 'blocks: material/data-table core/table style', () => {
	it( 'should be inserted', async () => {
		await createNewPost( {} );
		await insertBlockByKeyword( 'Table' );
		const createButton = await page.$(
			'[data-type="core/table"] form [type="submit"]'
		);
		createButton.click();

		// Check if block was inserted
		expect( await page.$( '[data-type="core/table"]' ) ).not.toBeNull();
	} );

	it( 'should have a "Styles" selection with Material style added', async () => {
		await selectBlockByName( 'core/table' );
		const panels = await page.$$( '.components-panel__body-toggle' );

		if (
			'true' !==
			( await page.evaluate(
				el => el.getAttribute( 'aria-expanded' ),
				panels[ 0 ]
			) )
		) {
			await panels[ 0 ].click();
		}

		const styles = await page.$$( '.block-editor-block-styles__item-label' );
		expect( styles ).toHaveLength( 3 );
	} );

	it( 'should update table cell content', async () => {
		const tableCells = await page.$$(
			'.edit-post-visual-editor .wp-block-table .wp-block-table__cell-content'
		);
		await tableCells[ 0 ].focus();
		await page.keyboard.type( 'Column 1' );

		const content = await page.evaluate(
			() =>
				document.querySelectorAll(
					'.edit-post-visual-editor .wp-block-table .wp-block-table__cell-content'
				)[ 0 ].textContent
		);
		expect( content ).toBe( 'Column 1' );
	} );
} );

describe( 'blocks: material/data-table', () => {
	it( 'should be inserted', async () => {
		await createNewPost( {} );
		await insertBlockByKeyword( 'Material Data Table' );

		const createButton = await page.$$(
			'[data-type="material/data-table"] form [type="submit"]'
		);
		createButton[ 0 ].click();

		// Check if block was inserted
		expect(
			await page.$( '[data-type="material/data-table"]' )
		).not.toBeNull();
	} );

	it( 'should update table cell content', async () => {
		const tableCells = await page.$$(
			'.edit-post-visual-editor .mdc-data-table .wp-block-table__cell-content'
		);
		await tableCells[ 0 ].focus();
		await page.keyboard.type( 'Column 1' );

		const content = await page.evaluate(
			() =>
				document.querySelectorAll(
					'.edit-post-visual-editor .mdc-data-table .wp-block-table__cell-content'
				)[ 0 ].textContent
		);
		expect( content ).toBe( 'Column 1' );
	} );
} );
