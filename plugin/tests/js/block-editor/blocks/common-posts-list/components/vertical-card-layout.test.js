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
import VerticalCardLayout from '../../../../../../assets/src/block-editor/blocks/common-posts-list/components/vertical-card-layout';

/**
 * Render the component.
 *
 * @param {Object} props - Component props.
 * @return {Function} A functional component.
 */
const setup = props => {
	return render( <VerticalCardLayout { ...props } /> );
};

const baseProps = {
	excerpt: 'This is a test excerpt',
	displayPostContent: true,
	postContentLength: 20,
	cardStyle: 'global',
	displayFeaturedImage: true,
	displayPostAuthor: true,
	displayCommentsCount: true,
	displayPostDate: true,
	titleTrimmed: 'Test Title',
	post: {
		authorDisplayName: 'Test user',
		commentsCount: 1,
		date_gmt: ' 2020-02-25 08:20:38',
	},
	dateFormat: 'F j, Y',
	imageSourceUrl: 'http://example.com/test.jpg',
	contentLayout: 'text-above-media',
};

describe( 'VerticalCardLayout', () => {
	it( 'matches snapshot', () => {
		const props = { ...baseProps };
		const wrapper = setup( props );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'matches snapshot when the featured image should not be displayed', () => {
		const props = { ...baseProps };
		props.displayFeaturedImage = false;
		const wrapper = setup( props );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'matches snapshot when there is no featured image for the post', () => {
		const props = { ...baseProps };
		props.imageSourceUrl = false;
		const wrapper = setup( props );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'matches snapshot when the post author and the comments count should not be displayed', () => {
		const props = { ...baseProps };
		props.displayPostAuthor = false;
		props.displayCommentsCount = false;
		const wrapper = setup( props );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'matches snapshot when the featured image, post author and the comments count should not be displayed', () => {
		const props = { ...baseProps };
		props.displayFeaturedImage = false;
		props.displayPostAuthor = false;
		props.displayCommentsCount = false;
		const wrapper = setup( props );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'matches snapshot when the content, featured image, post author and the comments count should not be displayed', () => {
		const props = { ...baseProps };
		props.displayPostContent = false;
		props.displayFeaturedImage = false;
		props.displayPostAuthor = false;
		props.displayCommentsCount = false;
		const wrapper = setup( props );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'matches snapshot when the content should not be displayed', () => {
		const props = { ...baseProps };
		props.displayPostContent = false;
		const wrapper = setup( props );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'matches snapshot when the card should be outlined', () => {
		const props = { ...baseProps };
		props.outlined = true;
		const wrapper = setup( props );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'matches snapshot when the content layout of "Text over media"', () => {
		const props = { ...baseProps };
		props.contentLayout = 'text-over-media';
		const wrapper = setup( props );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'matches snapshot when the content layout of "Text under media"', () => {
		const props = { ...baseProps };
		props.contentLayout = 'text-under-media';
		const wrapper = setup( props );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'matches snapshot when the excerpt is longer than the allowed content length', () => {
		const props = { ...baseProps };
		props.excerpt =
			'This is a test a long excerpt, at least longer than the allowed content length';
		props.postContentLength = 5;
		const wrapper = setup( props );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'matches snapshot when the content layout is "Text over Media" and the featured image should not be displayed', () => {
		const props = { ...baseProps };
		props.contentLayout = 'text-over-media';
		props.displayFeaturedImage = false;
		const wrapper = setup( props );
		expect( wrapper ).toMatchSnapshot();
	} );
} );
