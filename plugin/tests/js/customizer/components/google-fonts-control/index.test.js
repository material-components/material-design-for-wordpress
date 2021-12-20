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
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { shallow, mount } from 'enzyme';

/**
 * Internal dependencies
 */
import GoogleFontsControl from '../../../../../assets/src/customizer/components/google-fonts-control';

const jQMock = jest.requireActual( 'jquery' );

/**
 * Mount the component
 *
 * @param {Object} props - Component props
 * @return {Function} A functional component.
 */
const setupMount = props => {
	return mount( <GoogleFontsControl { ...props } /> );
};

/**
 * Shallow mount the component
 *
 * @param {Object} props - Component props
 * @return {Function} A functional component.
 */
const setupShallow = props => {
	return shallow( <GoogleFontsControl { ...props } /> );
};

const mockOnChangeFn = jest.fn();

const baseProps = {
	id: 'material-design-google-fonts-control',
	label: 'Typography',
	value: 'Roboto',
	fonts: [
		{ id: 'Roboto', text: 'Roboto' },
		{ id: 'Ubuntu', text: 'Ubuntu' },
	],
	onChange: mockOnChangeFn,
	children: [
		{
			id: 'headline_1',
			setting: 'material_design_wp[headline_1]',
			cssVars: [
				{
					size: '--mdc-typography-headline1-font-size',
					weight: '--mdc-typography-headline1-font-weight',
				},
			],
			value: JSON.stringify( { size: 96, weight: 500 } ),
			label: 'Headline 1',
			size: {
				label: 'Size',
				type: 'number',
				min: 2,
				default: 96,
				max: 96,
			},
			weight: {
				label: 'Weight',
				type: 'select',
				default: 'medium',
			},
		},
	],
};

describe( 'GoogleFontsControl', () => {
	beforeAll( () => {
		global.$ = global.jQuery = jQMock;
		global.jQuery.fn.selectWoo = jest.fn( () => jQMock( this ) ); // eslint-disable-line

		global.materialDesign = {
			googleFonts: [
				{ id: 'Roboto', text: 'Roboto' },
				{ id: 'Ubuntu', text: 'Ubuntu' },
			],
		};
	} );

	beforeEach( () => {
		jest.clearAllMocks();
	} );

	it( 'matches snapshot', () => {
		const wrapper = setupMount( baseProps );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'should have its value changed after the fonts select field value is changed', () => {
		const wrapper = setupMount( baseProps );

		const select = wrapper.find( 'select' );

		select.simulate( 'change', {
			target: {
				value: 'Roboto',
				checkValidity: () => true,
			},
		} );

		expect( wrapper.find( 'select' ).prop( 'value' ) ).toBe( 'Roboto' );

		expect( mockOnChangeFn ).toHaveBeenCalledTimes( 1 );
	} );

	it( 'should expand when button is clicked', async () => {
		const setState = jest.fn();
		const useStateSpy = jest.spyOn( React, 'useState' );
		useStateSpy.mockImplementation( init => [ init, setState ] );

		const app = setupShallow( baseProps );

		app.find( '.google-fonts-control-settings-expanded' ).props().onClick();
		expect( setState ).toHaveBeenCalledWith( true );
	} );
} );
