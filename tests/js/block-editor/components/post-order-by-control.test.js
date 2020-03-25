/**
 * External dependencies
 */
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';

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
	it( 'matches snapshot', () => {
		const props = {
			value: 'date',
		};
		const wrapper = setup( props );
		expect( wrapper ).toMatchSnapshot();
	} );
} );
