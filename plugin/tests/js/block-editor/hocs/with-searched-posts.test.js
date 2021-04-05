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
import { shallow } from 'enzyme';

/**
 * Internal dependencies
 */
import withSearchedPosts from '../../../../assets/src/block-editor/hocs/with-searched-posts';
import { getPosts } from '../../../../assets/src/block-editor/utils/api';

jest.mock( 'lodash', () => {
	const original = jest.requireActual( 'lodash' );
	return {
		...original,
		debounce: fn => fn,
	};
} );

jest.mock( '../../../../assets/src/block-editor/utils/api', () => {
	return {
		getPosts: jest.fn( async () => {
			return [
				{
					id: 1,
					name: 'Post 1',
				},
				{
					id: 2,
					name: 'Post 2',
				},
			];
		} ),
	};
} );

const Test = withSearchedPosts( props => <div { ...props }></div> );

/**
 * Render the component.
 *
 * @param {Object} props - Component props
 * @return {Function} A functional component.
 */
const setup = props => {
	return shallow( <Test { ...props } id="test" /> );
};

describe( 'hocs: withSearchedPosts', () => {
	it( 'should set props and pass through parent props', () => {
		const wrap = setup( {} );
		expect( wrap.props().error ).toBeUndefined();
		expect( wrap.props().isLoading ).toStrictEqual( true );
		expect( wrap.props().posts ).toHaveLength( 0 );
		expect( wrap.props().id ).toStrictEqual( 'test' );
	} );

	it( 'should invoke fetchPosts when onSearch is invoked', () => {
		const wrap = setup( {} );
		wrap.props().onSearch( 'test' );

		expect( getPosts.mock.calls[ 0 ][ 0 ].search ).toStrictEqual( 'test' );
	} );
} );
