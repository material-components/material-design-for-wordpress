/**
 * External dependencies
 */
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';

/**
 * Internal dependencies
 */
import HorizontalCardLayout from '../../../../../../assets/src/block-editor/blocks/recent-posts/components/horizontal-card-layout';

/**
 * Render the component.
 *
 * @param {Object} props - Component props.
 * @return {Function} A functional component.
 */
const setup = props => {
	return render( <HorizontalCardLayout { ...props } /> );
};

const baseProps = {
	outlined: false,
	displayFeaturedImage: true,
	displayPostAuthor: true,
	displayCommentsCount: true,
	displayPostDate: true,
	titleTrimmed: 'Test Title',
	post: {
		authorDisplayName: 'Test user',
		commentsCount: 1,
		date_gmt: ' 2020-02-25 08:20:38',
	},
	dateFormat: 'F j, Y',
	imageSourceUrl: 'http://example.com/test.jpg',
	contentLayout: 'text-above-media',
};

describe( 'HorizontalCardLayout', () => {
	it( 'matches snapshot', () => {
		const props = { ...baseProps };
		const wrapper = setup( props );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'matches snapshot when the featured image should not be displayed', () => {
		const props = { ...baseProps };
		props.displayFeaturedImage = false;
		const wrapper = setup( props );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'matches snapshot when there is no featured image for the post', () => {
		const props = { ...baseProps };
		props.imageSourceUrl = false;
		const wrapper = setup( props );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'matches snapshot when the post author and the comments count should not be displayed', () => {
		const props = { ...baseProps };
		props.displayPostAuthor = false;
		props.displayCommentsCount = false;
		const wrapper = setup( props );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'matches snapshot when the featured image, post author and the comments count should not be displayed', () => {
		const props = { ...baseProps };
		props.displayFeaturedImage = false;
		props.displayPostAuthor = false;
		props.displayCommentsCount = false;
		const wrapper = setup( props );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'matches snapshot when the card should be outlined', () => {
		const props = { ...baseProps };
		props.outlined = true;
		const wrapper = setup( props );
		expect( wrapper ).toMatchSnapshot();
	} );
} );
