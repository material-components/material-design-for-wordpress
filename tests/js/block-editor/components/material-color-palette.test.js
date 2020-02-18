/**
 * External dependencies
 */
import { mount } from 'enzyme';

/**
 * Internal dependencies
 */
import MaterialColorPalette from '../../../../assets/src/block-editor/components/material-color-palette';

describe( 'MaterialColorPalette', () => {
	const currentColor = '#263238';
	const label = 'Select Material Color';
	const onChange = jest.fn();

	const wrapper = mount(
		<MaterialColorPalette
			value={ currentColor }
			onChange={ onChange }
			label={ label }
		/>
	);
	const buttons = wrapper.find( 'Option button' );

	beforeEach( () => {
		onChange.mockClear();
	} );

	it( 'should render 254 material color button options', () => {
		expect( buttons ).toHaveLength( 254 );
	} );

	it( 'should render the label', () => {
		const labelWrap = wrapper.find(
			'.material-component-color-palette__label'
		);
		expect( labelWrap ).toHaveLength( 1 );
		expect( labelWrap.text() ).toStrictEqual( label );
	} );

	it( 'should call onClick on an active button with undefined', () => {
		const activeButton = buttons.findWhere( button =>
			button.hasClass( 'is-pressed' )
		);
		activeButton.simulate( 'click' );

		expect( onChange ).toHaveBeenCalledTimes( 1 );
		expect( onChange ).toHaveBeenCalledWith( undefined );
	} );

	it( 'should call onClick on an inactive button', () => {
		const inactiveButton = buttons
			.findWhere( button => ! button.hasClass( 'is-pressed' ) )
			.first();
		inactiveButton.simulate( 'click' );

		expect( onChange ).toHaveBeenCalledTimes( 1 );
	} );

	it( 'should call onClick with undefined, when the clearButton onClick is triggered', () => {
		const clearButton = wrapper.find( 'ButtonAction button' );

		expect( clearButton ).toHaveLength( 1 );

		clearButton.simulate( 'click' );

		expect( onChange ).toHaveBeenCalledTimes( 1 );
		expect( onChange ).toHaveBeenCalledWith( undefined );
	} );
} );
