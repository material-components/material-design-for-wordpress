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
 * Given a JS error or a fetch response error, parse and format it so it can be displayed to the user.
 *
 * This code has been lifted from https://github.com/woocommerce/woocommerce-gutenberg-products-block/blob/master/assets/js/base/utils/errors.js
 *
 * @param  {Object} error - Error object.
 * @param  {Function} [error.json] - If a json method is specified, it will try parsing the error first.
 * @param  {string} [error.message] - If a message is specified, it will be shown to the user.
 * @param  {string} [error.type] - The context in which the error was triggered.
 *
 * @return {Object} - Error object containing a message and type.
 */
export const formatError = async error => {
	if ( typeof error.json === 'function' ) {
		try {
			const parsedError = await error.json();
			return {
				message: parsedError.message,
				type: parsedError.type || 'api',
			};
		} catch ( e ) {
			return {
				message: e.message,
				type: 'general',
			};
		}
	}

	return {
		message: error.message,
		type: error.type || 'general',
	};
};
