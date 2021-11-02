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
import Edit from '../../../../../assets/src/block-editor/blocks/data-table/edit';

registerStore( 'core/blocks', {
	reducer: jest.fn(),
	selectors: {
		getBlockType: ( state, blockName ) => {
			switch ( blockName ) {
				case 'core/table':
					return {
						attributes: {
							caption: {
								type: 'string',
								source: 'html',
								selector: 'figcaption',
								default: '',
							},
						},
					};

				default:
					return {};
			}
		},
	},
} );

/**
 * Render the component.
 *
 * @param {Object} props - Component props.
 * @return {Function} A functional component.
 */
const setup = props => {
	return render( <Edit { ...props } /> );
};

const attributes = {
	hasFixedLayout: true,
	head: [
		{
			cells: [
				{
					content: 'Version',
					tag: 'th',
				},
				{
					content: 'Jazz Musician',
					tag: 'th',
				},
				{
					content: 'Release Date',
					tag: 'th',
				},
			],
		},
	],
	body: [
		{
			cells: [
				{
					content: '5.2',
					tag: 'td',
				},
				{
					content: 'Jaco Pastorius',
					tag: 'td',
				},
				{
					content: 'May 7, 2019',
					tag: 'td',
				},
			],
		},
		{
			cells: [
				{
					content: '5.1',
					tag: 'td',
				},
				{
					content: 'Betty Carter',
					tag: 'td',
				},
				{
					content: 'February 21, 2019',
					tag: 'td',
				},
			],
		},
		{
			cells: [
				{
					content: '5.0',
					tag: 'td',
				},
				{
					content: 'Bebo Valdés',
					tag: 'td',
				},
				{
					content: 'December 6, 2018',
					tag: 'td',
				},
			],
		},
	],
	foot: [
		{
			cells: [
				{
					content: 'Footer Col 1',
					tag: 'td',
				},
				{
					content: 'Footer Col 2',
					tag: 'td',
				},
				{
					content: 'Footer Col 3',
					tag: 'td',
				},
			],
		},
	],
	className: 'is-style-material',
};

describe( 'Data Table Edit', () => {
	it( 'matches snapshot when table has data', () => {
		const wrapper = setup( { attributes } );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'matches snapshot when table has no data', () => {
		const wrapper = setup( {
			attributes: { ...attributes, head: [], body: [], foot: [] },
		} );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'matches snapshot when table has rows', () => {
		const wrapper = setup( {
			attributes: { ...attributes, head: [], foot: [] },
		} );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'matches snapshot when caption is set', () => {
		const wrapper = setup( {
			attributes: { ...attributes, caption: 'Material Data Table' },
		} );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'selects a cell on click', async () => {
		const { container } = setup( { attributes } );

		const cells = container.querySelectorAll( '.mdc-data-table__cell' );

		fireEvent.click( cells[ 0 ] );
		expect( cells[ 0 ].classList.contains( 'is-selected' ) ).toBe( true );
	} );

	it( 'shows place holder when table is empty', async () => {
		const setAttributes = jest.fn();
		const { container } = setup( {
			attributes: { ...attributes, head: [], body: [], foot: [] },
			setAttributes,
		} );

		expect(
			container.querySelector( '.blocks-table__placeholder-form' )
		).toBeDefined();
		expect(
			container.querySelectorAll(
				'.blocks-table__placeholder-form input'
			)
		).toHaveLength( 2 );

		const createBtn = container.querySelector(
			'.blocks-table__placeholder-form button'
		);

		fireEvent.click( createBtn );
		expect( setAttributes ).toHaveBeenCalledTimes( 1 );
		expect( setAttributes.mock.calls[ 0 ][ 0 ] ).toStrictEqual( {
			body: [
				{
					cells: [
						{ content: '', tag: 'td' },
						{ content: '', tag: 'td' },
					],
				},
				{
					cells: [
						{ content: '', tag: 'td' },
						{ content: '', tag: 'td' },
					],
				},
			],
		} );
	} );

	it( 'toggles header section', async () => {
		const setAttributes = jest.fn();
		const { container } = setup( { attributes, setAttributes } );
		const toggles = container.querySelectorAll(
			'.components-form-toggle__input'
		);

		await fireEvent.click( toggles[ 0 ] );
		expect( setAttributes ).toHaveBeenCalledWith( {
			head: [],
		} );

		await fireEvent.click( toggles[ 1 ] );
		expect( setAttributes ).toHaveBeenCalledWith( {
			foot: [],
		} );
	} );
} );
