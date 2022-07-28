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
import PostsControl from '../../../../../assets/src/block-editor/components/posts-control';

jest.mock(
	'../../../../../assets/src/block-editor/hocs/with-searched-posts.js',
	() => {
		return {
			__esModule: true,
			default: Component => Component,
		};
	}
);

/**
 * Render the component.
 *
 * @param {Object} props - Component props.
 * @return {Function} A functional component.
 */
const setup = props => {
	return render( <PostsControl { ...props } /> );
};

describe( 'PostsControl', () => {
	it( 'matches snapshot', () => {
		const props = {
			error: undefined,
			onChange: jest.fn(),
			onSearch: jest.fn(),
			selected: [ 2 ],
			posts: [
				{
					id: 1,
				},
				{
					id: 2,
				},
				{
					id: 3,
				},
			],
			isLoading: false,
		};
		const wrapper = setup( props );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'matches snapshot when there is an error', () => {
		const props = {
			error: { type: 'general', message: 'Test error message' },
			onChange: jest.fn(),
			onSearch: jest.fn(),
			selected: [],
			posts: [],
			isLoading: false,
		};
		const wrapper = setup( props );
		expect( wrapper ).toMatchSnapshot();
	} );
} );
