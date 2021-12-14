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
import { shallow } from 'enzyme';
import { cloneDeep } from 'lodash';

/**
 * Internal dependencies
 */
import CardsCollectionInspectorControls from '../../../../../../assets/src/block-editor/blocks/cards-collection/components/cards-collection-inspector-controls';

/**
 * Render the component in a shallow mode using enzyme.
 *
 * @param {Object} props - Component props.
 * @return {Function} A functional component.
 */
const setupShallow = props => {
	return shallow( <CardsCollectionInspectorControls { ...props } /> );
};

const baseProps = {
	attributes: {
		style: 'masonry',
		columns: 2,
		contentLayout: 'text-under-media',
		numberOfCards: 1,
		cardsProps: [
			{
				contentLayout: 'text-under-media',
				title: 'Title goes here',
				displayTitle: true,
				secondaryText: 'Secondary text',
				displaySecondaryText: true,
				imageSourceUrl: '',
				isImageEditMode: false,
				displayImage: true,
				supportingText: 'Supporting text',
				displaySupportingText: true,
				primaryActionButtonLabel: 'Button text',
				primaryActionButtonUrl: '',
				primaryActionButtonNewTab: false,
				primaryActionButtonNoFollow: false,
				secondaryActionButtonLabel: 'Button text',
				secondaryActionButtonUrl: '',
				secondaryActionButtonNewTab: false,
				secondaryActionButtonNoFollow: false,
				displayActions: true,
				displaySecondaryActionButton: false,
				outlined: false,
				cornerRadius: 4,
			},
		],
		gutter: 16,
		cornerRadius: 4,
		outlined: true,
		allowIndividualStyleOverride: false,
		allowIndividualContentOverride: false,
		displayTitle: true,
		displaySecondaryText: true,
		displaySupportingText: true,
		displayActions: true,
		displaySecondaryActionButton: true,
		displayImage: true,
		setter: jest.fn(),
	},
	setAttributes: jest.fn(),
};

describe( 'CardsCollectionInspectorControls', () => {
	afterEach( () => {
		jest.clearAllMocks();
	} );

	it( 'matches snapshot', () => {
		const wrapper = setupShallow( baseProps );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'matches snapshot when individual overrides attributes are enabled', () => {
		const props = cloneDeep( baseProps );
		props.attributes.allowIndividualContentOverride = true;
		props.attributes.allowIndividualStyleOverride = true;
		const wrapper = setupShallow( props );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'matches snapshot when the style attributes is `list`', () => {
		const props = cloneDeep( baseProps );
		props.attributes.style = 'list';
		const wrapper = setupShallow( props );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'updates the display title and display secondary text attributes when the display title attribute is changed changed', () => {
		const wrapper = setupShallow( baseProps );

		const mockEvent = { target: { value: false } };
		wrapper.find( 'ToggleControl' ).at( 1 ).simulate( 'change', mockEvent );
		expect( baseProps.setAttributes ).toHaveBeenCalledWith( {
			displaySecondaryText: { target: { value: false } },
			displayTitle: { target: { value: false } },
		} );
	} );
} );
