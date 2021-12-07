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
import { isBoolean, omit } from 'lodash';

const getElevationStyleMigration = ( { attributes, save } ) => {
	return {
		attributes: {
			...omit( attributes, [ 'cardStyle' ] ),
			...{ outlined: { type: 'boolean', default: false } },
		},
		save: params => {
			params.attributes = {
				...omit( params.attributes, [ 'outlined' ] ),
				cardStyle: params.attributes.outlined ? 'outlined' : 'elevated',
			};
			// Handle cards collection.
			if ( params.attributes?.cardsProps ) {
				params.attributes.cardsProps = params.attributes.cardsProps.map(
					cardProp => {
						return {
							...omit( cardProp, [ 'outlined' ] ),
							cardStyle: cardProp.outlined
								? 'outlined'
								: 'elevated',
						};
					}
				);
			}

			return save( params );
		},
		migrate( attr ) {
			// Convert outlined boolean to cardStyle string.
			if ( isBoolean( attr.outlined ) ) {
				return {
					...omit( attr, [ 'outlined' ] ),
					...{
						cardStyle: attr.outlined ? 'outlined' : 'elevated',
					},
				};
			}

			return attr;
		},
		isEligible( attr ) {
			return isBoolean( attr.outlined );
		},
	};
};

export default getElevationStyleMigration;
