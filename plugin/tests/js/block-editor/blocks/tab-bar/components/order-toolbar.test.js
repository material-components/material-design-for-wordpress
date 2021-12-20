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
/* eslint-disable @typescript-eslint/no-empty-function */

/**
 * External dependencies
 */
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';

/**
 * Internal dependencies
 */
import OrderToolbar from '../../../../../../assets/src/block-editor/blocks/tab-bar/components/order-toolbar.js';

/**
 * Render the component.
 *
 * @param {Object} props - Component props
 * @return {Function} A functional component.
 */
const setup = props => {
	return render( <OrderToolbar { ...props } /> );
};

const baseProps = { onChange: () => {} };

describe( 'Tab', () => {
	afterEach( () => {
		jest.clearAllMocks();
	} );

	it( 'matches snapshot with base props', () => {
		const wrapper = setup( baseProps );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'matches snapshot with a different label', () => {
		const wrapper = setup( { ...baseProps, label: 'Another label' } );
		expect( wrapper ).toMatchSnapshot();
	} );
} );
