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
 * Internal dependencies
 */
import SinglePost from '../../../../../../assets/src/block-editor/blocks/common-posts-list/components/single-post';

/**
 * Render the component.
 *
 * @param {Object} props - Component props.
 * @return {Function} A functional component.
 */
const setup = props => {
	return render( <SinglePost { ...props } /> );
};

const baseProps = {
	style: 'masonry',
	attributes: {
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
	},
	post: {
		title: {
			rendered: 'This is a test post title #1',
		},
		excerpt: {
			rendered: 'This is a test post excerpt #1',
		},
		authorDisplayName: 'Test user #1',
		commentsCount: 1,
		date_gmt: ' 2020-02-25 08:20:38',
		featuredImageSourceUrl: 'http://example.com/test1.jpg',
	},
};

describe( 'SinglePost', () => {
	afterEach( () => {
		jest.clearAllMocks();
	} );

	it( 'matches snapshot with style being "Masonry"', () => {
		const props = { ...baseProps };
		const wrapper = setup( props );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'matches snapshot with style being "List"', () => {
		const props = { ...baseProps };
		props.style = 'list';
		const wrapper = setup( props );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'matches snapshot with style being "Grid"', () => {
		const props = { ...baseProps };
		props.style = 'grid';
		const wrapper = setup( props );
		expect( wrapper ).toMatchSnapshot();
	} );
} );
