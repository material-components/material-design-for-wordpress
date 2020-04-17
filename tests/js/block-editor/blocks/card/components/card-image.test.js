/**
 * External dependencies
 */
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';

/**
 * Internal dependencies
 */
import CardImage from '../../../../../../assets/src/block-editor/blocks/card/components/card-image';

/**
 * Render the component.
 *
 * @param {Object} props - Component props.
 * @return {Function} A functional component.
 */
const setup = props => {
	return render( <CardImage { ...props } /> );
};

const baseProps = {
	imageSourceUrl: 'http://test.loc/test.jpg',
	isImageEditMode: false,
	contentLayout: 'text-over-media',
	displayImage: true,
	type: '16-9',
	cardPrimaryProps: {},
	cardIndex: 0,
	setter: jest.fn(),
	isEditMode: false,
};

describe( 'CardImage', () => {
	it( 'matches snapshot when the global edit mode is disabled and content layout is `text-over-media`', () => {
		const wrapper = setup( baseProps );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'matches snapshot when the global edit mode is enabled and content layout is `text-over-media`', () => {
		const props = { ...baseProps };
		props.isEditMode = true;
		const wrapper = setup( props );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'matches snapshot when content layout is `text-under-media`', () => {
		const props = { ...baseProps };
		props.contentLayout = 'text-under-media';
		const wrapper = setup( props );
		expect( wrapper ).toMatchSnapshot();
	} );
} );
