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
import { registerStore } from '@wordpress/data';

/**
 * Internal dependencies
 */
import Edit from '../../../../../assets/src/block-editor/blocks/image-list/edit';

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
				alt: 'Example Image 1 alt',
			},
			{
				caption: 'Example Image 2',
				url: 'https://i.picsum.photos/id/22/500/500.jpg',
				id: 2,
				link: 'http://example.com/image-2',
				alt: 'Example Image 2 alt',
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
		displayCaptions: true,
		textProtection: false,
		linkTo: 'media',
		id: 'block-material-image-list-0',
	},
	isSelected: true,
	setAttributes: jest.fn(),
	noticeUI: jest.fn(),
	noticeOperations: jest.fn(),
	name: 'material/image-list',
};

describe( 'blocks: material/image-list: Edit', () => {
	beforeAll( () => {
		global.materialDesign = {
			customizerUrls: {
				shape: 'http://example.com/shape',
				colors: 'http://example.com/colors',
			},
		};
	} );

	beforeEach( () => {
		jest.clearAllMocks();
	} );

	it( 'matches snapshot', () => {
		const wrapper = setup( galleryProps );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( "sets id if it's undefined", () => {
		const props = {
			...galleryProps,
			attributes: { ...galleryProps.attributes, id: undefined },
		};
		const { getAllByText } = setup( props );
		const closebtns = getAllByText( /close/i );

		fireEvent.click( closebtns[ 1 ] );
		expect( props.setAttributes.mock.calls[ 0 ][ 0 ].id ).toStrictEqual(
			'block-material-image-list-1'
		);
	} );

	it( 'fetches captions using `getEntityRecords` and updates the caption prop of images', () => {
		const props = { ...galleryProps };
		const { container } = setup( props );

		const images = container.querySelectorAll( '.mdc-image-list__label' );
		expect( images ).toHaveLength( 2 );

		expect( images[ 1 ].innerHTML ).toStrictEqual(
			'Example Image 2 caption'
		);
	} );

	it( "selects an image if it's clicked", () => {
		const props = { ...galleryProps };
		const { container, getByAltText } = setup( props );

		fireEvent.click( getByAltText( 'Example Image 2 alt' ) );
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
		expect( props.setAttributes.mock.calls[ 0 ][ 0 ].images ).toHaveLength(
			1
		);
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
		fireEvent.click( getByAltText( 'Example Image 2 alt' ) );

		const urlFields = getAllByLabelText( /URL/i );

		fireEvent.change( urlFields[ 1 ], {
			target: { value: 'http://example.com' },
		} );

		expect(
			props.setAttributes.mock.calls[ 0 ][ 0 ].images[ 1 ].link
		).toStrictEqual( 'http://example.com' );
	} );
} );
