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
import Save from '../../../../../assets/src/block-editor/blocks/cards-collection/save';

/**
 * Render the component.
 *
 * @param {Object} props - Component props.
 * @return {Function} A functional component.
 */
const setup = props => {
	return render( <Save { ...props } /> );
};

jest.mock( '@wordpress/block-editor', () => ( {
	...jest.requireActual( '@wordpress/block-editor' ),
	useBlockProps: {
		save: props => props,
	},
} ) );

const baseProps = {
	attributes: {
		style: 'masonry',
		columns: 4,
		align: 'wide',
		gutter: 16,
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
		numberOfCards: 1,
	},
	className: 'test',
};

describe( 'blocks: material/cards-collection: Save', () => {
	it( 'matches snapshot', () => {
		const wrapper = setup( baseProps );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'matches snapshot when style props is `grid`', () => {
		const props = cloneDeep( baseProps );
		props.attributes.style = 'grid';
		const wrapper = setup( props );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'matches snapshot when style props is `list`', () => {
		const props = cloneDeep( baseProps );
		props.attributes.style = 'list';
		const wrapper = setup( props );
		expect( wrapper ).toMatchSnapshot();
	} );
} );
