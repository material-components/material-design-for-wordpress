/**
 * External dependencies
 */
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';

/**
 * Internal dependencies
 */
import PostsList from '../../../../../../assets/src/block-editor/blocks/recent-posts/components/posts-list';

// Mock InspectorControls component as not relevant in this test
jest.mock(
	'../../../../../../assets/src/block-editor/blocks/recent-posts/components/inspector-controls',
	() => {
		const InspectorControls = () => <div />;
		return InspectorControls;
	}
);

/**
 * Render the component.
 *
 * @param {Object} props - Component props
 * @return {Function} A functional component.
 */
const setup = props => {
	return render( <PostsList { ...props } /> );
};

const baseProps = {
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
	},
	recentPosts: [
		{
			title: {
				rendered: 'This is a test post title #1',
			},
			excerpt: {
				rendered: 'This is a test post excerpt #1',
			},
			authorDisplayName: 'Test user #1',
			commentsCount: 1,
			date_gmt: ' 2020-02-25 08:20:38',
			featuredImageSourceUrl: 'http://example.com/test1.jpg',
		},
		{
			title: {
				rendered: 'This is a test post title #2',
			},
			excerpt: {
				rendered: 'This is a test post excerpt #2',
			},
			authorDisplayName: 'Test user #2',
			commentsCount: 4,
			date_gmt: ' 2020-02-25T09:20:38',
			featuredImageSourceUrl: 'http://example.com/test2.jpg',
		},
	],
};

describe( 'PostsList', () => {
	afterEach( () => {
		jest.clearAllMocks();
	} );

	it( 'matches snapshot with style being "Masonry"', () => {
		const props = { ...baseProps };
		const wrapper = setup( props );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'matches snapshot with style being "List"', () => {
		const props = { ...baseProps };
		props.attributes.style = 'list';
		const wrapper = setup( props );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'matches snapshot with style being "Grid"', () => {
		const props = { ...baseProps };
		props.attributes.style = 'grid';
		const wrapper = setup( props );
		expect( wrapper ).toMatchSnapshot();
	} );
} );
