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
import InspectorControlsStylePanel from '../../../../../../assets/src/block-editor/blocks/card/components/inspector-controls-style-panel';

/**
 * Render the component.
 *
 * @param {Object} props - Component props.
 * @return {Function} A functional component.
 */
const setup = props => {
	return render( <InspectorControlsStylePanel { ...props } /> );
};

const baseProps = {
	cardLayoutStyle: 'vertical',
	contentLayout: 'text-under-media',
	cornerRadius: 4,
	outlined: true,
	isSingleCard: true,
	setter: jest.fn(),
	cardIndex: 0,
	isPanelInitialOpened: true,
};

describe( 'InspectorControlsStylePanel', () => {
	beforeAll( () => {
		global.materialDesign = {
			customizerUrls: {
				shape: 'http://example.com/shape',
				colors: 'http://example.com/colors',
			},
		};
	} );

	afterEach( () => {
		jest.clearAllMocks();
	} );

	it( 'matches snapshot', () => {
		const wrapper = setup( baseProps );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'matches snapshot when props get defaults', () => {
		const props = { ...baseProps };
		delete props.cardLayoutStyle;
		delete props.isPanelInitialOpened;
		const wrapper = setup( props );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'matches snapshot when it is not a single card', () => {
		const props = { ...baseProps };
		props.isSingleCard = false;
		const wrapper = setup( props );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'matches snapshot when the card layout style is horizontal', () => {
		const props = { ...baseProps };
		props.cardLayoutStyle = 'horizontal';
		const wrapper = setup( props );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( "updates the content layout prop when it's changed", () => {
		const props = { ...baseProps };
		const { getByLabelText } = setup( props );
		fireEvent.click( getByLabelText( 'Text above media' ) );

		expect( props.setter ).toHaveBeenCalledWith(
			'contentLayout',
			'text-above-media',
			0
		);
	} );

	it( "updates the corner radio prop when it's changed", () => {
		const props = { ...baseProps };
		const { container } = setup( props );
		const inputRange = container.querySelector(
			'.components-global-shape-size input[type="range"]'
		);

		const mockEvent = {
			target: { value: 2 },
		};

		fireEvent.change( inputRange, mockEvent );

		expect( props.setter ).toHaveBeenCalledWith( 'cornerRadius', 2, 0 );
	} );

	it( "updates the outlined prop when it's changed", () => {
		const props = { ...baseProps };
		const { getByLabelText } = setup( props );
		fireEvent.click( getByLabelText( 'Outlined' ) );

		expect( props.setter ).toHaveBeenCalledWith(
			'cardStyle',
			'outlined',
			0
		);
		fireEvent.click( getByLabelText( 'Elevated' ) );
		expect( props.setter ).toHaveBeenCalledWith(
			'cardStyle',
			'elevated',
			0
		);
	} );
} );
