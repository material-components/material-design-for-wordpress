/**
 * External dependencies
 */
import '@testing-library/jest-dom/extend-expect';
import { shallow } from 'enzyme';

/**
 * Internal dependencies
 */
import Edit from '../../../../../../assets/src/block-editor/blocks/hand-picked-posts/edit';

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
 * Shallow render the component.
 *
 * @param {Object} props - Component props.
 * @return {Function} A functional component.
 */
const setup = props => {
	return shallow( <Edit { ...props } /> );
};

// TODO: This test needs to be revised as this is probably not the correct way to do it but serves as a base.
// The problem with testing this component is due to hooks in child components.
describe( 'Edit', () => {
	it( 'matches snapshot', () => {
		const wrapper = setup( {
			attributes: {
				style: 'masonry',
				contentLayout: 'text-above-media',
				columns: 3,
				postsToShow: 12,
				outlined: false,
				displayPostDate: true,
				displayPostContent: true,
				postContentLength: 20,
				displayFeaturedImage: true,
				displayCommentsCount: true,
				displayPostAuthor: false,
				category: undefined,
				posts: [],
				editMode: true,
			},
		} );
		expect( wrapper ).toMatchSnapshot();
	} );
} );
