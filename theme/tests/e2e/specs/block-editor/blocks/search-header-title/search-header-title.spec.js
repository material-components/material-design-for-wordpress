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
	pressKeyWithModifier,
} from '@wordpress/e2e-test-utils';
const maybe = process.env.JEST_ALLOW_SKIP_SEARCH ? describe.skip : describe;

maybe( 'blocks: material/search-title', () => {
	beforeEach( async () => {
		await createNewPost( {} );
	} );

	it( 'snapshot match for material search', async () => {
		await insertBlock( 'Material Search Title' );

		expect( await getEditedPostContent() ).toMatchSnapshot();
	} );

	it( 'snapshot match for material search after modifying', async () => {
		await insertBlock( 'Material Search Title' );

		await pressKeyWithModifier( 'primary', 'a' );

		await page.keyboard.type( 'Result for:' );

		expect( await getEditedPostContent() ).toMatchSnapshot();
	} );
} );
