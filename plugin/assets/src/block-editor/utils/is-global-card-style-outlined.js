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

import { getConfig } from './index';

/**
 * Whether global card style outlined.
 *
 * @return {boolean} Is outlined.
 */
const isGlobalCardStyleOutlined = () =>
	// eslint-disable-next-line camelcase
	getConfig( 'defaults' )?.globalStyle?.card_style === 'outlined';

const getGlobalCardStyle = () =>
	// eslint-disable-next-line camelcase
	getConfig( 'defaults' )?.globalStyle?.card_style;

export { isGlobalCardStyleOutlined, getGlobalCardStyle };
