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
import {
	clickButton,
	createNewPost,
	getEditedPostContent,
} from '@wordpress/e2e-test-utils';

/**
 * Internal dependencies
 */
import { insertBlockByKeyword, selectBlockByName } from '../../../../utils';

const createButtonLabel = 'Create Table';
const buttonSelector = '.blocks-table__placeholder-form button';

describe( 'blocks: material/data-table core/table style', () => {
	beforeEach( async () => {
		await createNewPost( {} );
		await insertBlockByKeyword( 'Table' );
		await page.waitForSelector( buttonSelector );
		// Create the table.
		await clickButton( createButtonLabel );
	} );

	it( 'should be inserted', async () => {
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

		const styles = await page.$$(
			'.block-editor-block-styles__item-label'
		);
		expect( styles ).toHaveLength( 3 );
	} );

	it( 'should update table cell content', async () => {
		await page.waitForSelector( 'td' );
		await page.click( 'td' );
		await page.keyboard.type( 'Column 1' );

		expect( await getEditedPostContent() ).toMatchSnapshot();
	} );
} );
