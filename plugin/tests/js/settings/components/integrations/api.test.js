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
import Api from '../../../../../assets/src/settings/components/integrations/api';
import { SettingsProvider } from '../../../../../assets/src/settings/context';

const setup = props => {
	return render(
		<SettingsProvider>
			<Api { ...props } />
		</SettingsProvider>
	);
};

const baseProps = {
	apiStatus: 'ok',
};

describe( 'Settings: Switch', () => {
	it( 'matches snapshot', () => {
		const { container } = setup();
		expect( container ).toMatchSnapshot();
	} );

	it( 'matches snapshot when API is not ok', () => {
		const props = {
			...baseProps,
			apiStatus: 'install',
		};

		const { container } = setup( props );
		expect( container ).toMatchSnapshot();
	} );

	it( 'matches snapshot when API is ok', () => {
		const props = {
			...baseProps,
			apiStatus: 'ok',
		};

		const { container } = setup( props );
		expect( container ).toMatchSnapshot();
	} );
} );
