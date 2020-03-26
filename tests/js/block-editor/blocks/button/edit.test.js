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

const baseProps = { attributes: { type: 'text', style: 'text' } };

const setup = props => {
	return render( <ButtonEdit { ...props } /> );
};

describe( 'ButtonEdit', () => {
	it( 'displays all the panels', () => {
		setup( baseProps );
		expect( screen.getByText( 'Styles' ) ).toBeInTheDocument();
		expect( screen.getByText( 'Colors' ) ).toBeInTheDocument();
		expect( screen.getByText( 'Rounded Corners' ) ).toBeInTheDocument();
		expect( screen.getByText( 'Link Settings' ) ).toBeInTheDocument();
	} );

	it( 'should display an text button with text style initially', () => {
		setup( baseProps );

		const container = document.body;
		const matches = container.querySelector( '.mdc-button.mdc-button--text' );

		expect( matches ).toBeInTheDocument();
		expect( screen.queryByText( 'Background Color' ) ).toBeNull();
	} );

	it( 'should display an text with outlined style', () => {
		setup( { attributes: { type: 'text', style: 'outlined' } } );

		const container = document.body;
		const matches = container.querySelector(
			'.mdc-button.mdc-button--outlined'
		);

		expect( matches ).toBeInTheDocument();
		expect( screen.queryByText( 'Background Color' ) ).toBeNull();
	} );

	it( 'should display an text with raised style', () => {
		setup( { attributes: { type: 'text', style: 'raised' } } );

		const container = document.body;
		const matches = container.querySelector( '.mdc-button.mdc-button--raised' );

		expect( matches ).toBeInTheDocument();
		expect( screen.getByText( 'Background Color' ) ).toBeInTheDocument();
	} );

	it( 'should display an text with unelevated style', () => {
		setup( { attributes: { type: 'text', style: 'unelevated' } } );

		const container = document.body;
		const matches = container.querySelector(
			'.mdc-button.mdc-button--unelevated'
		);

		expect( matches ).toBeInTheDocument();
		expect( screen.getByText( 'Background Color' ) ).toBeInTheDocument();
	} );

	it( 'should display icon picker if icon position is set', () => {
		setup( {
			attributes: {
				type: 'text',
				style: 'unelevated',
				iconPosition: 'leading',
			},
		} );

		expect( screen.getByText( 'Search icon' ) ).toBeInTheDocument();
	} );

	it( 'should not display icon picker if icon position is set', () => {
		setup( {
			attributes: {
				type: 'text',
				style: 'unelevated',
				iconPosition: 'none',
			},
		} );

		expect( screen.queryByText( 'Search icon' ) ).toBeNull();
	} );

	it( 'should have icon button classes if type is icon', () => {
		setup( { attributes: { type: 'icon' } } );

		const container = document.body;
		const matches = container.querySelector(
			'.material-icons.mdc-icon-button'
		);

		expect( matches ).toBeInTheDocument();
		expect( screen.getByText( 'Search icon' ) ).toBeInTheDocument();
	} );

	it( 'should show link setting field if isSelected is true', () => {
		setup( { attributes: { type: 'icon' }, isSelected: true } );

		const container = document.body;
		const matches = container.querySelector( '.material-button-link' );

		expect( matches ).toBeInTheDocument();
	} );

	it( 'should not show link setting field if isSelected is true', () => {
		setup( { attributes: { type: 'icon' }, isSelected: false } );

		const container = document.body;
		const matches = container.querySelector( '.material-button-link' );

		expect( matches ).toBeNull();
	} );
} );
