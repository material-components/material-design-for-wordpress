/**
 * External dependencies
 */
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';

/**
 * Internal dependencies
 */
import OrderToolbar from '../../../../../../assets/src/block-editor/blocks/tab-bar/components/order-toolbar.js';

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
	return render( <OrderToolbar { ...props } /> );
};

const baseProps = { onChange: () => {} };

describe( 'Tab', () => {
	afterEach( () => {
		jest.clearAllMocks();
	} );

	it( 'matches snapshot with base props', () => {
		const wrapper = setup( baseProps );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'matches snapshot with a different label', () => {
		const wrapper = setup( { ...baseProps, label: 'Another label' } );
		expect( wrapper ).toMatchSnapshot();
	} );
} );
