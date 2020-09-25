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
import CardHeader from '../../../../../../assets/src/block-editor/blocks/common-posts-list/components/card-header';

/**
 * Render the component.
 *
 * @param {Object} props - Component props.
 * @return {Function} A functional component.
 */
const setup = props => {
	return render( <CardHeader { ...props } /> );
};

const baseProps = {
	titleTrimmed: 'Test Title',
	displayPostDate: true,
	post: {
		date_gmt: ' 2020-02-25 08:20:38',
	},
	dateFormat: 'F j, Y',
};

describe( 'CardActions', () => {
	it( 'matches snapshot when the post date should be displayed', () => {
		const props = { ...baseProps };
		const wrapper = setup( props );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'matches snapshot when the post date should not be displayed', () => {
		const props = { ...baseProps };
		props.displayPostDate = false;
		const wrapper = setup( props );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'matches snapshot when there is not title', () => {
		const props = { ...baseProps };
		props.titleTrimmed = null;
		const wrapper = setup( props );
		expect( wrapper ).toMatchSnapshot();
	} );
} );
