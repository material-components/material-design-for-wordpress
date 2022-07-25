/**
 * Copyright 2021 Google LLC
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
import { omit } from 'lodash';

/**
 * Internal dependencies
 */
import save from './save';
import metadata from './block.json';
import getElevationStyleMigration from '../../helpers/get-outline-migration';
import { SaveM2 } from './deprecated/m2/m2-version';

const { attributes } = metadata;

const deprecated = [
	SaveM2,
	{
		attributes: { ...omit( attributes, [ 'imageElement' ] ) },
		save,
		migrate( attr ) {
			if ( 'undefined' === typeof attr.imageElement ) {
				attr = {
					...attr,
					...{
						imageElement: true,
					},
				};
			}

			return attr;
		},
		isEligible( attr ) {
			return 'undefined' === typeof attr.imageElement;
		},
	},
	getElevationStyleMigration( {
		attributes,
		save,
	} ),
];

export default deprecated;
