/**
 * External dependencies
 */
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';

/**
 * Internal dependencies
 */
import TextInputElement from '../../../../../../../assets/src/block-editor/blocks/contact-form/inner-blocks/common/components/text-input-element';

/**
 * Render the component.
 *
 * @param {Object} props - Component props.
 * @return {Function} A functional component.
 */
const setup = props => {
	return render( <TextInputElement { ...props } /> );
};

const baseProps = {
	editMode: true,
	inputValue: 'test name',
	id: 'test-id',
	inputType: 'text',
	inputRole: 'name',
	displayLabel: 'Name',
	label: 'Name',
	onChange: jest.fn(),
	isRequired: true,
};

describe( 'TextInputElement', () => {
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
