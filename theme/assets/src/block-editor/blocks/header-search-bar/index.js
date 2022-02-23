/**
 * Copyright 2022 Google LLC
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
 * External dependencies
 */
import '@material/button/dist/mdc.button.css';
import '@material/typography/dist/mdc.typography.css';
import '@material/icon-button/dist/mdc.icon-button.css';

/**
 * Internal dependencies
 */
import metadata from './block.json';
import { icon } from '../search/icon';
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
};
