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
import Edit from '../../../../../assets/src/block-editor/blocks/tab-bar/edit';

// Mock the <InspectorControls> component only, so that the other components in this package behave as usual.
jest.mock( '@wordpress/block-editor', () => {
	const original = require.requireActual( '@wordpress/block-editor' );
	return {
		...original,
		InspectorControls: ( { children } ) => children,
		InnerBlocks: () => <div></div>,
	};
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

const tabProps = {
	attributes: {
		tabs: [
			{
				label: 'Tab 1 Title',
				content: [
					{
						clientId: 'c0cf3523-d407-4389-939d-b1d1007b316f',
						name: 'core/paragraph',
						isValid: true,
						attributes: {
							content: 'Tab 1 content',
							dropCap: false,
						},
						innerBlocks: [],
					},
				],
			},
			{
				label: 'Tab 2 Title',
				content: [
					{
						clientId: '00d62a82-e010-49cb-982a-bc04767df7ea',
						name: 'core/paragraph',
						isValid: true,
						attributes: {
							content: 'Tab 2 content',
							dropCap: false,
						},
						innerBlocks: [],
					},
				],
			},
		],
		iconPosition: 'none',
	},
	className: 'wp-block-material-tab-bar',
	setAttributes: jest.fn(),
};

describe( 'blocks: material/tab-bar: Edit', () => {
	it( 'matches snapshot', () => {
		const wrapper = setup( tabProps );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'selects a tab if the title is clicked', () => {
		const props = { ...tabProps };
		const { container, getByText } = setup( props );

		fireEvent.click( getByText( 'Tab 2 Title' ) );
		const tabItems = container.querySelectorAll( '.mdc-tab' );

		expect( tabItems[ 1 ].className ).toContain( 'mdc-tab--active' );
	} );
} );
