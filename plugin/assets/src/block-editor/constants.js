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

const NAMESPACE = '/wp/v2';
export const ENDPOINTS = {
	root: NAMESPACE,
	posts: `${ NAMESPACE }/posts`,
};

export const DEVICES = [
	{
		name: 'desktop',
		icon: 'computer',
		label: __( 'Layout Settings for Desktop', 'material-design' ),
	},
	{
		name: 'tablet',
		icon: 'tablet',
		label: __( 'Layout Settings for Tablet', 'material-design' ),
	},
	{
		name: 'mobile',
		icon: 'smartphone',
		label: __( 'Layout Settings for Mobile', 'material-design' ),
	},
];
