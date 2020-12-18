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
import { render, screen, fireEvent } from '@testing-library/react';

/**
 * Internal dependencies
 */
import ButtonEdit from '../../../../../assets/src/block-editor/blocks/button/edit';

// Mock the <InspectorControls> component only, so that the other components in this package behave as usual.
jest.mock( '@wordpress/block-editor', () => {
	const original = require.requireActual( '@wordpress/block-editor' );
	return {
		...original,
		InspectorControls: ( { children } ) => children,
	};
} );

const baseProps = {
	attributes: { type: 'text', style: 'text' },
	setAttributes: jest.fn(),
};

const setup = props => {
	return render( <ButtonEdit { ...props } /> );
};

describe( 'ButtonEdit', () => {
	beforeAll( () => {
		global.materialDesign = {
			defaults: {
				colors: {
					primary_color: '#6200ee',
					on_primary_color: '#ffffff',
					secondary_color: '#018786',
					on_secondary_color: '#ffffff',
				},
			},
			customizerUrls: {
				shape: 'http://example.com/shape',
				colors: 'http://example.com/colors',
			},
		};
	} );

	it( 'displays all the panels', () => {
		setup( baseProps );
		expect( screen.getByText( 'Styles' ) ).toBeInTheDocument();
		expect( screen.getByText( 'Colors' ) ).toBeInTheDocument();
		expect( screen.getByText( 'Corner Styles' ) ).toBeInTheDocument();
		expect( screen.getByText( 'Link Settings' ) ).toBeInTheDocument();
	} );

	it( 'matches snapshot', () => {
		const wrapper = setup( baseProps );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'should display an text button with text style initially', () => {
		setup( baseProps );

		const container = document.body;
		const matches = container.querySelector( '.mdc-button.mdc-button--text' );

		expect( matches ).toBeInTheDocument();
		expect( screen.queryByText( 'Container Color' ) ).toBeNull();
	} );

	it( 'should display an text with outlined style', () => {
		setup( {
			attributes: { type: 'text', style: 'outlined' },
			setAttributes: jest.fn(),
		} );

		const container = document.body;
		const matches = container.querySelector(
			'.mdc-button.mdc-button--outlined'
		);

		expect( matches ).toBeInTheDocument();
		expect( screen.queryByText( 'Container Color' ) ).toBeNull();
	} );

	it( 'should display an text with raised style', () => {
		setup( {
			attributes: { type: 'text', style: 'raised' },
			setAttributes: jest.fn(),
		} );

		const container = document.body;
		const matches = container.querySelector( '.mdc-button.mdc-button--raised' );

		expect( matches ).toBeInTheDocument();
		expect( screen.getByText( 'Container Color' ) ).toBeInTheDocument();
	} );

	it( 'should display an text with unelevated style', () => {
		setup( {
			attributes: { type: 'text', style: 'unelevated' },
			setAttributes: jest.fn(),
		} );

		const container = document.body;
		const matches = container.querySelector(
			'.mdc-button.mdc-button--unelevated'
		);

		expect( matches ).toBeInTheDocument();
		expect( screen.getByText( 'Container Color' ) ).toBeInTheDocument();
	} );

	it( 'should display icon picker if icon position is set', () => {
		setup( {
			attributes: {
				type: 'text',
				style: 'unelevated',
				iconPosition: 'leading',
			},
			isSelected: true,
			setAttributes: jest.fn(),
		} );

		expect( screen.getByText( 'Search icon' ) ).toBeInTheDocument();
	} );

	it( 'should not display icon picker if icon position is set', () => {
		setup( {
			attributes: {
				type: 'text',
				style: 'unelevated',
				iconPosition: 'none',
			},
			setAttributes: jest.fn(),
		} );

		expect( screen.queryByText( 'Search icon' ) ).toBeNull();
	} );

	it( 'should have icon button classes if type is icon', () => {
		setup( { attributes: { type: 'icon' }, setAttributes: jest.fn() } );

		const container = document.body;
		const matches = container.querySelector(
			'.material-icons.mdc-icon-button'
		);

		expect( matches ).toBeInTheDocument();
		expect( screen.getByText( 'Search icon' ) ).toBeInTheDocument();
	} );

	it( 'should set link target when `Open in new tab` is selected', async () => {
		const props = {
			attributes: { type: 'text' },
			isSelected: true,
			setAttributes: jest.fn(),
		};
		const { container } = setup( props );
		const toggle = container.querySelectorAll(
			'.components-form-toggle__input'
		)[ 0 ];

		await fireEvent.click( toggle );
		expect( props.setAttributes ).toHaveBeenCalledWith( {
			linkTarget: '_blank',
			rel: 'noreferrer noopener',
		} );
	} );

	it( 'should set link target when `Open in new tab` is un-selected', async () => {
		const props = {
			attributes: {
				type: 'text',
				linkTarget: '',
				rel: '',
			},
			isSelected: true,
			setAttributes: jest.fn(),
		};
		const { container } = setup( props );
		const toggle = container.querySelectorAll(
			'.components-form-toggle__input'
		)[ 0 ];

		await fireEvent.click( toggle );
		expect( props.setAttributes ).toHaveBeenCalledWith( {
			linkTarget: '_blank',
			rel: 'noreferrer noopener',
		} );
	} );

	it( 'should set type when a style is selected', () => {
		const props = {
			attributes: { type: 'text' },
			isSelected: true,
			setAttributes: jest.fn(),
		};
		const { container } = setup( props );
		const radios = container.querySelectorAll(
			'.components-radio-control__option label'
		);

		fireEvent.click( radios[ 1 ] );

		expect( props.setAttributes ).toHaveBeenCalledTimes( 4 );

		// eslint-disable-next-line jest/prefer-strict-equal
		expect( props.setAttributes.mock.calls[ 0 ][ 0 ] ).toEqual( {
			icon: 'spa',
		} );
	} );
} );
