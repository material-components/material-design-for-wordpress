/**
 * External dependencies
 */
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';

/**
 * Internal dependencies
 */
import {
	Tab,
	TabSchema,
} from '../../../../../../assets/src/block-editor/blocks/tab-bar/components/tab.js';

jest.mock( '@wordpress/block-editor', () => {
	const original = require.requireActual( '@wordpress/block-editor' );
	return {
		...original,
		InspectorControls: ( { children } ) => children,
	};
} );

/**
 * Render the component.
 *
 * @param {Object} props - Component props
 * @return {Function} A functional component.
 */
const setup = props => {
	return render( <Tab { ...props } /> );
};

const baseProps = {
	label: 'Test Tab',
	active: false,
	onInput: jest.fn(),
	onChange: jest.fn(),
};

describe( 'Tab', () => {
	afterEach( () => {
		jest.clearAllMocks();
	} );

	it( 'matches snapshot with base props', () => {
		const wrapper = setup( baseProps );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'matches snapshot when "frontend" prop is true', () => {
		const wrapper = setup( { ...baseProps, frontend: true } );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'matches snapshot when "iconPosition" prop is above', () => {
		const wrapper = setup( { ...baseProps, iconPosition: 'above' } );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'matches snapshot when "iconPosition" prop is leading', () => {
		const wrapper = setup( { ...baseProps, iconPosition: 'leading' } );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'updates tab title on blur', () => {
		const props = { ...baseProps };
		const { getByText } = setup( props );
		const title = getByText( 'Test Tab' );

		fireEvent.click( title );
		title.textContent = 'Test Tab Updated';

		fireEvent.blur( title );

		expect( props.onInput ).toHaveBeenCalledWith( 'Test Tab Updated' );
	} );

	it( 'updates active tab on keydown', () => {
		const props = { ...baseProps };
		const { getByText } = setup( props );
		const title = getByText( 'Test Tab' );

		fireEvent.keyDown( title, { key: 'Enter' } );

		// eslint-disable-next-line jest/prefer-called-with
		expect( props.onChange ).toHaveBeenCalled();
	} );
} );

describe( 'TabSchema', () => {
	it( 'sets the class properties', () => {
		let tab = new TabSchema( {
			label: 'Tab 1',
			icon: 'heart',
			content: '<p>Tab 1 content</p>',
		} );

		expect( tab.label ).toStrictEqual( 'Tab 1' );
		expect( tab.icon ).toStrictEqual( 'heart' );
		expect( tab.content ).toStrictEqual( '<p>Tab 1 content</p>' );

		tab = new TabSchema( {
			label: 'Tab 1',
			icon: 'heart',
		} );
		expect( tab.content ).toBeNull();
	} );
} );
