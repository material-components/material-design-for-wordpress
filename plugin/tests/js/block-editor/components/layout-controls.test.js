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
import LayoutControls from '../../../../assets/src/block-editor/components/layout-controls';
import { getRangeInput } from '../../helper';

/**
 * Render the component.
 *
 * @param {Object} props - Component props.
 * @return {Function} A functional component.
 */
const setup = props => {
	return render( <LayoutControls { ...props } /> );
};

describe( 'LayoutControls', () => {
	const onColumnsChangeMock = jest.fn();
	const onGutterChangeMock = jest.fn();

	afterEach( () => {
		onColumnsChangeMock.mockClear();
		onGutterChangeMock.mockClear();
	} );

	it( 'matches snapshot', () => {
		const props = {
			gutter: { desktop: 16, tablet: 12, mobile: 8 },
			columns: { desktop: 5, tablet: 3, mobile: 2 },
		};
		const wrapper = setup( props );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'updates correct device columns on column change', () => {
		const props = {
			columns: { desktop: 5, tablet: 3, mobile: 2 },
			onColumnsChange: onColumnsChangeMock,
			onGutterChange: onGutterChangeMock,
		};
		const { container, getByText } = setup( props );
		let button = getByText( /computer/i );

		fireEvent.click( button );
		fireEvent.change(
			getRangeInput(
				container.querySelectorAll( '.components-range-control' )[ 0 ]
			),
			{
				target: { value: '4' },
			}
		);

		button = getByText( /tablet/i );

		fireEvent.click( button );
		fireEvent.change(
			getRangeInput(
				container.querySelectorAll( '.components-range-control' )[ 0 ]
			),
			{
				target: { value: '2' },
			}
		);

		button = getByText( /smartphone/i );

		fireEvent.click( button );
		fireEvent.change(
			getRangeInput(
				container.querySelectorAll( '.components-range-control' )[ 0 ]
			),
			{
				target: { value: '1' },
			}
		);

		expect( onColumnsChangeMock.mock.calls[ 0 ][ 0 ] ).toStrictEqual( {
			desktop: 4,
			mobile: 2,
			tablet: 3,
		} );
		expect( onColumnsChangeMock.mock.calls[ 1 ][ 0 ] ).toStrictEqual( {
			desktop: 5,
			mobile: 2,
			tablet: 2,
		} );

		expect( onColumnsChangeMock.mock.calls[ 2 ][ 0 ] ).toStrictEqual( {
			desktop: 5,
			mobile: 1,
			tablet: 3,
		} );
	} );

	it( 'updates correct device gutter on gutter change', () => {
		const props = {
			gutter: { desktop: 16, tablet: 12, mobile: 8 },
			onColumnsChange: onColumnsChangeMock,
			onGutterChange: onGutterChangeMock,
		};
		const { container, getByText } = setup( props );
		let button = getByText( /computer/i );

		fireEvent.click( button );
		fireEvent.change(
			getRangeInput(
				container.querySelectorAll( '.components-range-control' )[ 1 ]
			),
			{
				target: { value: 10 },
			}
		);

		button = getByText( /tablet/i );

		fireEvent.click( button );
		fireEvent.change(
			getRangeInput(
				container.querySelectorAll( '.components-range-control' )[ 1 ]
			),
			{
				target: { value: 8 },
			}
		);

		button = getByText( /smartphone/i );

		fireEvent.click( button );
		fireEvent.change(
			getRangeInput(
				container.querySelectorAll( '.components-range-control' )[ 1 ]
			),
			{
				target: { value: 4 },
			}
		);

		expect( onGutterChangeMock.mock.calls[ 0 ][ 0 ] ).toStrictEqual( {
			desktop: 10,
			mobile: 8,
			tablet: 12,
		} );

		expect( onGutterChangeMock.mock.calls[ 1 ][ 0 ] ).toStrictEqual( {
			desktop: 16,
			mobile: 8,
			tablet: 8,
		} );

		expect( onGutterChangeMock.mock.calls[ 2 ][ 0 ] ).toStrictEqual( {
			desktop: 16,
			mobile: 4,
			tablet: 12,
		} );
	} );
} );
