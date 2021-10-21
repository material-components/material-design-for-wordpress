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

import { mount } from 'enzyme';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';

/**
 * Internal dependencies
 */
import Button from '../../../../../assets/src/wizard/components/navigation/button';

/**
 * Render the component
 *
 * @param {Object} props - Component props
 * @return {Function} A functional component.
 */

const setup = props => {
	return render( <Button { ...props } /> );
};

const baseProps = {
	style: 'material-wizard__close',
	text: 'Close',
	onClick: jest.fn(),
};

describe( 'Buttons', () => {
	const wrapper = mount( <Button { ...baseProps } /> );

	beforeEach( () => {
		baseProps.onClick.mockClear();
	} );

	it( 'should render the label', () => {
		const textWrap = wrapper.find( '.mdc-button__label' );
		expect( textWrap ).toHaveLength( 1 );
		expect( textWrap.text() ).toStrictEqual( baseProps.text );
	} );

	it( 'should render leading icon', () => {
		const props = {
			leadingIcon: 'navigate_before',
			...baseProps,
		};

		const { container } = setup( props );

		expect( container.querySelectorAll( '.leading-icon' ) ).toHaveLength(
			1
		);
	} );

	it( 'should render trailing icon', () => {
		const props = {
			trailingIcon: 'navigate_next',
			...baseProps,
		};

		const { container } = setup( props );

		expect( container.querySelectorAll( '.trailing-icon' ) ).toHaveLength(
			1
		);
	} );

	it( 'should render as a link', () => {
		const props = {
			link: '#',
			...baseProps,
		};

		const { container } = setup( props );

		expect( container.querySelectorAll( 'a' ) ).toHaveLength( 1 );

		expect( container.querySelector( 'a' ) ).toHaveAttribute( 'href' );
	} );
} );
