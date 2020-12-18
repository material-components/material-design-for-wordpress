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
import Wizard from '../../../assets/src/wizard/components';

describe( 'Onboarding Wizard', () => {
	beforeAll( () => {
		global.materialDesignWizard = {
			pagesUrl: 'http://example.com/wp-admin/edit.php?post_type=page',
			settingsUrl: 'http://example.com/wp-admin/plugins.php',
			assetsPath: 'http://example.com/',
			placeholderSmall: 'http://example.com/image-small.png',
			placeholderImage: 'http://example.com/image.png',
			themeStatus: 'ok',
			nonce: 'test-nonce',
			restPath:
				'http://example.com/index.php?rest_route=/material-design/v1/importer/',
		};
	} );

	it( 'matches snapshot', () => {
		const { container } = render( <Wizard /> );

		expect( container ).toMatchSnapshot();
	} );
} );
