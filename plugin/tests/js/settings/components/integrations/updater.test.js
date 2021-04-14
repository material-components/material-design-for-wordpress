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
import Updater from '../../../../../assets/src/settings/components/integrations/updater';
import { SettingsProvider } from '../../../../../assets/src/settings/context';

// Mock the @wordpress/date component.
jest.mock( '@wordpress/date', () => {
	const original = jest.requireActual( '@wordpress/date' );
	return {
		...original,
		dateI18n: ( format, value ) => new Date( value ).toGMTString(),
	};
} );

const baseProps = {
	title: 'Google Fonts',
	type: 'FONTS',
	lastUpdated: 1618325906728,
	needsKey: true,
	checked: true,
	apiStatus: 'ok',
	updateAvailable: true,
};

const setup = props => {
	return render(
		<SettingsProvider>
			<Updater { ...props } />
		</SettingsProvider>
	);
};

describe( 'Settings: Updater', () => {
	it( 'matches snapshot', () => {
		const { container } = setup( baseProps );
		expect( container ).toMatchSnapshot();
	} );

	it( 'matches snapshot when disabled', () => {
		const props = {
			...baseProps,
			apiStatus: 'install',
		};

		const { container } = setup( props );
		expect( container ).toMatchSnapshot();
	} );

	it( 'matches snapshot when never updated', () => {
		const props = {
			...baseProps,
			lastUpdated: null,
		};

		const { container } = setup( props );
		expect( container ).toMatchSnapshot();
	} );

	it( 'matches snapshot when should not update', () => {
		const props = {
			...baseProps,
			updateAvailable: false,
		};

		const { container } = setup( props );
		expect( container ).toMatchSnapshot();
	} );
} );
