/**
 * Copyright 2021 Google LLC
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
import SearchListItem from '../../../../../assets/src/block-editor/components/posts-control/item';

/**
 * Render the component.
 *
 * @param {Object} props - Component props.
 * @return {Function} A functional component.
 */
const setup = props => {
	return render( <SearchListItem { ...props } /> );
};

describe( 'SearchListControl', () => {
	it( 'matches snapshot', () => {
		const props = {
			item: {
				id: 2,
				name: 'Example Post',
				link: 'http://example.com',
			},
			onSelect: jest.fn(),
		};
		const wrapper = setup( props );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'matches snapshot when no link exists', () => {
		const props = {
			item: {
				id: 2,
				name: 'Example Post',
				link: '',
			},
			onSelect: jest.fn(),
		};
		const wrapper = setup( props );
		expect( wrapper ).toMatchSnapshot();
	} );
} );
