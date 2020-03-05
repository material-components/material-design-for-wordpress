/**
 * External dependencies
 */
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';

/**
 * Internal dependencies
 */
import CardHeader from '../../../../../../assets/src/block-editor/blocks/recent-posts/components/card-header';

/**
 * Render the component.
 *
 * @param {Object} props - Component props
 * @return {Function} A functional component.
 */
const setup = props => {
	return render( <CardHeader { ...props } /> );
};

const baseProps = {
	titleTrimmed: 'Test Title',
	displayPostDate: true,
	post: {
		date_gmt: ' 2020-02-25T08:20:38',
	},
	dateFormat: 'F j, Y',
};

describe( 'CardActions', () => {
	it( 'matches snapshot when the post date should be displayed', () => {
		const props = { ...baseProps };
		const wrapper = setup( props );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'matches snapshot when the post date should not be displayed', () => {
		const props = { ...baseProps };
		props.displayPostDate = false;
		const wrapper = setup( props );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'matches snapshot when there is not title', () => {
		const props = { ...baseProps };
		props.titleTrimmed = null;
		const wrapper = setup( props );
		expect( wrapper ).toMatchSnapshot();
	} );
} );
