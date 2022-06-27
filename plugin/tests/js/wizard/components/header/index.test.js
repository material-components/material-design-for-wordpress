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

import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';

/**
 * Internal dependencies
 */
import Header from '../../../../../assets/src/wizard/components/header';

/**
 * Render the component
 *
 * @return {Function} A functional component.
 */
const setup = () => {
	return render( <Header /> );
};

describe( 'Header', () => {
	it( 'should render title', () => {
		const { container } = setup();

		expect( container.querySelectorAll( '.title-large' ) ).toHaveLength(
			1
		);
	} );

	it( 'should render title text', () => {
		const { container } = setup();

		expect( container.querySelector( '.title-large' ) ).toHaveTextContent(
			'Material Design for WordPress'
		);
	} );

	it( 'should render logo', () => {
		const { container } = setup();

		expect( container.querySelectorAll( 'svg' ) ).toHaveLength( 1 );
	} );
} );
