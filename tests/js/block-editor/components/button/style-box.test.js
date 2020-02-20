/**
 * External dependencies
 */
import { mount } from 'enzyme';

/**
 * Internal dependencies
 */
import StyleBox from '../../../../../assets/src/block-editor/blocks/button/components/style-box';

describe( 'StyleBox', () => {
	const label = 'Raised';
	const onClick = jest.fn();

	const wrapper = mount(
		<StyleBox label={ label } active={ true } onClick={ onClick }></StyleBox>
	);

	const button = wrapper.find( 'button.styles-container__style-box' );

	beforeEach( () => {
		onClick.mockClear();
	} );

	it( 'should have the appropriate label', () => {
		const buttonLabel = button.findWhere( inner =>
			inner.hasClass( 'styles-container__style-box__text' )
		);

		expect( buttonLabel ).toHaveLength( 1 );
		expect( buttonLabel.text() ).toStrictEqual( label );
	} );

	it( 'should have "active" class if the active prop is true', () => {
		const activeBtn = button.findWhere( inner =>
			inner.hasClass( 'styles-container__style-box--active' )
		);

		expect( activeBtn ).toHaveLength( 1 );
	} );

	it( 'should trigger the onClick handler', () => {
		button.simulate( 'click' );
		expect( onClick ).toHaveBeenCalledTimes( 1 );
		expect( onClick ).toHaveBeenCalledWith( expect.any( Object ) );
	} );
} );
