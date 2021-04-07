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
import { mount } from 'enzyme';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';

/**
 * Internal dependencies
 */
import Switch from '../../../../../assets/src/settings/components/integrations/switch';
import { SettingsProvider } from '../../../../../assets/src/settings/context';

const setup = props => {
	return render(
		<SettingsProvider>
			<Switch { ...props } />
		</SettingsProvider>
	);
};

const baseProps = {
	id: 'material-settings__switch',
	checked: true,
	onChange: jest.fn(),
};

describe( 'Settings: Switch', () => {
	const wrapper = mount(
		<SettingsProvider>
			<Switch { ...baseProps } />
		</SettingsProvider>
	);

	beforeEach( () => {
		baseProps.onChange.mockClear();
	} );

	it( 'matches snapshot', () => {
		const { container } = setup( baseProps );
		expect( container ).toMatchSnapshot();
	} );

	it( 'should be checked', () => {
		const isChecked = wrapper.find( '.mdc-switch__native-control' );

		expect( isChecked.props() ).toHaveProperty( 'aria-checked', true );
	} );
} );
