/**
 * External dependencies
 */
import '@testing-library/jest-dom/extend-expect';
import { shallow } from 'enzyme';
import { render, fireEvent } from '@testing-library/react';

/**
 * Internal dependencies
 */
import PostsPicker from '../../../../../../assets/src/block-editor/blocks/hand-picked-posts/components/posts-picker';

// Mock PostsControl component as not relevant in this test and failing to pass tests
// due to the SearchListControl WooCommerce component.
jest.mock(
	'../../../../../../assets/src/block-editor/components/posts-control/index.js',
	() => {
		const PostsControl = () => <div />;
		return PostsControl;
	}
);

/**
 * Render the component.
 *
 * @param {Object} props - Component props.
 * @return {Function} A functional component.
 */
const fullRender = props => {
	return render( <PostsPicker { ...props } /> );
};

/**
 * Shallow render the component.
 *
 * @param {Object} props - Component props.
 * @return {Function} A functional component.
 */
const shallowRender = props => {
	return shallow( <PostsPicker { ...props } /> );
};

describe( 'PostsPicker', () => {
	it( 'matches snapshot using full rendering', () => {
		const wrapper = fullRender( {
			attributes: { posts: [ 1, 2, 3 ] },
		} );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'matches snapshot using shallow rendering', () => {
		const wrapper = shallowRender( {
			attributes: { posts: [ 1, 2, 3 ] },
		} );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'invokes setAttributes with editMode on `Done` click', () => {
		const props = {
			attributes: { posts: [ 1, 2, 3 ] },
			setAttributes: jest.fn(),
			debouncedSpeak: jest.fn(),
		};
		const { getByText } = fullRender( props );

		fireEvent.click( getByText( 'Done' ) );

		expect( props.setAttributes.mock.calls[ 0 ][ 0 ].editMode ).toStrictEqual(
			false
		);
		expect( props.debouncedSpeak.mock.calls[ 0 ][ 0 ] ).toContain(
			'Showing Hand-picked Posts block'
		);
	} );
} );
