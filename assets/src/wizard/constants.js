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
 * App statuses
 */
export const STATUS = {
	IDLE: 'IDLE',
	PENDING: 'PENDING',
	SUCCESS: 'SUCCESS',
	ERROR: 'ERROR',
};

/**
 * Screens available inside the app
 */
export const STEPS = {
	WELCOME: 'WELCOME',
	ADDONS: 'ADDONS',
	WORK: 'WORK',
};

/**
 * Available actions
 */
export const ACTIONS = {
	SUBMIT_WIZARD: 'SUBMIT_WIZARD',
	NEXT_STEP: 'NEXT_STEP',
	PREVIOUS_STEP: 'PREVIOUS_STEP',
	WIZARD_ERROR: 'WIZARD_ERROR',
	TOGGLE_ADDON: 'TOGGLE_ADDON',
};

/**
 * Supported addons
 */
export const ADDONS = {
	THEME: 'THEME',
	DEMO: 'DEMO',
};
