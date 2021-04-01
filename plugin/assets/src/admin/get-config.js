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

/* istanbul ignore file */

/**
 * Get Material onboarding wizard config value.
 *
 * @param {string} name Name of the config value to retrieve.
 * @return {string|Object|undefined} Value of config.
 */
const getConfig = name => {
	const configData = window.materialDesignWizard;

	if ( undefined === configData ) {
		return undefined;
	}

	return configData[ name ];
};

export default getConfig;
