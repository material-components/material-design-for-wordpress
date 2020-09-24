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
 * Internal dependencies
 */
import {
	name,
	settings,
	metadata,
} from '../../../../../assets/src/block-editor/blocks/image-list';

describe( 'blocks: material/image-list', () => {
	describe( 'name', () => {
		it( 'should equal material/image-list', () => {
			expect( name ).toStrictEqual( 'material/image-list' );
		} );
	} );

	describe( 'settings', () => {
		it( 'title should equal Gallery (Material)', () => {
			expect( settings.title ).toStrictEqual( 'Gallery (Material)' );
		} );

		it( 'category should equal material', () => {
			expect( metadata.category ).toStrictEqual( 'material' );
		} );

		it( 'supports align', () => {
			expect( metadata.supports ).toStrictEqual( {
				align: true,
			} );
		} );

		it( 'contains attributes', () => {
			expect( metadata.attributes ).toBeDefined();
		} );
	} );
} );
