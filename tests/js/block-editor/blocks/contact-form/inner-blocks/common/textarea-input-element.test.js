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
import TextareaInputElement from '../../../../../../../assets/src/block-editor/blocks/contact-form/inner-blocks/common/components/textarea-input-element';

/**
 * Render the component.
 *
 * @param {Object} props - Component props.
 * @return {Function} A functional component.
 */
const setup = props => {
	return render( <TextareaInputElement { ...props } /> );
};

const baseProps = {
	editMode: true,
	inputValue: 'test message',
	id: 'test-id',
	inputRole: 'message',
	displayLabel: 'Message',
	label: 'Message',
	onChange: jest.fn(),
	isRequired: true,
};

describe( 'TextareaInputElement', () => {
	afterEach( () => {
		jest.clearAllMocks();
	} );

	it( 'matches snapshot', () => {
		const wrapper = setup( baseProps );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'matches snapshot with edit mode is false', () => {
		const props = { ...baseProps };
		props.editMode = false;

		const wrapper = setup( props );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'matches snapshot with missing default edit mode attribute', () => {
		const props = { ...baseProps };
		delete props.editMode;

		const wrapper = setup( props );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'matches snapshot with missing empty display label attribute', () => {
		const props = { ...baseProps };
		props.displayLabel = '';

		const wrapper = setup( props );
		expect( wrapper ).toMatchSnapshot();
	} );
} );
