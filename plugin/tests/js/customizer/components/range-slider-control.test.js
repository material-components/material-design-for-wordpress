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
import { mount } from 'enzyme';

/**
 * Internal dependencies
 */
import RangeSliderControl from '../../../../assets/src/customizer/components/range-slider-control';

/**
 * Render the component.
 *
 * @param {Object} props - Component props
 * @return {Function} A functional component.
 */
const setup = props => {
	return render( <RangeSliderControl { ...props } /> );
};

/**
 * Mount the component.
 *
 * @param {Object} props - Component props
 * @return {Function} A functional component.
 */
const setupMount = props => {
	return mount( <RangeSliderControl { ...props } /> );
};

const mockOnChangeFn = jest.fn();
const mockOnExpandedFn = jest.fn();

const baseProps = {
	id: 'material-design-small_component_radius',
	label: 'Small Component Radius',
	description: 'This is a test description',
	value: 10,
	min: 0,
	max: 36,
	step: 1,
	onChange: mockOnChangeFn,
};

describe( 'RangeSliderControl', () => {
	beforeEach( () => {
		jest.clearAllMocks();
	} );

	it( 'matches snapshot', () => {
		const wrapper = setup( baseProps );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'matches snapshot when no description is provided', () => {
		const props = { ...baseProps };
		props.description = '';
		const wrapper = setup( props );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'matches snapshot when is global', () => {
		const props = { ...baseProps };
		props.isGlobal = true;
		props.expandedSettings = true;
		const wrapper = setup( props );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'should invoke handleExpandedSettings when expand settings button is clicked', async () => {
		const props = { ...baseProps };
		props.isGlobal = true;
		props.expandedSettings = true;
		props.handleExpandedSettings = mockOnExpandedFn;
		const { container } = setup( props );

		const input = container.querySelector(
			'.range-slider-control-settings-expanded'
		);
		await fireEvent.click( input );

		expect( mockOnExpandedFn ).toHaveBeenCalledTimes( 1 );
	} );

	it( 'should have its value changed after the input number field value is changed', () => {
		const { container } = setup( baseProps );
		const selector = '.components-range-control input[type="number"]';
		const input = container.querySelector( selector );
		input.focus();
		fireEvent.change( input, {
			target: {
				value: 5,
			},
		} );
		expect( mockOnChangeFn ).toHaveBeenCalledTimes( 1 );
		expect( mockOnChangeFn.mock.calls[ 0 ][ 0 ] ).toBe( 5 );
	} );

	it( 'should have its value changed after the input range field value is changed', () => {
		const { container } = setup( baseProps );
		const selector = '.components-range-control input[type="range"]';

		const input = container.querySelector( selector );

		fireEvent.change( input, {
			target: {
				value: 4,
			},
		} );
		expect( mockOnChangeFn ).toHaveBeenCalledTimes( 1 );
		expect( mockOnChangeFn.mock.calls[ 0 ][ 0 ] ).toBe( 4 );
	} );

	it( 'should show the description when the title is clicked', () => {
		const wrapper = setupMount( baseProps );
		const title = wrapper.find( '.range-slider-control-title span' );
		title.simulate( 'click' );

		expect(
			wrapper.exists( '.customize-control-description' )
		).toStrictEqual( true );
	} );
} );
