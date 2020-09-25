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
import { withId } from '../../../../assets/src/block-editor/components/with-id';

const TestComponent = withId( () => {
	return <div>Test Component</div>;
} );

/**
 * Render the component.
 *
 * @param {Object} props - Component props.
 * @return {Function} A functional component.
 */
const setup = props => {
	return render( <TestComponent { ...props } /> );
};

const baseProps = {
	setAttributes: jest.fn(),
	attributes: {},
	name: 'material/button',
};

describe( 'withId', () => {
	beforeEach( () => {
		jest.resetAllMocks();
	} );

	it( "should set id attribute if it's not set", () => {
		let props = { ...baseProps };
		setup( props );

		expect( props.setAttributes ).toHaveBeenCalledWith( {
			id: 'block-material-button-0',
		} );

		props = { ...baseProps };
		delete props.name;
		setup( props );

		expect( props.setAttributes ).toHaveBeenCalledWith( {
			id: 'block--1',
		} );
	} );

	it( "should not set id attribute if it's set", () => {
		const props = { ...baseProps };
		props.attributes.id = 'block-material-button-1';
		setup( props );

		expect( props.setAttributes ).toHaveBeenCalledTimes( 0 );
	} );
} );
