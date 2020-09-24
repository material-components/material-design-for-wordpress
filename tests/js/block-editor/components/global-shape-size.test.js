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

/**
 * Internal dependencies
 */
import GlobalShapeSize from '../../../../assets/src/block-editor/components/global-shape-size';

/**
 * Render the component.
 *
 * @param {Object} props - Component props.
 * @return {Function} A functional component.
 */
const setup = props => {
	return render( <GlobalShapeSize { ...props } /> );
};

const baseProps = {
	value: 10,
	onChange: jest.fn(),
	min: 0,
	max: 20,
	blockName: 'material/button',
};

describe( 'GlobalShapeSize', () => {
	beforeEach( () => {
		jest.resetAllMocks();
	} );

	it( 'should match snapshots', () => {
		const props = { ...baseProps };
		expect( setup( props ) ).toMatchSnapshot();

		props.value = 4;
		expect( setup( props ) ).toMatchSnapshot();
	} );
} );
