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
import { render, cleanup } from '@testing-library/react';

/**
 * Internal dependencies
 */
import GettingStarted from '../../../assets/src/getting-started/components/index';
import { TabProvider } from '../../../assets/src/getting-started/context';

const setup = () => {
	return render(
		<TabProvider>
			<GettingStarted />
		</TabProvider>
	);
};

describe( 'GSM: Getting Started', () => {
	beforeAll( () => {
		global.materialDesignGsm = {
			themeStatus: 'ok',
			contentStatus: 'ok',
		};
	} );

	afterEach( cleanup );

	it( 'matches snapshot', () => {
		const wrapper = setup();
		expect( wrapper ).toMatchSnapshot();
	} );
} );
