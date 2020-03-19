/**
 * External dependencies
 */
import { mount } from 'enzyme';
import '@testing-library/jest-dom/extend-expect';
import { wait, render, fireEvent } from '@testing-library/react';

/**
 * Internal dependencies
 */
import MaterialColorPalette from '../../../../assets/src/block-editor/components/material-color-palette';

/**
 * Render the component.
 *
 * @param {Object} props - Component props
 * @return {Function} A functional component.
 */
const setup = props => {
	return render( <MaterialColorPalette { ...props } /> );
};

const baseProps = {
	value: '#263238',
	label: 'Select Material Color',
	onChange: jest.fn(),
};

describe( 'MaterialColorPalette', () => {
	const wrapper = mount( <MaterialColorPalette { ...baseProps } /> );
	const buttons = wrapper.find( 'Option button' );

	beforeEach( () => {
		baseProps.onChange.mockClear();
	} );

	it( 'should render the label', () => {
		const labelWrap = wrapper.find(
			'.material-component-color-palette__label'
		);
		expect( labelWrap ).toHaveLength( 1 );
		expect( labelWrap.text() ).toStrictEqual( baseProps.label );
	} );

	it( 'should call onClick on an inactive button', () => {
		const inactiveButton = buttons
			.findWhere( button => ! button.hasClass( 'is-pressed' ) )
			.first();
		inactiveButton.simulate( 'click' );

		expect( baseProps.onChange ).toHaveBeenCalledTimes( 1 );
	} );

	it( 'should call onClick with undefined, when the clearButton onClick is triggered', () => {
		const clearButton = wrapper.find( 'ButtonAction button' );

		expect( clearButton ).toHaveLength( 1 );

		clearButton.simulate( 'click' );

		expect( baseProps.onChange ).toHaveBeenCalledTimes( 1 );
		expect( baseProps.onChange ).toHaveBeenCalledWith( undefined );
	} );

	it( 'should render material primary and secondary colors', () => {
		const { container } = setup( baseProps );

		expect(
			container.querySelectorAll(
				'.components-circular-option-picker__option-wrapper'
			)
		).toHaveLength( 2 );
	} );

	it( 'should update color if primary or secondary colors are selected', () => {
		const { getByLabelText } = setup( baseProps );

		fireEvent.click( getByLabelText( 'Color: Primary' ) );

		expect( baseProps.onChange ).toHaveBeenCalledWith( '#6200ee' );
	} );

	it( 'should render all the material colors', () => {
		const { container, getByLabelText } = setup( baseProps );

		fireEvent.click( getByLabelText( 'Color palette' ) );

		// Assert we have 19 rows/groups of colors.
		expect(
			container.querySelectorAll(
				'.components-circular-option-picker__option-wrapper__row'
			)
		).toHaveLength( 19 );

		// Assert all 256 colors are rendered.
		expect(
			container.querySelectorAll( '.components-circular-option-picker__option' )
		).toHaveLength( 256 );
	} );

	it( 'should update color if any material color is selected', async () => {
		const { getByLabelText } = setup( baseProps );

		fireEvent.click( getByLabelText( 'Color palette' ) );
		fireEvent.click( getByLabelText( 'Color: Red 50' ) );

		expect( baseProps.onChange ).toHaveBeenCalledWith( '#ffebee' );

		// Wait till state changes are complete to prevent `act` warning.
		await wait();
	} );
} );
