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
import { __, sprintf } from '@wordpress/i18n';
import { decodeEntities } from '@wordpress/html-entities';

/**
 *
 * @param {Object}          props
 * @param {boolean}         props.showNavigationMenus
 * @param {boolean}         props.showClassicMenus
 * @param {Array}           props.navigationMenus
 * @param {Array|undefined} props.classicMenus
 * @param {Function}        props.onSelectNavigationMenu
 * @param {Function}        props.onSelectClassicMenu
 * @param {string}          [props.actionLabel]
 * @return {JSX.Element} Menu Options.
 */
const ExistingMenusOptions = ( {
	showNavigationMenus,
	showClassicMenus = false,
	navigationMenus,
	classicMenus,
	onSelectNavigationMenu,
	onSelectClassicMenu,
	actionLabel,
} ) => {
	const hasNavigationMenus = !! navigationMenus?.length;
	const hasClassicMenus = !! classicMenus?.length;

	/* translators: %s: The name of a menu. */
	const createActionLabel = __( "Create from '%s'", 'material-design' );

	actionLabel = actionLabel || createActionLabel;

	return (
		<>
			{ showNavigationMenus && hasNavigationMenus && (
				<MenuGroup label={ __( 'Menus' ) }>
					{ navigationMenus.map( menu => {
						const label = decodeEntities( menu.title.rendered );

						return (
							<MenuItem
								onClick={ () => {
									onSelectNavigationMenu( menu );
								} }
								key={ menu.id }
								aria-label={ sprintf( actionLabel, label ) }
							>
								{ label }
							</MenuItem>
						);
					} ) }
				</MenuGroup>
			) }
			{ showClassicMenus && hasClassicMenus && (
				<MenuGroup label={ __( 'Classic Menus' ) }>
					{ classicMenus.map( menu => {
						const label = decodeEntities( menu.name );
						return (
							<MenuItem
								onClick={ () => {
									onSelectClassicMenu( menu );
								} }
								key={ menu.id }
								aria-label={ sprintf(
									createActionLabel,
									label
								) }
							>
								{ label }
							</MenuItem>
						);
					} ) }
				</MenuGroup>
			) }
		</>
	);
};

export default ExistingMenusOptions;
