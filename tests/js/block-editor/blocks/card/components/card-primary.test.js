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
import { shallow } from 'enzyme';

/**
 * Internal dependencies
 */
import CardPrimary from '../../../../../../assets/src/block-editor/blocks/card/components/card-primary';

/**
 * Render the component.
 *
 * @param {Object} props - Component props.
 * @return {Function} A functional component.
 */
const setup = props => {
	return render( <CardPrimary { ...props } /> );
};

/**
 * Render the component in a shallow mode using enzyme.
 *
 * @param {Object} props - Component props.
 * @return {Function} A functional component.
 */
const setupShallow = props => {
	return shallow( <CardPrimary { ...props } /> );
};

const baseProps = {
	displayTitle: true,
	title: 'Test Title',
	displaySecondaryText: true,
	secondaryText: 'Test Secondary text',
	cardIndex: 0,
	setter: jest.fn(),
	isEditMode: false,
};

describe( 'CardPrimary', () => {
	afterEach( () => {
		jest.clearAllMocks();
	} );

	it( 'matches snapshot when the title and secondary text are being displayed', () => {
		const wrapper = setup( baseProps );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'matches snapshot when only the title should be displayed', () => {
		const props = { ...baseProps };
		props.displaySecondaryText = false;
		const wrapper = setup( props );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'matches snapshot when only the secondary text should be displayed', () => {
		const props = { ...baseProps };
		props.displayTitle = false;
		const wrapper = setup( props );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'matches snapshot when the edit mode is enabled and the title and secondary text are being displayed', () => {
		const props = { ...baseProps };
		props.isEditMode = true;
		const wrapper = setup( props );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'matches snapshot when the edit mode is enabled and only the title should be displayed', () => {
		const props = { ...baseProps };
		props.isEditMode = true;
		props.displaySecondaryText = false;
		const wrapper = setup( props );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'matches snapshot when the edit mode is enabled and only the secondary text should be displayed', () => {
		const props = { ...baseProps };
		props.isEditMode = true;
		props.displayTitle = false;
		const wrapper = setup( props );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( "updates the title prop when it's changed", () => {
		const props = { ...baseProps };
		props.isEditMode = true;
		const wrapper = setupShallow( props );

		const mockEvent = {
			target: { value: 'This is a new title just for test' },
		};
		wrapper
			.find( '.material-design-card__title' )
			.simulate( 'change', mockEvent );
		expect( props.setter ).toHaveBeenCalledWith( 'title', mockEvent, 0 );
	} );

	it( "updates the secondary text prop when it's changed", () => {
		const props = { ...baseProps };
		props.isEditMode = true;
		const wrapper = setupShallow( props );

		const mockEvent = {
			target: { value: 'This is a new secondary text just for test' },
		};
		wrapper
			.find( '.material-design-card__secondary-text' )
			.simulate( 'change', mockEvent );
		expect( props.setter ).toHaveBeenCalledWith(
			'secondaryText',
			mockEvent,
			0
		);
	} );
} );
