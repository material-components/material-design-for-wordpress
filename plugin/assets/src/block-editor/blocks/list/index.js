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
import './style.css';
import edit from './edit';
import save from './save';
import metadata from './block.json';
import transforms from './transforms';
import { example } from './example';

const { name } = metadata;

export { metadata, name };

export const settings = {
	title: __( 'List (Material)', 'material-design' ),
	description: __(
		'Display text or images in a continuous, vertical index.',
		'material-design'
	),
	icon: () => <i className="material-icons-outlined">list_alt</i>,
	keywords: [ __( 'Material List', 'material-design' ), 'mlist' ],
	edit,
	save,
	example,
	transforms,
};
