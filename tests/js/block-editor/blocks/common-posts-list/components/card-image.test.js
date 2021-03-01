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
import CardImage from '../../../../../../assets/src/block-editor/blocks/common-posts-list/components/card-image';

/**
 * Render the component.
 *
 * @param {Object} props - Component props.
 * @return {Function} A functional component.
 */
const setup = props => {
	return render( <CardImage { ...props } /> );
};

const baseProps = {
	imageSourceUrl: 'http://example.com/test.jpg',
	type: '16-9',
	contentLayout: 'text-above-media',
};

describe( 'CardImage', () => {
	it( 'matches snapshot when the content layout is not "Text over media"', () => {
		const wrapper = setup( baseProps );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'matches snapshot when the content layout is "Text over media"', () => {
		const props = {
			titleTrimmed: 'Test Title',
			displayPostDate: true,
			post: {
				date_gmt: ' 2020-02-25 08:20:38',
			},
			dateFormat: 'F j, Y',
			...baseProps,
		};

		props.contentLayout = 'text-over-media';

		const wrapper = setup( props );
		expect( wrapper ).toMatchSnapshot();
	} );
} );
