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
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import getConfig from '../admin/get-config';

export const ACTIONS = {
	ADD_ERROR: 'ADD_ERROR',
	REMOVE_ERROR: 'REMOVE_ERROR',
	CLEAR_ERRORS: 'CLEAR_ERRORS',
	TOGGLE_UPDATES: 'TOGGLE_UPDATES',
	REMOVE_API_KEY: 'REMOVE_API_KEY',
	ADD_API_KEY: 'ADD_API_KEY',
	SET_UPDATED: 'SET_UPDATED',
};

const ASSET_UPDATES = {
	FONTS: {
		title: __( 'Google Fonts', 'material-design' ),
		type: 'FONTS',
		lastUpdated: parseInt( getConfig( 'fontsLastUpdated' ), 10 ),
		needsKey: true,
		updateAvailable: 'update' === getConfig( 'fontsUpdateStatus' ),
		autoUpdates: parseInt( getConfig( 'fontsAutoUpdate' ), 10 ),
	},
	ICONS: {
		title: __( 'Material Icons', 'material-design' ),
		type: 'ICONS',
		lastUpdated: parseInt( getConfig( 'iconsLastUpdated' ), 10 ),
		needsKey: false,
		updateAvailable: 'update' === getConfig( 'iconsUpdateStatus' ),
		autoUpdates: parseInt( getConfig( 'iconsAutoUpdate' ), 10 ),
	},
};

const CORE_UPDATES = {
	PLUGIN: {
		title: __( 'Material Design Plugin', 'material-design' ),
		type: 'PLUGIN',
		lastUpdated: false,
		needsKey: false,
		updateAvailable: !! String( getConfig( 'pluginUpdateStatus' ) ),
		versionAvailable: getConfig( 'pluginUpdateStatus' ),
		autoUpdates: parseInt( getConfig( 'pluginAutoUpdate' ) || 0, 10 ),
		displayUpdatedOn: false,
	},
	THEME: {
		title: __( 'Material Design Theme', 'material-design' ),
		type: 'THEME',
		lastUpdated: false,
		needsKey: false,
		updateAvailable: !! String( getConfig( 'themeUpdateStatus' ) ),
		versionAvailable: getConfig( 'themeUpdateStatus' ),
		autoUpdates: parseInt( getConfig( 'themeAutoUpdate' ) || 0, 10 ),
		displayUpdatedOn: false,
	},
};

export const UPDATERS = {
	...ASSET_UPDATES,
	...( getConfig( 'coreUpdatesEnabled' ) ? CORE_UPDATES : {} ),
};

export const KEY_PLACEHOLDER = '•••••••••••••••••••••••••••••';
