/**
 * External dependencies
 */
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';

/**
 * Internal dependencies
 */
import { Tab } from '../../../../../../assets/src/block-editor/blocks/tab-bar/components/tab.js';

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

const baseProps = { label: 'Test Tab', active: false };

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
} );
