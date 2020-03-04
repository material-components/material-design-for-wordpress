/**
 * External dependencies
 */
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';

/**
 * Internal dependencies
 */
import ButtonEdit from '../../../../../assets/src/block-editor/blocks/button/edit';

// Mock the <InspectorControls> component only, so that the other components in this package behave as usual.
jest.mock( '@wordpress/block-editor', () => {
	const original = require.requireActual( '@wordpress/block-editor' );
	return {
		...original,
		InspectorControls: ( { children } ) => children,
	};
} );

const baseProps = { attributes: {} };

const setup = props => {
	return render( <ButtonEdit { ...props } /> );
};

describe( 'ButtonEdit', () => {
	it( 'displays all the panels', () => {
		setup( baseProps );
		expect( screen.getByText( 'Styles' ) ).toBeInTheDocument();
		expect( screen.getByText( 'Icon' ) ).toBeInTheDocument();
		expect( screen.getByText( 'Colors' ) ).toBeInTheDocument();
		expect( screen.getByText( 'Rounded Corners' ) ).toBeInTheDocument();
		expect( screen.getByText( 'Link Settings' ) ).toBeInTheDocument();
	} );
} );
