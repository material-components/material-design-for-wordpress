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
import { cloneDeep } from 'lodash';

/**
 * Internal dependencies
 */
import TextareaInputSave from '../../../../../../../assets/src/block-editor/blocks/contact-form/inner-blocks/common/components/textarea-input-save';

/**
 * Render the component.
 *
 * @param {Object} props - Component props.
 * @return {Function} A functional component.
 */
const setup = props => {
	return render( <TextareaInputSave { ...props } /> );
};

const baseProps = {
	attributes: {
		id: 'test-id',
		label: 'Name',
		inputValue: 'test name',
		outlined: true,
		fullWidth: false,
		displayLabel: 'Name',
		isRequired: true,
		inputRole: 'name',
	},
	className: 'test-class',
};

describe( 'TextareaInputSave', () => {
	it( 'matches snapshot', () => {
		const wrapper = setup( baseProps );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'matches snapshot when the display label attribute is empty', () => {
		const props = cloneDeep( baseProps );

		props.attributes.displayLabel = '';
		const wrapper = setup( props );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'matches snapshot when the `is required` attribute is false', () => {
		const props = cloneDeep( baseProps );

		props.attributes.isRequired = false;
		const wrapper = setup( props );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'matches snapshot when the full width attribute is true', () => {
		const props = cloneDeep( baseProps );

		props.attributes.fullWidth = true;
		const wrapper = setup( props );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'matches snapshot when the outlined attribute is false', () => {
		const props = cloneDeep( baseProps );

		props.attributes.outlined = false;
		const wrapper = setup( props );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'matches snapshot when the outlined attribute is false and the `is required` attribute is false', () => {
		const props = cloneDeep( baseProps );

		props.attributes.outlined = false;
		props.attributes.isRequired = false;
		const wrapper = setup( props );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'matches snapshot when the outlined attribute is false and the display label attribute is empty', () => {
		const props = cloneDeep( baseProps );

		props.attributes.outlined = false;
		props.attributes.displayLabel = '';
		const wrapper = setup( props );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'matches snapshot when the outlined attribute is false and the full width attribute is true', () => {
		const props = cloneDeep( baseProps );

		props.attributes.outlined = false;
		props.attributes.fullWidth = true;
		const wrapper = setup( props );
		expect( wrapper ).toMatchSnapshot();
	} );
} );
