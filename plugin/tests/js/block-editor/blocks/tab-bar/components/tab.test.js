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
import {
	Tab,
	TabSchema,
} from '../../../../../../assets/src/block-editor/blocks/tab-bar/components/tab.js';

/* eslint-disable @typescript-eslint/no-empty-function */
jest.mock( '@wordpress/block-editor', () => {
	const original = jest.requireActual( '@wordpress/block-editor' );
	return {
		...original,
		InspectorControls: ( { children } ) => children,
		RichText: ( { tagName: Tag, value, placeholder, onChange } ) => (
			<Tag
				aria-label={ placeholder }
				aria-multiline="true"
				className="rich-text block-editor-rich-text__editable"
				contentEditable="true"
				style={ { whiteSpace: 'pre-wrap' } }
				role="textbox"
				onInput={ node => onChange( node.currentTarget.textContent ) }
			>
				{ value }
			</Tag>
		),
	};
} );

/**
 * Render the component.
 *
 * @param {Object} props - Component props
 * @return {Function} A functional component.
 */
const setup = props => {
	return render( <Tab { ...props } /> );
};

const baseProps = {
	label: 'Test Tab',
	active: false,
	index: 0,
	onInput: jest.fn(),
	onChange: jest.fn(),
};

describe( 'Tab', () => {
	beforeEach( () => {
		window.getSelection = () => {
			return {
				addRange: () => {},
				removeAllRanges: () => {},
			};
		};
		document.createRange = () => ( {
			setStart: () => {},
			setEnd: () => {},
			commonAncestorContainer: {
				nodeName: 'BODY',
				ownerDocument: document,
			},
		} );
	} );
	afterEach( () => {
		jest.clearAllMocks();
	} );

	it( 'matches snapshot with base props', () => {
		const wrapper = setup( baseProps );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'matches snapshot when "frontend" prop is true', () => {
		const wrapper = setup( { ...baseProps, frontend: true } );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'matches snapshot when "iconPosition" prop is above', () => {
		const wrapper = setup( { ...baseProps, iconPosition: 'above' } );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'matches snapshot when "iconPosition" prop is leading', () => {
		const wrapper = setup( { ...baseProps, iconPosition: 'leading' } );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'updates tab title on input', () => {
		const props = { ...baseProps };
		const { getByText } = setup( props );
		const title = getByText( 'Test Tab' );

		fireEvent.click( title );
		title.textContent = 'Test Tab Updated';
		fireEvent.input( title );

		expect( props.onInput ).toHaveBeenCalledWith( 'Test Tab Updated', 0 );
	} );

	it( 'updates active tab on click', () => {
		const props = { ...baseProps };
		const { getByText } = setup( props );
		const title = getByText( 'Test Tab' );

		fireEvent.click( title );

		// eslint-disable-next-line jest/prefer-called-with
		expect( props.onChange ).toHaveBeenCalled();
	} );
} );

describe( 'TabSchema', () => {
	it( 'sets the class properties', () => {
		let tab = new TabSchema( {
			label: 'Tab 1',
			icon: 'heart',
			content: '<p>Tab 1 content</p>',
		} );

		expect( tab.label ).toStrictEqual( 'Tab 1' );
		expect( tab.icon ).toStrictEqual( 'heart' );
		expect( tab.content ).toStrictEqual( '<p>Tab 1 content</p>' );

		tab = new TabSchema( {
			label: 'Tab 1',
			icon: 'heart',
		} );
		expect( tab.content ).toBeNull();
	} );
} );
