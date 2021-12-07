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

/**
 * Internal dependencies
 */
import VerticalCardLayout from '../../../../../../assets/src/block-editor/blocks/card/components/vertical-card-layout';

/**
 * Render the component.
 *
 * @param {Object} props - Component props.
 * @return {Function} A functional component.
 */
const setup = props => {
	return render( <VerticalCardLayout { ...props } /> );
};

const baseProps = {
	cardIndex: 0,
	contentLayout: 'text-under-media',
	title: 'Test title',
	displayTitle: true,
	secondaryText: 'Test secondary text',
	displaySecondaryText: true,
	supportingText: 'Test supporting text',
	displaySupportingText: true,
	imageSourceUrl: 'http://test.loc/test.jpg',
	isImageEditMode: false,
	displayImage: true,
	primaryActionButtonLabel: 'Test button action 1',
	primaryActionButtonUrl: 'http://test.loc/hello-world',
	primaryActionButtonNewTab: true,
	primaryActionButtonNoFollow: true,
	secondaryActionButtonLabel: 'Test button action 2',
	secondaryActionButtonUrl: 'http://test.loc/hello-world-again',
	secondaryActionButtonNewTab: true,
	secondaryActionButtonNoFollow: true,
	displaySecondaryActionButton: true,
	displayActions: true,
	cardStyle: 'global',
	cornerRadius: 4,
	setter: jest.fn(),
	isEditMode: false,
};

describe( 'VerticalCardLayout', () => {
	it( 'matches snapshot', () => {
		const wrapper = setup( baseProps );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'matches snapshot when the image should not be displayed', () => {
		const props = { ...baseProps };
		props.displayImage = false;
		const wrapper = setup( props );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'matches snapshot when the action row should not be displayed', () => {
		const props = { ...baseProps };
		props.displayActions = false;
		const wrapper = setup( props );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'matches snapshot when the corner radius is undefined', () => {
		const props = { ...baseProps };
		props.cornerRadius = undefined;
		const wrapper = setup( props );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'matches snapshot when the supporting text should not be displayed', () => {
		const props = { ...baseProps };
		props.displaySupportingText = false;
		const wrapper = setup( props );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'matches snapshot when the content layout is text above media', () => {
		const props = { ...baseProps };
		props.contentLayout = 'text-above-media';
		const wrapper = setup( props );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'matches snapshot when the content layout is text over media', () => {
		const props = { ...baseProps };
		props.contentLayout = 'text-over-media';
		const wrapper = setup( props );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'matches snapshot when the content layout is text over media and the image source url is missing', () => {
		const props = { ...baseProps };
		props.contentLayout = 'text-over-media';
		props.imageSourceUrl = '';
		const wrapper = setup( props );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'matches snapshot when the content layout is text over media and the image should not be displayed', () => {
		const props = { ...baseProps };
		props.contentLayout = 'text-over-media';
		props.displayImage = false;
		const wrapper = setup( props );
		expect( wrapper ).toMatchSnapshot();
	} );
} );
