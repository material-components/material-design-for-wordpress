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
import { example as cardExample } from '../card/example';
import { DEFAULT_NUMBER_OF_CARDS } from './constants';

const cardsProps = [];

for ( let index = 0; index < DEFAULT_NUMBER_OF_CARDS; index++ ) {
	cardsProps.push( cardExample.attributes );
}

export const example = {
	attributes: {
		displayActions: false,
		cardsProps,
	},
};
