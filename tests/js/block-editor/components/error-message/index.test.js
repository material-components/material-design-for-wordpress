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
import ErrorMessage from '../../../../../assets/src/block-editor/components/error-message/index';

/**
 * Render the component.
 *
 * @param {Object} props - Component props.
 * @return {Function} A functional component.
 */
const setup = props => {
	return render( <ErrorMessage { ...props } /> );
};

describe( 'ErrorMessage', () => {
	it( 'matches snapshot when there is an error message', () => {
		const props = {
			className: 'test-class',
			error: {
				type: 'general',
				message: 'Test general message',
			},
		};
		const wrapper = setup( props );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'matches snapshot when there is an error message and onRetry callback is provided', () => {
		const props = {
			className: 'test-class',
			error: {
				type: 'general',
				message: 'Test general message',
			},
			onRetry: () => jest.fn(),
		};
		const wrapper = setup( props );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'matches snapshot when there is an error message and onRetry callback is provided and it is loading', () => {
		const props = {
			className: 'test-class',
			error: {
				type: 'general',
				message: 'Test general message',
			},
			onRetry: () => jest.fn(),
			isLoading: true,
		};
		const wrapper = setup( props );
		expect( wrapper ).toMatchSnapshot();
	} );
} );
