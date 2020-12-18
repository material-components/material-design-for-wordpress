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

import { render } from '@testing-library/react';

/**
 * Internal dependencies
 */
import { Check } from '../../../../../assets/src/wizard/components/svg/check';

/**
 * Render the component
 *
 * @return {Function} A functional component.
 */

const setup = () => {
	return render( <Check /> );
};

describe( 'Check', () => {
	it( 'should render svg', () => {
		const { container } = setup();

		expect( container.querySelectorAll( 'svg' ) ).toHaveLength( 1 );
	} );
} );
