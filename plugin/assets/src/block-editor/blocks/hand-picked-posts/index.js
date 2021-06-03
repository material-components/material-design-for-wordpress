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
import metadata from './block.json';

const { name } = metadata;

export { metadata, name };

/**
 * @type {{edit: *, icon: (function(): *), description: string, title: string, category: string, supports: Object}}
 */
export const settings = {
	title: __( 'Curated Card Collection (Material)', 'material-design' ),
	description: __(
		'Display a list of your hand-picked posts.',
		'material-design'
	),
	keywords: [ __( 'Material Card', 'material-design' ) ],
	icon: () => <i className="material-icons-outlined">library_books</i>,
	example: {
		attributes: {
			preview: true,
		},
	},
	edit,
	save: () => '',
};
