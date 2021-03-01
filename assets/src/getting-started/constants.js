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
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

export const ACTIONS = {
	NEXT_STEP: 'NEXT_STEP',
	GOTO_STEP: 'GOTO_STEP',
	MARK_COMPLETE: 'MARK_COMPLETE',
	ERROR: 'ERROR',
	SET_THEME_OK: 'SET_THEME_OK',
	SET_DEMO_OK: 'SET_DEMO_OK',
	INSTALL_THEME: 'INSTALL_THEME',
	ACTIVATE_THEME: 'ACTIVATE_THEME',
	INSTALL_DEMO_CONTENT: 'INSTALL_DEMO_CONTENT',
	THEME_INSTALLED: 'THEME_INSTALLED',
	DEMO_INSTALLED: 'DEMO_INSTALLED',
};

/**
 * @todo Probably better if we turn these into components like the wizard
 */
export const TABS = {
	WIZARD: __( 'Quick Start', 'material-design' ),
	CUSTOMIZE: __( 'Customize your Theme', 'material-design' ),
	OVERVIEW: __( 'Build with Material Blocks', 'material-design' ),
};
