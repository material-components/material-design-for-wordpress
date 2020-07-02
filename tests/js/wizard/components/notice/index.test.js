import { mount } from 'enzyme';
import '@testing-library/jest-dom/extend-expect';

/**
 * Internal dependencies
 */
import Notice from '../../../../../assets/src/wizard/components/notice';

const baseProps = {
	type: 'notice-error',
	message: 'There was an error',
};

describe( 'Notice', () => {
	const wrapper = mount( <Notice { ...baseProps } /> );

	it( 'should render message', () => {
		const textWrap = wrapper.find( 'p' );
		expect( textWrap ).toHaveLength( 1 );
		expect( textWrap.text() ).toStrictEqual( baseProps.message );
	} );
} );
