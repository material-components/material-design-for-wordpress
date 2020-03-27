/**
 * External dependencies
 */
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';

/**
 * Internal dependencies
 */
import PostsControl from '../../../../assets/src/block-editor/components/posts-control';

jest.mock( '@woocommerce/components', () => {
	return {
		SearchListControl: props => {
			return <div className={ props.className } />;
		},
	};
} );

jest.mock(
	'../../../../assets/src/block-editor/hocs/with-searched-posts.js',
	() => {
		return {
			__esModule: true,
			default: Component => Component,
		};
	}
);

/**
 * Render the component.
 *
 * @param {Object} props - Component props.
 * @return {Function} A functional component.
 */
const setup = props => {
	return render( <PostsControl { ...props } /> );
};

describe( 'PostsControl', () => {
	it( 'matches snapshot', () => {
		const props = {
			error: undefined,
			onChange: jest.fn(),
			onSearch: jest.fn(),
			selected: [ 2 ],
			posts: [
				{
					id: 1,
				},
				{
					id: 2,
				},
				{
					id: 3,
				},
			],
			isLoading: false,
		};
		const wrapper = setup( props );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'matches snapshot when there is an error', () => {
		const props = {
			error: { type: 'general', message: 'Test error message' },
			onChange: jest.fn(),
			onSearch: jest.fn(),
			selected: [],
			posts: [],
			isLoading: false,
		};
		const wrapper = setup( props );
		expect( wrapper ).toMatchSnapshot();
	} );
} );
