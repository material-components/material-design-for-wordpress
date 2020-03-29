/**
 * External dependencies
 */
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';

/**
 * Internal dependencies
 */
import NoPosts from '../../../../../../assets/src/block-editor/blocks/common-posts-list/components/no-posts';

// Mock InspectorControls component as not relevant in this test
jest.mock(
	'../../../../../../assets/src/block-editor/blocks/common-posts-list/components/inspector-controls.js',
	() => {
		const InspectorControls = () => <div />;
		return InspectorControls;
	}
);

/**
 * Render the component.
 *
 * @param {Object} props - Component props.
 * @return {Function} A functional component.
 */
const setup = props => {
	return render( <NoPosts { ...props } /> );
};

describe( 'NoPosts', () => {
	afterEach( () => {
		jest.clearAllMocks();
	} );

	it( 'matches snapshot when the block is "Recent Posts"', () => {
		const wrapper = setup( {
			name: 'material/recent-posts',
			postsToDisplay: [],
		} );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'matches snapshot when the block is "Hand-picked Posts"', () => {
		const wrapper = setup( {
			name: 'material/hand-picked-posts',
			postsToDisplay: [],
		} );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'matches snapshot when there are no post to display', () => {
		const wrapper = setup( {
			name: 'material/recent-posts',
			postsToDisplay: null,
		} );
		expect( wrapper ).toMatchSnapshot();
	} );
} );
