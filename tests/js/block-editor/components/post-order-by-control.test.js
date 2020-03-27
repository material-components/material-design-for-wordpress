/**
 * External dependencies
 */
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import { mount } from 'enzyme';

/**
 * Internal dependencies
 */
import PostsOrderbyControl from '../../../../assets/src/block-editor/components/post-order-by-control/index';

/**
 * Render the component.
 *
 * @param {Object} props - Component props.
 * @return {Function} A functional component.
 */
const setup = props => {
	return render( <PostsOrderbyControl { ...props } /> );
};

describe( 'PostsOrderbyControl', () => {
	const onChangeMock = jest.fn();

	afterEach( () => {
		onChangeMock.mockClear();
	} );

	it( 'matches snapshot', () => {
		const props = {
			value: 'date',
		};
		const wrapper = setup( props );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'the change event has been triggered', () => {
		const props = {
			value: 'date',
			onChange: onChangeMock,
		};

		const wrapper = mount( <PostsOrderbyControl { ...props } /> );
		const select = wrapper.find( '.components-select-control__input' );
		select.simulate( 'change', {
			target: { value: 'title' },
		} );
		expect( onChangeMock ).toHaveBeenCalledWith( 'title' );
	} );
} );
