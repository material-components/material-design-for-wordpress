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
 * Internal dependencies
 */
import save from './save';
import metadata from './block.json';

const { attributes } = metadata;

const deprecated = [
	{
		attributes: {
			...attributes,
			...{
				columns: {
					type: 'number',
					default: 2,
				},
			},
		},
		save,
		migrate( attr ) {
			if ( 'number' === typeof attr.columns ) {
				attr = {
					...attr,
					...{
						columns: {
							desktop: attr.columns,
							tablet: 3,
							mobile: 1,
						},
					},
				};
			}

			return attr;
		},
		isEligible( attr ) {
			return 'number' === typeof attr.columns;
		},
	},
];

export default deprecated;
