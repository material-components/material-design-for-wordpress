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
import { withGlobalBlockDefault } from '../../../../assets/src/block-editor/components/with-global-default';

const TestComponent = withGlobalBlockDefault( () => {
	return <div>Test Component</div>;
} );

/**
 * Render the component.
 *
 * @param {Object} props - Component props.
 * @return {Function} A functional component.
 */
const setup = props => {
	return render( <TestComponent { ...props } /> );
};

const baseProps = {
	setAttributes: jest.fn(),
	attributes: {},
	name: 'material/button',
};

describe( 'withGlobalBlockDefault', () => {
	beforeAll( () => {
		global.materialDesign = {
			defaults: {
				blocks: {
					'material/button': {
						cornerRadius: 8,
					},
					'material/card': {
						cornerRadius: 16,
					},
				},
			},
		};
	} );

	it( 'sets attribute value to global default: matches snapshot', () => {
		const props = { ...baseProps };
		expect( setup( props ) ).toMatchSnapshot();
	} );

	it( 'should not set attribute value to global default if the value is already set: matches snapshot', () => {
		const props = { ...baseProps };
		props.attributes.cornerRadius = 4;
		expect( setup( props ) ).toMatchSnapshot();
	} );
} );
