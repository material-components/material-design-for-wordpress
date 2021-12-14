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
import { createNewPost, getEditedPostContent } from '@wordpress/e2e-test-utils';
import { insertBlockByKeyword } from '../../../../utils';

describe( 'blocks: material/data-table', () => {
	beforeEach( async () => {
		await createNewPost( {} );
		await insertBlockByKeyword( 'Material Data Table' );
	} );

	it( 'should be inserted', async () => {
		// Check if block was inserted
		expect(
			await page.$( '[data-type="material/data-table"]' )
		).not.toBeNull();
	} );

	// eslint-disable-next-line jest/no-disabled-tests
	it.skip( 'should update table cell content', async () => {
		const createButton = await page.$(
			'[data-type="material/data-table"] form [type="submit"]'
		);
		createButton.click();
		await page.waitForSelector( 'td' );
		await page.click( 'td' );
		await page.keyboard.type( 'Column 1' );
		expect( await getEditedPostContent() ).toMatchSnapshot();
	} );
} );
