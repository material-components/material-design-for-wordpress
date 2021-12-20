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
import GutterWithDevices from '../../../../assets/src/block-editor/components/attribute-with-devices';
import { getRangeInput } from '../../helper';

/**
 * Render the component.
 *
 * @param {Object} props - Component props.
 * @return {import('@testing-library/react').Element} A functional component.
 */
const setup = props => {
	return render( <GutterWithDevices { ...props } /> );
};

describe( 'GutterWithDevices', () => {
	const onChangeMock = jest.fn();

	afterEach( () => {
		onChangeMock.mockClear();
	} );

	it( 'matches snapshot', () => {
		const props = {
			value: { desktop: 16, tablet: 12, mobile: 8 },
		};
		const wrapper = setup( props );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'updates correct device gutter on gutter change', () => {
		const props = {
			value: { desktop: 16, tablet: 12, mobile: 8 },
			onChange: onChangeMock,
		};
		const { container, getByText } = setup( props );
		let button = getByText( /computer/i );

		fireEvent.click( button );
		fireEvent.change(
			getRangeInput(
				container.querySelectorAll( '.components-range-control' )[ 0 ]
			),
			{
				target: { value: 10 },
			}
		);

		button = getByText( /tablet/i );

		fireEvent.click( button );
		fireEvent.change(
			getRangeInput(
				container.querySelectorAll( '.components-range-control' )[ 0 ]
			),
			{
				target: { value: 8 },
			}
		);

		button = getByText( /smartphone/i );

		fireEvent.click( button );
		fireEvent.change(
			getRangeInput(
				container.querySelectorAll( '.components-range-control' )[ 0 ]
			),
			{
				target: { value: 4 },
			}
		);

		expect( onChangeMock.mock.calls[ 0 ][ 0 ] ).toStrictEqual( {
			desktop: 10,
			mobile: 8,
			tablet: 12,
		} );

		expect( onChangeMock.mock.calls[ 1 ][ 0 ] ).toStrictEqual( {
			desktop: 16,
			mobile: 8,
			tablet: 8,
		} );

		expect( onChangeMock.mock.calls[ 2 ][ 0 ] ).toStrictEqual( {
			desktop: 16,
			mobile: 4,
			tablet: 12,
		} );
	} );
} );
