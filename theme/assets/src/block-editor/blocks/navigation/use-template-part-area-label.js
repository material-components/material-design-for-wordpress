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
import { store as blockEditorStore } from '@wordpress/block-editor';
import { store as coreStore } from '@wordpress/core-data';
import { useSelect } from '@wordpress/data';

/**
 * Internal dependencies
 */

import { createTemplatePartId } from '../../util';

/**
 * Add label to template part.
 *
 * @param {string} clientId
 * @return {Function} Select callback
 */
export default function useTemplatePartAreaLabel( clientId ) {
	return useSelect(
		select => {
			// Use the lack of a clientId as an opportunity to bypass the rest
			// of this hook.
			if ( ! clientId ) {
				return;
			}

			const { getBlock, getBlockParentsByBlockName } = select(
				blockEditorStore
			);

			const withAscendingResults = true;
			const parentTemplatePartClientIds = getBlockParentsByBlockName(
				clientId,
				'core/template-part',
				withAscendingResults
			);

			if ( ! parentTemplatePartClientIds?.length ) {
				return;
			}

			// FIXME: @wordpress/block-library should not depend on @wordpress/editor.
			// Blocks can be loaded into a *non-post* block editor.
			// This code is lifted from this file:
			// packages/block-library/src/template-part/edit/advanced-controls.js
			// eslint-disable-next-line @wordpress/data-no-store-string-literals
			const definedAreas = select(
				'core/editor'
			).__experimentalGetDefaultTemplatePartAreas();
			const { getEditedEntityRecord } = select( coreStore );

			for ( const templatePartClientId of parentTemplatePartClientIds ) {
				const templatePartBlock = getBlock( templatePartClientId );

				// The 'area' usually isn't stored on the block, but instead
				// on the entity.
				const { theme, slug } = templatePartBlock.attributes;
				const templatePartEntityId = createTemplatePartId(
					theme,
					slug
				);
				const templatePartEntity = getEditedEntityRecord(
					'postType',
					'wp_template_part',
					templatePartEntityId
				);

				// Look up the `label` for the area in the defined areas so
				// that an internationalized label can be used.
				if ( templatePartEntity?.area ) {
					return definedAreas.find(
						definedArea =>
							definedArea.area !== 'uncategorized' &&
							definedArea.area === templatePartEntity.area
					)?.label;
				}
			}
		},
		[ clientId ]
	);
}