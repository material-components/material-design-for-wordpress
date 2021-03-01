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
import NoPosts from '../../../../../../assets/src/block-editor/blocks/common-posts-list/components/no-posts';

// Mock InspectorControls component as not relevant in this test
jest.mock(
	'../../../../../../assets/src/block-editor/blocks/common-posts-list/components/inspector-controls.js',
	() => {
		const InspectorControls = () => <div />;
		return InspectorControls;
	}
);

/**
 * Render the component.
 *
 * @param {Object} props - Component props.
 * @return {Function} A functional component.
 */
const setup = props => {
	return render( <NoPosts { ...props } /> );
};

describe( 'NoPosts', () => {
	afterEach( () => {
		jest.clearAllMocks();
	} );

	it( 'matches snapshot when the block is "Recent Posts"', () => {
		const wrapper = setup( {
			name: 'material/recent-posts',
			postsToDisplay: [],
		} );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'matches snapshot when the block is "Hand-picked Posts"', () => {
		const wrapper = setup( {
			name: 'material/hand-picked-posts',
			postsToDisplay: [],
		} );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'matches snapshot when there are no post to display', () => {
		const wrapper = setup( {
			name: 'material/recent-posts',
			postsToDisplay: null,
		} );
		expect( wrapper ).toMatchSnapshot();
	} );
} );
