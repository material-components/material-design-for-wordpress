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
import { render, fireEvent } from '@testing-library/react';
import { cloneDeep } from 'lodash';
import { registerStore } from '@wordpress/data';

/**
 * Internal dependencies
 */
import TextInputEdit from '../../../../../../../assets/src/block-editor/blocks/contact-form/inner-blocks/common/components/text-input-edit';

// Mock the <MDCTextField> component as it does not need to be tested here.
jest.mock( '@material/textfield', () => {
	const original = jest.requireActual( '@material/textfield' );
	return {
		...original,
		MDCTextField: jest.fn(),
	};
} );

/**
 * Render the component.
 *
 * @param {Object} props - Component props.
 * @return {Function} A functional component.
 */
const setup = props => {
	return render( <TextInputEdit { ...props } /> );
};

registerStore( 'core/block-editor', {
	reducer: jest.fn(),
	selectors: {
		getBlockParents: () => {
			return [ 'testingID' ];
		},
		getBlock: () => {
			return {
				attributes: {
					emailTo: 'recipient@test.loc',
					subject: 'Test contact form',
					confirmationMessage: 'The form was submitted',
					outlined: true,
					fullWidth: true,
				},
				className: 'test-class',
				setAttributes: jest.fn(),
			};
		},
	},
} );

jest.unmock( '@wordpress/data' );
jest.mock( '@wordpress/data', () => ( {
	combineReducers: jest.fn(),
	registerStore: jest.fn(),
	select: store => {
		switch ( store ) {
			case 'core/block-editor':
				return {
					getBlocks: () => [],
				};

			default:
				return {};
		}
	},
	withSelect: mapSelectToProps => WrappedComponent => ownProps => {
		const parentBlock = {
			attributes: {
				emailTo: 'recipient@test.loc',
				subject: 'Test contact form',
				confirmationMessage: 'The form was submitted',
				outlined: true,
				fullWidth: true,
			},
			className: 'test-class',
			setAttributes: jest.fn(),
		};
		return (
			<WrappedComponent
				{ ...ownProps }
				{ ...mapSelectToProps }
				parentBlock={ parentBlock }
			/>
		);
	},
} ) );

const baseProps = {
	attributes: {
		id: 'test-id',
		label: 'Name',
		inputValue: 'test name',
		outlined: true,
		fullWidth: false,
		displayLabel: 'Name',
		isRequired: false,
		inputType: 'text',
		inputRole: 'name',
	},
	className: 'test-class',
	setAttributes: jest.fn(),
	instanceId: 'test-instance-id',
	isSelected: false,
};

describe( 'TextInputEdit', () => {
	afterEach( () => {
		jest.clearAllMocks();
	} );

	it( 'matches snapshot', () => {
		const wrapper = setup( baseProps );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'matches snapshot when the block is selected', () => {
		const props = cloneDeep( baseProps );

		props.isSelected = true;
		const wrapper = setup( props );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'matches snapshot when the id attribute is empty', () => {
		const props = cloneDeep( baseProps );

		props.attributes.id = '';
		const wrapper = setup( props );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'matches snapshot when the display label attribute is empty', () => {
		const props = cloneDeep( baseProps );

		props.attributes.displayLabel = '';
		const wrapper = setup( props );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'matches snapshot when the `is required` attribute is true', () => {
		const props = cloneDeep( baseProps );

		props.attributes.isRequired = true;
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

	it( "updates the display secondary text prop when it's changed", () => {
		const props = cloneDeep( baseProps );

		props.isSelected = true;

		const { getByLabelText } = setup( props );

		fireEvent.click( getByLabelText( 'Required' ) );

		expect( baseProps.setAttributes ).toHaveBeenCalledTimes( 2 );
	} );
} );
