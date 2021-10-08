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
import HorizontalCardLayout from '../../../../../../assets/src/block-editor/blocks/common-posts-list/components/horizontal-card-layout';

/**
 * Render the component.
 *
 * @param {Object} props - Component props.
 * @return {Function} A functional component.
 */
const setup = props => {
	return render( <HorizontalCardLayout { ...props } /> );
};

const baseProps = {
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

describe( 'HorizontalCardLayout', () => {
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

	it( 'matches snapshot when the card should be outlined', () => {
		const props = { ...baseProps };
		props.outlined = true;
		const wrapper = setup( props );
		expect( wrapper ).toMatchSnapshot();
	} );
} );
