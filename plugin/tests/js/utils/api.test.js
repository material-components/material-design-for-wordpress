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

import apiFetch from '@wordpress/api-fetch';

/**
 * Internal dependencies
 */
import { getPosts } from '../../../assets/src/block-editor/utils/api';

const sampleReducedPostsData = [
	{
		id: 1,
		status: 'publish',
		type: 'post',
		title: {
			rendered: 'Test Post 1',
		},
	},
	{
		id: 2,
		status: 'publish',
		type: 'post',
		title: {
			rendered: 'Test Post 2',
		},
	},
];

const expectedPostsData = [
	{
		id: 1,
		parent: 0,
		status: 'publish',
		type: 'post',
		title: {
			rendered: 'Test Post 1',
		},
	},
	{
		id: 2,
		parent: 0,
		status: 'publish',
		type: 'post',
		title: {
			rendered: 'Test Post 2',
		},
	},
];

jest.mock( '@wordpress/api-fetch', () => jest.fn() );
describe( 'api: getPosts', () => {
	beforeAll( () => {
		global.materialDesign = {
			postTypes: [
				{
					label: 'Posts and Pages',
					value: 'posts-pages',
					route: '/material-design/v1/post-types/get-posts',
				},
				{
					label: 'Portfolios',
					value: 'portfolio',
					route: '/wp/v2/portfolio',
				},
				{ label: 'Recipes', value: 'recipe', route: '/wp/v2/recipe' },
				{ label: 'Books', value: 'book', route: '/wp/v2/book' },
			],
		};
	} );

	afterEach( () => {
		jest.clearAllMocks();
	} );

	it( 'should return posts data', async () => {
		apiFetch.mockImplementation( () =>
			Promise.resolve( sampleReducedPostsData )
		);

		await getPosts( {
			selected: [ 1, 2 ],
			search: 'test',
		} ).then( fetchedList => {
			expect( fetchedList ).toStrictEqual( expectedPostsData );
		} );

		expect( apiFetch ).toHaveBeenCalledTimes( 2 );
		expect( apiFetch ).toHaveBeenCalledWith( {
			path:
				'/material-design/v1/post-types/get-posts?per_page=100&status=publish&search=test&orderby=title&order=asc&post_type=posts-pages&context=edit',
		} );

		expect( apiFetch ).toHaveBeenCalledWith( {
			path:
				'/material-design/v1/post-types/get-posts?status=publish&include%5B0%5D=1&include%5B1%5D=2&post_type=posts-pages',
		} );
	} );

	it( 'should fails with an error', async () => {
		apiFetch.mockImplementation( () => Promise.reject( 'error' ) );
		await expect(
			getPosts( {
				selected: [ 1, 2 ],
				search: 'test',
			} )
		).rejects.toStrictEqual( 'error' );
	} );
} );
