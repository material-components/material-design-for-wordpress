/**
 * External dependencies
 */
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';

/**
 * Internal dependencies
 */
import Save from '../../../../../assets/src/block-editor/blocks/image-list/save';

/**
 * Render the component.
 *
 * @param {Object} props - Component props
 * @return {Function} A functional component.
 */
const setup = props => {
	return render( <Save { ...props } /> );
};

const galleryProps = {
	attributes: {
		images: [
			{
				caption: 'Example Image 1',
				url: 'https://i.picsum.photos/id/22/500/500.jpg',
				id: 1,
				link: 'http://example.com/image-1',
			},
			{
				caption: 'Example Image 2',
				url: 'https://i.picsum.photos/id/22/500/500.jpg',
				id: 2,
				link: 'http://example.com/image-2',
			},
		],
		style: 'masonry',
		columns: 2,
		gutter: {
			desktop: 24,
		},
		cornerRadius: 4,
		displayCaptions: false,
		textProtection: false,
		linkTo: 'media',
	},
	className: 'wp-block-material-image-list',
	isSelected: true,
	setAttributes: jest.fn(),
	noticeUI: jest.fn(),
	noticeOperations: jest.fn(),
};

describe( 'blocks: material/image-list: Edit', () => {
	it( 'matches snapshot', () => {
		const wrapper = setup( galleryProps );
		expect( wrapper ).toMatchSnapshot();
	} );
} );
