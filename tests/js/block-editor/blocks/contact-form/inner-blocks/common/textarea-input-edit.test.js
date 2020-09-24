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
import TextareaInputEdit from '../../../../../../../assets/src/block-editor/blocks/contact-form/inner-blocks/common/components/textarea-input-edit';

// Mock the <MDCTextField> component as it does not need to be tested here.
jest.mock( '@material/textfield', () => {
	const original = require.requireActual( '@material/textfield' );
	return {
		...original,
		MDCTextField: jest.fn(),
	};
} );

// Mock the <InspectorControls> component only, so that the other components in this package behave as usual.
jest.mock( '@wordpress/block-editor', () => {
	const original = require.requireActual( '@wordpress/block-editor' );
	return {
		...original,
		InspectorControls: ( { children } ) => children,
	};
} );

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

/**
 * Render the component.
 *
 * @param {Object} props - Component props.
 * @return {Function} A functional component.
 */
const setup = props => {
	return render( <TextareaInputEdit { ...props } /> );
};

const baseProps = {
	attributes: {
		id: 'test-id',
		label: 'Name',
		inputValue: 'test name',
		outlined: true,
		fullWidth: false,
		displayLabel: 'Name',
		isRequired: false,
		inputRole: 'name',
	},
	className: 'test-class',
	setAttributes: jest.fn(),
	instanceId: 'test-instance-id',
	isSelected: false,
};

describe( 'TextareaInputEdit', () => {
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
