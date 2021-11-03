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
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';

/**
 * WordPress dependencies
 */
import { registerStore } from '@wordpress/data';

/**
 * Internal dependencies
 */
import Edit from '../../../../../assets/src/block-editor/blocks/hand-picked-posts/edit';

// Mock PostsControl component as not relevant in this test and failing to pass tests
// due to the SearchListControl WooCommerce component.
jest.mock(
	'../../../../../assets/src/block-editor/components/posts-control/index.js',
	() => {
		const PostsControl = () => <div />;
		return PostsControl;
	}
);

/**
 * Shallow render the component.
 *
 * @param {Object} props - Component props.
 * @return {Function} A functional component.
 */
const setup = props => {
	return render( <Edit { ...props } /> );
};

const baseProps = {
	attributes: {
		style: 'masonry',
		contentLayout: 'text-above-media',
		columns: 3,
		postsToShow: 12,
		outlined: false,
		displayPostDate: true,
		displayPostContent: true,
		postContentLength: 20,
		displayFeaturedImage: true,
		displayCommentsCount: true,
		displayPostAuthor: false,
		category: undefined,
		posts: [],
		editMode: true,
	},
};

registerStore( 'core', {
	reducer: jest.fn(),
	selectors: {
		getMedia: () => {
			return {
				id: 1,
				media_details: {
					width: 587,
					height: 469,
					file: 'test.png',
					sizes: {
						medium: {
							file: 'test-300x240.png',
							width: 300,
							height: 240,
							mime_type: 'image/png',
							source_url: 'http://test-url.com/test-300x240.png',
						},
						thumbnail: {
							file: 'test-150x150.png',
							width: 150,
							height: 150,
							mime_type: 'image/png',
							source_url: 'http://test-url.com/test-150x150.png',
						},
						full: {
							file: 'http://test-url.com/test.png',
							width: 587,
							height: 469,
							mime_type: 'image/png',
							source_url: 'http://test-url.com/test.png',
						},
					},
				},
			};
		},
	},
} );

describe( 'Edit', () => {
	const originalFetch = window.fetch;

	beforeAll( () => {
		const mockSuccessResponse = [
			{
				id: 1,
				caption: {
					raw: 'Example 1 caption',
				},
				title: {
					rendered: 'Example 1 Title',
				},
				excerpt: {
					rendered: 'Example 1 excerpt',
				},
				// eslint-disable-next-line prettier/prettier
				date_gmt: '2020-03-26',
			},
			{
				id: 2,
				caption: {
					raw: 'Example 2 caption',
				},
				title: {
					rendered: 'Example 2 Title',
				},
				excerpt: {
					rendered: 'Example 2 excerpt',
				},
				// eslint-disable-next-line prettier/prettier
				date_gmt: '2020-03-26',
			},
		];
		const mockJsonPromise = Promise.resolve( mockSuccessResponse );
		const mockFetchPromise = Promise.resolve( {
			status: 200,
			json: () => mockJsonPromise,
		} );

		// eslint-disable-next-line jest/prefer-spy-on
		global.fetch = jest.fn().mockImplementation( () => mockFetchPromise );

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

	afterAll( () => {
		window.fetch = originalFetch;
	} );

	it( 'matches snapshot when normal mode', async () => {
		const props = {
			...baseProps,
			...{
				attributes: {
					...baseProps.attributes,
					editMode: false,
				},
			},
		};

		const wrapper = setup( props );

		expect(
			await wrapper.findByText( 'Example 1 Title' )
		).toBeInTheDocument();
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'matches snapshot when edit mode', () => {
		const wrapper = setup( { ...baseProps } );
		expect( wrapper ).toMatchSnapshot();
	} );
} );
