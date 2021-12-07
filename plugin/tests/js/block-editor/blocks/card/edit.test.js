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
import { cloneDeep } from 'lodash';

/**
 * Internal dependencies
 */
import Edit from '../../../../../assets/src/block-editor/blocks/card/edit';

/**
 * Render the component.
 *
 * @param {Object} props - Component props.
 * @return {Function} A functional component.
 */
const setup = props => {
	return render( <Edit { ...props } /> );
};

const baseProps = {
	attributes: {
		cardLayout: 'vertical',
		contentLayout: 'text-under-media',
		title: 'Test title',
		displayTitle: true,
		secondaryText: 'Test secondary text',
		displaySecondaryText: true,
		imageSourceUrl: 'http://test.loc/test.jpg',
		isImageEditMode: false,
		displayImage: true,
		supportingText: 'Test supporting text',
		displaySupportingText: true,
		primaryActionButtonLabel: 'Test button action 1',
		primaryActionButtonUrl: 'http://test.loc/hello-world',
		primaryActionButtonNewTab: true,
		primaryActionButtonNoFollow: true,
		secondaryActionButtonLabel: 'Test button action 2',
		secondaryActionButtonUrl: 'http://test.loc/hello-world-again',
		secondaryActionButtonNewTab: true,
		secondaryActionButtonNoFollow: true,
		displayActions: true,
		displaySecondaryActionButton: true,
		cardStyle: 'global',
		cornerRadius: 4,
	},
};

describe( 'blocks: material/card: Edit', () => {
	beforeAll( () => {
		global.materialDesign = {
			defaults: {
				colors: {
					primary_color: '#6200ee',
					on_primary_color: '#ffffff',
					secondary_color: '#018786',
					on_secondary_color: '#ffffff',
				},
				globalStyle: {
					card_style: 'outlined',
				},
			},
			customizerUrls: {
				shape: 'http://example.com/shape',
				colors: 'http://example.com/colors',
			},
		};
	} );

	it( 'matches snapshot', () => {
		const wrapper = setup( baseProps );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'matches snapshot with a `horizontal` card layout.', () => {
		const props = cloneDeep( baseProps );
		props.attributes.cardLayout = 'horizontal';
		const wrapper = setup( props );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'matches snapshot when props get defaults', () => {
		const props = cloneDeep( baseProps );
		delete props.attributes.cardLayout;
		const wrapper = setup( props );
		expect( wrapper ).toMatchSnapshot();
	} );
} );
