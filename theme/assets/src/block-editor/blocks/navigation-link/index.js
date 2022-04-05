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
import edit from './edit';
import save from './save';
import metadata from './block.json';

const { name, usesContext, title } = metadata;

export { metadata, name };

/**
 * @type {{edit: *, icon: (function(): *), description: string, title: string, category: string, keywords: Array, save: *, usesContext: Array}}
 */
export const settings = {
	description: __(
		'Display sets of data across rows and columns.',
		'material-design'
	),
	category: 'material-design',
	keywords: [ __( 'Material Data Table', 'material-design' ) ],
	icon: () => <i className="material-icons-outlined">link</i>,
	title,
	edit,
	save,
	usesContext,
};