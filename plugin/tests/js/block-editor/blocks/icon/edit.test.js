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
import IconEdit from '../../../../../assets/src/block-editor/blocks/icon/edit';

const baseProps = {
	attributes: { iconSize: '24' },
	setAttributes: jest.fn(),
};

const setup = props => {
	return render( <IconEdit { ...props } /> );
};

describe( 'Icon', () => {
	beforeAll( () => {
		global.materialDesign = {
			defaults: {
				colors: {
					primary_color: '#6200ee',
					secondary_color: '#018786',
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
		expect( screen.getByText( 'Icon' ) ).toBeInTheDocument();
		expect( screen.getByText( 'Color' ) ).toBeInTheDocument();
		expect( screen.getByText( 'Size' ) ).toBeInTheDocument();
		expect( screen.getByText( 'Search icon' ) ).toBeInTheDocument();
	} );

	it( 'matches snapshot', () => {
		const wrapper = setup( baseProps );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'should display an icon', () => {
		setup( baseProps );

		const container = document.body;
		const matches = container.querySelector( '.material-icons' );

		expect( matches ).toBeInTheDocument();
	} );

	it( 'should display icon with xl size', () => {
		setup( {
			attributes: { iconSize: '48', icon: 'spa' },
			setAttributes: jest.fn(),
		} );

		const container = document.body;
		const matches = container.querySelector( '.material-icons.md-48' );

		expect( matches ).toBeInTheDocument();
	} );

	it( 'should show slider for custom px when `custom` size is selected', async () => {
		const props = {
			attributes: { iconSize: '48' },
			isSelected: true,
			setAttributes: jest.fn(),
		};
		const { container } = setup( props );
		const customButton = container.querySelectorAll(
			'.btn-group__list__list-item:last-child button'
		)[ 0 ];

		await fireEvent.click( customButton );
		expect( props.setAttributes ).toHaveBeenCalledWith( {
			iconSize: 'custom',
		} );
	} );

	it( 'should not display icon picker if icon position is set', () => {
		setup( {
			attributes: {
				iconSize: '48',
			},
			setAttributes: jest.fn(),
		} );

		expect( screen.queryByText( 'Pick custom size(in px)' ) ).toBeNull();
	} );

	it( 'should have center class if align is center', () => {
		setup( { attributes: { align: 'center' }, setAttributes: jest.fn() } );

		const container = document.body;
		const matches = container.querySelector( '.has-text-align-center' );

		expect( matches ).toBeInTheDocument();
	} );
} );
