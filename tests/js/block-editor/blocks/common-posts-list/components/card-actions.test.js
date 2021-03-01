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
import CardActions from '../../../../../../assets/src/block-editor/blocks/common-posts-list/components/card-actions';

/**
 * Render the component.
 *
 * @param {Object} props - Component props.
 * @return {Function} A functional component.
 */
const setup = props => {
	return render( <CardActions { ...props } /> );
};

const post = {
	authorDisplayName: 'Test user',
	commentsCount: 1,
};

describe( 'CardActions', () => {
	it( 'matches snapshot when the post author and comments count should be displayed', () => {
		const wrapper = setup( {
			displayPostAuthor: true,
			displayCommentsCount: true,
			post,
		} );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'matches snapshot when the post author and comments count should not be displayed', () => {
		const wrapper = setup( {
			displayPostAuthor: false,
			displayCommentsCount: false,
			post,
		} );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'matches snapshot when only the post author should be displayed', () => {
		const wrapper = setup( {
			displayPostAuthor: true,
			displayCommentsCount: false,
			post,
		} );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'matches snapshot when only the comments count should be displayed', () => {
		const wrapper = setup( {
			displayPostAuthor: false,
			displayCommentsCount: true,
			post,
		} );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'matches snapshot when the comments count is zero', () => {
		post.commentsCount = 0;
		const wrapper = setup( {
			displayPostAuthor: true,
			displayCommentsCount: true,
			post,
		} );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'matches snapshot when the comments count is more than one', () => {
		post.commentsCount = 2;
		const wrapper = setup( {
			displayPostAuthor: true,
			displayCommentsCount: true,
			post,
		} );
		expect( wrapper ).toMatchSnapshot();
	} );
} );
