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

/**
 * Internal dependencies
 */
import { TextButton, IconButton } from './components/icon-types';

export const BUTTON_TYPES = [
	{
		label: __( 'Text', 'material-theme-builder' ),
		value: 'text',
		src: TextButton,
	},
	{
		label: __( 'Icon', 'material-theme-builder' ),
		value: 'icon',
		src: IconButton,
	},
];

export const BUTTON_STYLES = [
	{
		label: __( 'Text', 'material-theme-builder' ),
		value: 'text',
	},
	{
		label: __( 'Outlined', 'material-theme-builder' ),
		value: 'outlined',
	},
	{
		label: __( 'Raised', 'material-theme-builder' ),
		value: 'raised',
	},
	{
		label: __( 'Unelevated', 'material-theme-builder' ),
		value: 'unelevated',
	},
];

export const ICON_POSITIONS = [
	{
		label: __( 'None', 'material-theme-builder' ),
		value: 'none',
	},
	{
		label: __( 'Leading', 'material-theme-builder' ),
		value: 'leading',
	},
	{
		label: __( 'Trailing', 'material-theme-builder' ),
		value: 'trailing',
	},
];
