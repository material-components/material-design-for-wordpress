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
 * WordPress dependencies
 */
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

/**
 * External dependencies.
 */
import classname from 'classnames';

/**
 * Internal dependencies.
 */
import { BLOCK_TEMPLATE } from './template';

/** @type {Array} */
const ALLOWED_BLOCKS = [
	'core/site-logo',
	'core/site-title',
	'core/group',
	'material/navigation',
	'material/search',
];

/**
 * Menu drawer.
 *
 * @param {Object} props
 * @param {Array}  props.context
 *
 * @return {JSX.Element} Drawer
 */
const Drawer = ( { context } ) => {
	/** @type {boolean} */
	const isOpen = context[ 'material/isDrawerOpen' ];

	return (
		<div { ...useBlockProps() }>
			<aside
				className={ classname(
					'mdc-drawer material-drawer mdc-drawer--modal',
					{ 'mdc-drawer--open': isOpen }
				) }
			>
				<InnerBlocks
					allowedBlocks={ ALLOWED_BLOCKS }
					template={ BLOCK_TEMPLATE }
				/>
			</aside>
		</div>
	);
};

export default Drawer;
