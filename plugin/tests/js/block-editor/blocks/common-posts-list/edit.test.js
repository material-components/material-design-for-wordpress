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
/* eslint-disable @typescript-eslint/no-empty-function */

/**
 * External dependencies
 */
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import { registerStore } from '@wordpress/data';

/**
 * Internal dependencies
 */
import EditWithSelect from '../../../../../assets/src/block-editor/blocks/common-posts-list/edit';

// Mock PostsControl component as not relevant in this test and failing to pass tests
// due to the SearchListControl WooCommerce component.
jest.mock(
	'../../../../../assets/src/block-editor/components/posts-control/index.js',
	() => {
		const PostsControl = () => <div />;
		return PostsControl;
	}
);

global.wp = { apiFetch: () => {} };

registerStore( 'core', {
	reducer: jest.fn(),
	selectors: {
		getEntityRecords: () => {
			return [
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
					// eslint-disable-next-line prettier/prettier
					featured_media: 1,
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
		},
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

/**
 * Render the component.
 *
 * @param {Object} props - Component props.
 * @return {Function} A functional component.
 */
const setup = props => {
	return render( <EditWithSelect { ...props } /> );
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

describe( 'EditWithSelect', () => {
	afterEach( () => {
		jest.clearAllMocks();
	} );

	it( 'matches snapshot when Masonry style', () => {
		const wrapper = setup( baseProps );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'matches snapshot when List style', () => {
		const props = {
			...baseProps,
			...{
				attributes: {
					...baseProps.attributes,
					style: 'list',
				},
			},
		};

		const wrapper = setup( props );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'set the correct arguments when the block is the "Hand-picked posts"', () => {
		const lodash = jest.requireActual( 'lodash' );
		jest.spyOn( lodash, 'pickBy' ).mockImplementation( () => 1 );

		const props = {
			...baseProps,
			...{
				name: 'material/hand-picked-posts',
			},
		};

		setup( props );
		expect( lodash.pickBy.mock.calls[ 0 ][ 0 ] ).toStrictEqual( {
			include: [],
			order: 'desc',
			orderby: 'date',
			per_page: 0,
		} );

		// lodash.pickBy.mockClear();
	} );

	it( 'set the correct arguments when the block is the "Hand-picked posts" and title ordering', () => {
		const lodash = jest.requireActual( 'lodash' );
		jest.spyOn( lodash, 'pickBy' ).mockImplementation( () => 1 );

		const props = {
			...baseProps,
			...{
				name: 'material/hand-picked-posts',
				attributes: {
					...baseProps.attributes,
					orderby: 'title',
				},
			},
		};

		setup( props );
		expect( lodash.pickBy.mock.calls[ 0 ][ 0 ] ).toStrictEqual( {
			include: [],
			order: 'asc',
			orderby: 'title',
			per_page: 0,
		} );

		// lodash.pickBy.mockClear();
	} );

	it( 'set the correct arguments when the block is the "Hand-picked posts" and popularity ordering', () => {
		const lodash = jest.requireActual( 'lodash' );
		jest.spyOn( lodash, 'pickBy' ).mockImplementation( () => 1 );

		const props = {
			...baseProps,
			...{
				name: 'material/hand-picked-posts',
				attributes: {
					...baseProps.attributes,
					orderby: 'popularity',
				},
			},
		};

		setup( props );
		expect( lodash.pickBy.mock.calls[ 0 ][ 0 ] ).toStrictEqual( {
			include: [],
			order: 'desc',
			orderby: 'comment_count',
			per_page: 0,
		} );

		// lodash.pickBy.mockClear();
	} );

	it( 'matches snapshot when no Posts are found', () => {
		registerStore( 'core', {
			reducer: jest.fn(),
			selectors: {
				getEntityRecords: () => {
					return [];
				},
			},
		} );

		const wrapper = setup( baseProps );
		expect( wrapper ).toMatchSnapshot();
	} );
} );
