/**
 * External dependencies
 */
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';

/**
 * Internal dependencies
 */
import CardImageEdit from '../../../../../../assets/src/block-editor/blocks/card/components/card-image-edit';

/**
 * Render the component.
 *
 * @param {Object} props - Component props.
 * @return {Function} A functional component.
 */
const setup = props => {
	return render( <CardImageEdit { ...props } /> );
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
};

describe( 'CardImageEdit', () => {
	it( 'matches snapshot when the image edit mode is disabled and an url is provided', () => {
		const wrapper = setup( baseProps );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'matches snapshot when the image edit mode is disabled and an url is not provided', () => {
		const props = { ...baseProps };
		props.imageSourceUrl = '';
		const wrapper = setup( props );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'matches snapshot when the image edit mode is enabled', () => {
		const props = { ...baseProps };
		props.isImageEditMode = true;
		const wrapper = setup( props );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'matches snapshot when the user chooses not to display the image', () => {
		const props = { ...baseProps };
		props.displayImage = false;
		const wrapper = setup( props );
		expect( wrapper ).toMatchSnapshot();
	} );
} );
