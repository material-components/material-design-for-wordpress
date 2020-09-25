/**
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * External dependencies
 */
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';

/**
 * Internal dependencies
 */
import Gallery from '../../../../../../assets/src/block-editor/blocks/image-list/components/gallery';

/**
 * Render the component.
 *
 * @param {Object} props - Component props
 * @return {Function} A functional component.
 */
const setup = props => {
	return render( <Gallery { ...props } /> );
};

const galleryProps = {
	images: [
		{
			caption: 'Example Image 1',
			url: 'https://i.picsum.photos/id/22/500/500.jpg',
			id: 1,
			link: 'http://example.com/image-1',
			alt: 'Example Image 1',
		},
		{
			caption: 'Example Image 2',
			url: 'https://i.picsum.photos/id/22/500/500.jpg',
			id: 2,
			link: 'http://example.com/image-2',
			alt: 'Example Image 2',
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
	selectedImage: 0,
	onRemove: jest.fn(),
	onMove: jest.fn(),
	onSelect: jest.fn(),
	onLinkChange: jest.fn(),
};

describe( 'blocks: material/image-list: Gallery', () => {
	beforeEach( () => {
		jest.clearAllMocks();
	} );

	it( 'matches snapshot when gallery has no images', () => {
		const props = { ...galleryProps, ...{ images: [] } };
		const wrapper = setup( props );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'matches snapshot when gallery has images', () => {
		const wrapper = setup( galleryProps );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( "matches snapshot when it's in saveContext", () => {
		const props = { ...galleryProps };
		props.isSaveContext = true;
		const wrapper = setup( props );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'matches snapshot when the style is grid', () => {
		const props = { ...galleryProps };
		props.style = 'grid';
		const wrapper = setup( props );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'matches snapshot when the columns are 4', () => {
		const props = { ...galleryProps };
		props.columns = 4;
		const wrapper = setup( props );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'matches snapshot when the desktop gutter is 18', () => {
		const props = { ...galleryProps, ...{ gutter: { desktop: 18 } } };
		const wrapper = setup( props );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'matches snapshot when the desktop gutter is unknown', () => {
		const props = { ...galleryProps, ...{ gutter: { desktop: 0 } } };
		const wrapper = setup( props );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'matches snapshot when cornerRadius is 8', () => {
		const props = { ...galleryProps };
		props.cornerRadius = 8;
		const wrapper = setup( props );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'matches snapshot when captions and text protection are enabled', () => {
		const props = { ...galleryProps };
		props.displayCaptions = true;
		props.textProtection = true;
		const wrapper = setup( props );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'matches snapshot when linkTo is set to custom', () => {
		const props = { ...galleryProps };
		props.linkTo = 'custom';
		const wrapper = setup( props );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'matches snapshot when linkTo is set to none', () => {
		const props = { ...galleryProps };
		props.linkTo = 'none';
		const wrapper = setup( props );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'matches snapshot when an image is selected', () => {
		const props = { ...galleryProps };
		props.selectedImage = 2;
		const wrapper = setup( props );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( "selects an image if it's clicked", () => {
		const props = { ...galleryProps };
		props.selectedImage = 2;
		const { getByAltText } = setup( props );
		fireEvent.click( getByAltText( 'Example Image 2' ) );

		expect( galleryProps.onSelect ).toHaveBeenCalledWith( 2 );
	} );

	it( "updates an image link prop when it's changed", () => {
		const props = { ...galleryProps };
		props.selectedImage = 2;
		props.linkTo = 'custom';
		const { getByAltText, getAllByLabelText } = setup( props );
		fireEvent.click( getByAltText( 'Example Image 2' ) );

		const urlFields = getAllByLabelText( /URL/i );

		fireEvent.change( urlFields[ 1 ], {
			target: { value: 'http://example.com' },
		} );

		expect( galleryProps.onLinkChange ).toHaveBeenCalledWith(
			2,
			'http://example.com'
		);
	} );

	it( 'moves an image when the move button is clicked', () => {
		const props = { ...galleryProps };
		props.selectedImage = 2;
		const { getByAltText, getAllByText } = setup( props );
		const image = getByAltText( 'Example Image 2' );
		fireEvent.click( image );

		let moveBtns = getAllByText( /arrow_left/i );

		fireEvent.click( moveBtns[ 1 ] );

		expect( galleryProps.onMove ).toHaveBeenCalledWith( 2, 'left' );

		moveBtns = getAllByText( /arrow_right/i );

		fireEvent.click( moveBtns[ 1 ] );

		expect( galleryProps.onMove ).toHaveBeenCalledWith( 2, 'right' );
	} );

	it( 'moves an image when the move keyboard events are fired', () => {
		const props = { ...galleryProps };
		props.selectedImage = 2;
		const { getByAltText } = setup( props );
		const image = getByAltText( 'Example Image 2' );
		fireEvent.click( image );

		fireEvent.keyDown( image, { key: 'ArrowLeft', keyCode: 37 } );
		expect( galleryProps.onMove ).toHaveBeenCalledWith( 2, 'left' );

		fireEvent.keyDown( image, { key: 'ArrowRight', keyCode: 39 } );
		expect( galleryProps.onMove ).toHaveBeenCalledWith( 2, 'right' );
	} );

	it( 'removes an image when the remove button is clicked', () => {
		const props = { ...galleryProps };
		props.selectedImage = 2;
		const { getByAltText, getAllByText } = setup( props );
		fireEvent.click( getByAltText( 'Example Image 2' ) );

		const closebtns = getAllByText( /close/i );

		fireEvent.click( closebtns[ 1 ] );

		expect( galleryProps.onRemove ).toHaveBeenCalledWith( 2 );
	} );

	it( 'removes an image when the remove keyboard events are fired', () => {
		const props = { ...galleryProps };
		props.selectedImage = 2;
		const { getByAltText } = setup( props );
		const image = getByAltText( 'Example Image 2' );
		fireEvent.click( image );

		fireEvent.keyDown( image, { key: 'Delete', keyCode: 46 } );
		expect( galleryProps.onRemove ).toHaveBeenCalledWith( 2 );

		fireEvent.keyDown( image, { key: 'Backspace', keyCode: 8 } );
		expect( galleryProps.onRemove ).toHaveBeenCalledWith( 2 );
	} );
} );
