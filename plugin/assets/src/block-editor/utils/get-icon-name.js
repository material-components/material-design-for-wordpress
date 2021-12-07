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
 * Search and find a material icon by name.
 *
 * @param {string|object} icon Icon name or object.
 */
export default icon => {
	if (
		'string' === typeof icon ||
		! icon ||
		! icon.hasOwnProperty( 'name' )
	) {
		return icon;
	}

	return icon.name;
};
