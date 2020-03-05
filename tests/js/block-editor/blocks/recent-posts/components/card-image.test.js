/**
 * External dependencies
 */
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';

/**
 * Internal dependencies
 */
import CardImage from '../../../../../../assets/src/block-editor/blocks/recent-posts/components/card-image';

/**
 * Render the component.
 *
 * @param {Object} props - Component props
 * @return {Function} A functional component.
 */
const setup = props => {
	return render( <CardImage { ...props } /> );
};

const baseProps = {
	imageSourceUrl: 'http://example.com/test.jpg',
	type: '16-9',
	contentLayout: 'text-above-media',
};

describe( 'CardImage', () => {
	it( 'matches snapshot when the content layout is not "Text over media"', () => {
		const wrapper = setup( baseProps );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'matches snapshot when the content layout is "Text over media"', () => {
		const props = {
			titleTrimmed: 'Test Title',
			displayPostDate: true,
			post: {
				date_gmt: ' 2020-02-25T08:20:38',
			},
			dateFormat: 'F j, Y',
			...baseProps,
		};

		props.contentLayout = 'text-over-media';

		const wrapper = setup( props );
		expect( wrapper ).toMatchSnapshot();
	} );
} );
