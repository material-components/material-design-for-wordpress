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
} from '../../../../../assets/src/block-editor/blocks/list';

describe( 'blocks: material/list', () => {
	describe( 'name', () => {
		it( 'should equal material/list', () => {
			expect( name ).toStrictEqual( 'material/list' );
		} );
	} );

	describe( 'settings', () => {
		it( 'title should equal List (Material)', () => {
			expect( settings.title ).toStrictEqual( 'List (Material)' );
		} );

		it( 'category should equal material', () => {
			expect( metadata.category ).toStrictEqual( 'material' );
		} );

		it( 'should define attributes', () => {
			expect( metadata.attributes ).toBeDefined();
		} );

		it( 'should define style attribute', () => {
			expect( metadata.attributes.style ).toBeDefined();
		} );

		it( 'should define iconPosition attribute', () => {
			expect( metadata.attributes.iconPosition ).toBeDefined();
		} );

		it( 'should define iconSize attribute', () => {
			expect( metadata.attributes.iconSize ).toBeDefined();
		} );

		it( 'should define items attribute', () => {
			expect( metadata.attributes.items ).toBeDefined();
		} );
	} );
} );
