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
import { MenuGroup, MenuItem } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

import { addQueryArgs } from '@wordpress/url';

/**
 * Internal dependencies
 */
import useNavigationMenu from '../use-navigation-menu';
import useNavigationEntities from '../use-navigation-entities';
import useConvertClassicMenu from '../use-convert-classic-menu';
import useCreateNavigationMenu from './use-create-navigation-menu';
import ExistingMenusOptions from './existing-menus-options';

export default function NavigationMenuSelector( {
	clientId,
	onSelect,
	onCreateNew,
	canUserCreateNavigation = false,
	canUserSwitchNavigation = false,
} ) {
	const {
		menus: classicMenus,
		hasMenus: hasClassicMenus,
	} = useNavigationEntities();
	const { navigationMenus } = useNavigationMenu();

	const createNavigationMenu = useCreateNavigationMenu( clientId );

	const onFinishMenuCreation = async (
		blocks,
		navigationMenuTitle = null
	) => {
		if ( ! canUserCreateNavigation ) {
			return;
		}

		const navigationMenu = await createNavigationMenu(
			navigationMenuTitle,
			blocks
		);
		onSelect( navigationMenu );
	};

	const convertClassicMenuToBlocks = useConvertClassicMenu(
		onFinishMenuCreation
	);

	const showSelectMenus =
		( canUserSwitchNavigation || canUserCreateNavigation ) &&
		( navigationMenus?.length || hasClassicMenus );

	if ( ! showSelectMenus ) {
		return null;
	}

	return (
		<>
			<ExistingMenusOptions
				showNavigationMenus={ canUserSwitchNavigation }
				showClassicMenus={ canUserCreateNavigation }
				navigationMenus={ navigationMenus }
				classicMenus={ classicMenus }
				onSelectNavigationMenu={ onSelect }
				onSelectClassicMenu={ ( { id, name } ) =>
					convertClassicMenuToBlocks( id, name )
				}
				/* translators: %s: The name of a menu. */
				actionLabel={ __( "Switch to '%s'" ) }
			/>

			{ canUserCreateNavigation && (
				<MenuGroup label={ __( 'Tools' ) }>
					<MenuItem onClick={ onCreateNew }>
						{ __( 'Create new menu' ) }
					</MenuItem>
					<MenuItem
						href={ addQueryArgs( 'edit.php', {
							post_type: 'wp_navigation',
						} ) }
					>
						{ __( 'Manage menus' ) }
					</MenuItem>
				</MenuGroup>
			) }
		</>
	);
}
