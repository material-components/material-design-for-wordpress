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
import metadata from './block.json';
import { icon } from './icon';
import edit from './edit';
import save from './save';

const { name, title } = metadata;

export { metadata, name };

export const settings = {
	title,
	description: metadata.description,
	icon,
	edit,
	save,
	example: {
		innerBlocks: [
			{
				name: 'material/navigation-link',
				attributes: {
					// translators: 'Home' as in a website's home page.
					label: __( 'Home', 'material-design-google' ),
					url: 'https://make.wordpress.org/',
				},
			},
			{
				name: 'material/navigation-link',
				attributes: {
					// translators: 'About' as in a website's about page.
					label: __( 'About', 'material-design-google' ),
					url: 'https://make.wordpress.org/',
				},
			},
			{
				name: 'material/navigation-link',
				attributes: {
					// translators: 'Contact' as in a website's contact page.
					label: __( 'Contact', 'material-design-google' ),
					url: 'https://make.wordpress.org/',
				},
			},
		],
	},
};
