/**
 * External dependencies
 */
import { mount } from 'enzyme';

/**
 * Internal dependencies
 */
import IconPositionButtons from '../../../../../assets/src/block-editor/blocks/button/components/icon-position-buttons';

describe( 'IconPositionButtons', () => {
	const onClick = jest.fn();
	const wrapper = mount(
		<IconPositionButtons currentPosition="none" onClick={ onClick } />
	);

	const buttons = wrapper.find( 'button.icon-position__list-item__button' );

	beforeEach( () => {
		onClick.mockClear();
	} );

	it( 'should render 3 buttons: None, Leading and Trailing', () => {
		expect( buttons ).toHaveLength( 3 );
	} );

	it( 'should add active class to the "None" button', () => {
		const activeBtn = buttons.findWhere( button =>
			button.hasClass( 'icon-position__list-item__button--active' )
		);

		expect( activeBtn ).toHaveLength( 1 );
		expect( activeBtn.text() ).toStrictEqual( 'None' );
	} );

	it( 'should trigger the onClick handler', () => {
		const activeBtn = buttons.findWhere( button =>
			button.hasClass( 'icon-position__list-item__button--active' )
		);

		activeBtn.simulate( 'click' );

		expect( onClick ).toHaveBeenCalledTimes( 1 );
		expect( onClick ).toHaveBeenCalledWith( 'none', expect.any( Object ) );
	} );
} );
