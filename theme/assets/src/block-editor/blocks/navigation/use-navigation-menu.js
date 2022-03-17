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
import { store as coreStore } from '@wordpress/core-data';
import { useSelect } from '@wordpress/data';

export default function useNavigationMenu( ref ) {
	return useSelect(
		select => {
			const {
				getEntityRecord,
				getEditedEntityRecord,
				getEntityRecords,
				hasFinishedResolution,
				canUser,
			} = select( coreStore );

			const navigationMenuSingleArgs = [
				'postType',
				'wp_navigation',
				ref,
			];
			const rawNavigationMenu = ref
				? getEntityRecord( ...navigationMenuSingleArgs )
				: null;
			let navigationMenu = ref
				? getEditedEntityRecord( ...navigationMenuSingleArgs )
				: null;

			// getEditedEntityRecord will return the post regardless of status.
			// Therefore if the found post is not published then we should ignore it.
			if ( navigationMenu?.status !== 'publish' ) {
				navigationMenu = null;
			}

			const hasResolvedNavigationMenu = ref
				? hasFinishedResolution(
						'getEditedEntityRecord',
						navigationMenuSingleArgs
				  )
				: false;

			const navigationMenuMultipleArgs = [
				'postType',
				'wp_navigation',
				{ per_page: -1, status: 'publish' },
			];
			const navigationMenus = getEntityRecords(
				...navigationMenuMultipleArgs
			);

			const canSwitchNavigationMenu = ref
				? navigationMenus?.length > 1
				: navigationMenus?.length > 0;

			return {
				isNavigationMenuResolved: hasResolvedNavigationMenu,
				isNavigationMenuMissing:
					! ref ||
					( hasResolvedNavigationMenu && ! rawNavigationMenu ),
				canSwitchNavigationMenu,
				hasResolvedNavigationMenus: hasFinishedResolution(
					'getEntityRecords',
					navigationMenuMultipleArgs
				),
				navigationMenu,
				navigationMenus,
				canUserUpdateNavigationEntity: ref
					? canUser( 'update', 'navigation', ref )
					: undefined,
				hasResolvedCanUserUpdateNavigationEntity: hasFinishedResolution(
					'canUser',
					[ 'update', 'navigation', ref ]
				),
				canUserDeleteNavigationEntity: ref
					? canUser( 'delete', 'navigation', ref )
					: undefined,
				hasResolvedCanUserDeleteNavigationEntity: hasFinishedResolution(
					'canUser',
					[ 'delete', 'navigation', ref ]
				),
				canUserCreateNavigation: canUser( 'create', 'navigation' ),
				hasResolvedCanUserCreateNavigation: hasFinishedResolution(
					'canUser',
					[ 'create', 'navigation' ]
				),
			};
		},
		[ ref ]
	);
}
