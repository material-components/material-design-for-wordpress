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
} from '../../../../../assets/src/block-editor/blocks/recent-posts';

import Edit from '../../../../../assets/src/block-editor/blocks/recent-posts/edit';

// Mock PostsControl component as not relevant in this test and failing to pass tests
// due to the SearchListControl WooCommerce component.
jest.mock(
	'../../../../../assets/src/block-editor/components/posts-control/index.js',
	() => {
		const PostsControl = () => <div />;
		return PostsControl;
	}
);

describe( 'blocks: material/recent-posts', () => {
	afterEach( () => {
		jest.clearAllMocks();
	} );

	describe( 'name', () => {
		it( 'should equal material/recent-posts', () => {
			expect( name ).toStrictEqual( 'material/recent-posts' );
		} );
	} );

	describe( 'title settings', () => {
		it( 'should equal Recent Posts (Material)', () => {
			expect( settings.title ).toStrictEqual( 'Recent Posts (Material)' );
		} );
	} );

	describe( 'description settings', () => {
		it( 'should equal Display a list of your most recent posts.', () => {
			expect( settings.description ).toStrictEqual(
				'Display a list of your most recent posts.'
			);
		} );
	} );

	describe( 'category settings', () => {
		it( 'should equal material', () => {
			expect( metadata.category ).toStrictEqual( 'material' );
		} );
	} );

	describe( 'supports settings', () => {
		it( 'should have align supporting only wide and full alignment', () => {
			expect( metadata.supports ).toStrictEqual( {
				align: [ 'wide', 'full' ],
			} );
		} );
	} );

	describe( 'edit settings', () => {
		it( 'should be equal to the Edit component', () => {
			expect( settings.edit ).toStrictEqual( Edit );
		} );
	} );
} );
