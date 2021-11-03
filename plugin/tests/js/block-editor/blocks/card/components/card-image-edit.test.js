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
import { render } from '@testing-library/react';
import { shallow, mount } from 'enzyme';

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

/**
 * Render the component in a shallow mode using enzyme.
 *
 * @param {Object} props - Component props.
 * @return {Function} A functional component.
 */
const setupShallow = props => {
	return shallow( <CardImageEdit { ...props } /> );
};

/**
 * Render the component in a mount mode using enzyme.
 *
 * @param {Object} props - Component props.
 * @return {Function} A functional component.
 */
const setupMount = props => {
	return mount( <CardImageEdit { ...props } /> );
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
	afterEach( () => {
		jest.clearAllMocks();
	} );

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

	it( 'matches snapshot when the card is focused', () => {
		const props = { ...baseProps };
		props.isFocused = true;
		const wrapper = setup( props );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'updates the image source url and the edit image mode props when an image is selected', () => {
		const props = { ...baseProps };
		props.isImageEditMode = true;
		const wrapper = setupShallow( props );

		// The mock event itself is not correct but not too important in the case to test
		// the number of times the prop setters has been called
		const mockEvent = { el: { url: 'http://test.loc/test.jpg' } };
		wrapper.find( 'MediaPlaceholder' ).simulate( 'select', mockEvent );
		expect( props.setter ).toHaveBeenCalledTimes( 2 );
	} );

	it( 'updates the image source url and the edit image mode props when an image is removed', () => {
		const props = { ...baseProps };
		props.isFocused = true;
		const wrapper = setupShallow( props );
		wrapper
			.find( '.material-design-card__media-close-button' )
			.simulate( 'click' );
		expect( props.setter ).toHaveBeenCalledTimes( 2 );
	} );

	it( 'updates the image container class when the the image container is blur', () => {
		const props = { ...baseProps };
		props.isImageEditMode = false;
		const wrapper = setupMount( props );
		wrapper
			.find( '.material-design-card__media-container' )
			.simulate( 'blur' );
		expect(
			wrapper
				.find( '.material-design-card__media-container' )
				.hasClass( 'material-design-card__media-container-focused' )
		).toBe( false );
	} );
} );
