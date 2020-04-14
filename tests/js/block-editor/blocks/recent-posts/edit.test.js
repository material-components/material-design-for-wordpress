/**
 * External dependencies
 */
import '@testing-library/jest-dom/extend-expect';
import { render, wait } from '@testing-library/react';
import { registerStore } from '@wordpress/data';

/**
 * Internal dependencies
 */
import Edit from '../../../../../assets/src/block-editor/blocks/recent-posts/edit';

// Mock PostsControl component as not relevant in this test and failing to pass tests
// due to the SearchListControl WooCommerce component.
jest.mock(
	'../../../../../assets/src/block-editor/components/posts-control/index.js',
	() => {
		const PostsControl = () => <div />;
		return PostsControl;
	}
);

// Mock the <InspectorControls> component only, so that the other components in this package behave as usual.
jest.mock( '@wordpress/block-editor', () => {
	const original = require.requireActual( '@wordpress/block-editor' );
	return {
		...original,
		InspectorControls: ( { children } ) => children,
	};
} );

registerStore( 'core', {
	reducer: jest.fn(),
	selectors: {
		getEntityRecords: () => {
			return [
				{
					id: 1,
					caption: {
						raw: 'Example 1 caption',
					},
					title: {
						rendered: 'Example 1 Title',
					},
					excerpt: {
						rendered: 'Example 1 excerpt',
					},
					// eslint-disable-next-line prettier/prettier
					date_gmt: '2020-03-26',
				},
				{
					id: 2,
					caption: {
						raw: 'Example 2 caption',
					},
					title: {
						rendered: 'Example 2 Title',
					},
					excerpt: {
						rendered: 'Example 2 excerpt',
					},
					// eslint-disable-next-line prettier/prettier
					date_gmt: '2020-03-26',
				},
			];
		},
	},
} );

/**
 * Shallow render the component.
 *
 * @param {Object} props - Component props.
 * @return {Function} A functional component.
 */
const setup = props => {
	return render( <Edit { ...props } /> );
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
};

describe( 'Edit', () => {
	it( 'matches snapshot', async () => {
		const props = {
			...baseProps,
			...{
				attributes: {
					...baseProps.attributes,
					editMode: false,
				},
			},
		};

		const wrapper = setup( props );
		await wait( () => expect( wrapper ).toMatchSnapshot() );
	} );
} );
