/**
 * External dependencies
 */
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import { registerStore } from '@wordpress/data';

/**
 * Internal dependencies
 */
import Edit from '../../../../../assets/src/block-editor/blocks/image-list/edit';

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
						raw: 'Example Image 1 caption',
					},
				},
				{
					id: 2,
					caption: {
						raw: 'Example Image 2 caption',
					},
				},
			];
		},
	},
} );

/**
 * Render the component.
 *
 * @param {Object} props - Component props
 * @return {Function} A functional component.
 */
const setup = props => {
	return render( <Edit { ...props } /> );
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
			tablet: 18,
			mobile: 12,
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
	beforeEach( () => {
		jest.clearAllMocks();
	} );

	it( 'matches snapshot', () => {
		const wrapper = setup( galleryProps );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'fetches captions using `getEntityRecords` and updates the caption prop of images', () => {
		const props = { ...galleryProps };
		const { getByAltText } = setup( props );

		const image = getByAltText( 'Example Image 2 caption' );
		expect( image ).toBeInTheDocument();
	} );

	it( "selects an image if it's clicked", () => {
		const props = { ...galleryProps };
		const { container, getByAltText } = setup( props );

		fireEvent.click( getByAltText( 'Example Image 2 caption' ) );
		const imageItems = container.querySelectorAll(
			'.mdc-image-list__item-wrap'
		);

		expect( imageItems[ 1 ].className ).toContain( 'is-selected' );
	} );

	it( 'removes an image if delete button is clicked', () => {
		const props = { ...galleryProps };
		const { getAllByText } = setup( props );
		const closebtns = getAllByText( /close/i );

		fireEvent.click( closebtns[ 1 ] );
		expect( props.setAttributes.mock.calls[ 0 ][ 0 ].images ).toHaveLength( 1 );
	} );

	it( 'moves an image if move buttons are clicked', () => {
		const props = { ...galleryProps };
		const { getAllByText } = setup( props );
		let moveBtns = getAllByText( /arrow_left/i );

		fireEvent.click( moveBtns[ 1 ] );
		expect(
			props.setAttributes.mock.calls[ 0 ][ 0 ].images[ 0 ].id
		).toStrictEqual( 2 );

		moveBtns = getAllByText( /arrow_right/i );
		fireEvent.click( moveBtns[ 1 ] );

		expect(
			props.setAttributes.mock.calls[ 1 ][ 0 ].images[ 0 ].id
		).toStrictEqual( 1 );
	} );

	it( 'updates an image link if linkTo is custom and link is updated', () => {
		const props = { ...galleryProps };
		props.attributes.linkTo = 'custom';
		const { getByAltText, getAllByLabelText } = setup( props );
		fireEvent.click( getByAltText( 'Example Image 2 caption' ) );

		const urlFields = getAllByLabelText( /URL/i );

		fireEvent.change( urlFields[ 1 ], {
			target: { value: 'http://example.com' },
		} );

		expect(
			props.setAttributes.mock.calls[ 0 ][ 0 ].images[ 1 ].link
		).toStrictEqual( 'http://example.com' );
	} );

	it( 'updates correct device gutter on gutter change', () => {
		const props = { ...galleryProps };
		const { container, getByText } = setup( props );
		let button = getByText( /tablet/i );

		fireEvent.click( button );
		fireEvent.change(
			container.querySelectorAll( '.components-range-control__number' )[ 1 ],
			{
				target: { value: 12 },
			}
		);

		expect(
			props.setAttributes.mock.calls[ 0 ][ 0 ].gutter.tablet
		).toStrictEqual( 12 );

		button = getByText( /smartphone/i );
		fireEvent.click( button );
		fireEvent.change(
			container.querySelectorAll( '.components-range-control__number' )[ 1 ],
			{
				target: { value: 18 },
			}
		);

		expect(
			props.setAttributes.mock.calls[ 1 ][ 0 ].gutter.mobile
		).toStrictEqual( 18 );
	} );
} );
