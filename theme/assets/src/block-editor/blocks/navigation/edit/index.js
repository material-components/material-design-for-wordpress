/**
 * Copyright 2020 Google LLC
 *
 * Licensed uder the Apache License, Version 2.0 (the "License");
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
import { useCallback, useRef, useEffect, useState } from '@wordpress/element';
import { EntityProvider, useEntityProp } from '@wordpress/core-data';
import { useRegistry, useSelect, useDispatch } from '@wordpress/data';
import {
	__experimentalUseNoRecursiveRenders as useNoRecursiveRenders, // eslint-disable-line @wordpress/no-unsafe-wp-apis
	useBlockProps,
	Warning,
	BlockControls,
	store as blockEditorStore,
	InspectorControls,
} from '@wordpress/block-editor';
import {
	Button,
	ToolbarGroup,
	ToolbarDropdownMenu,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import useNavigationEntities from '../use-navigation-entities';
import useNavigationMenu from '../use-navigation-menu';
import Placeholder from './placeholder';
import PlaceholderPreview from './placeholder/placeholder-preview';
import NavigationMenuSelector from './navigation-menu-selector';
import NavigationInnerBlocks from './inner-blocks';
import useNavigationNotice from './/use-navigation-notice';
import NavigationMenuNameControl from './navigation-menu-name-control';
import NavigationMenuDeleteControl from './navigation-menu-delete-control';

const EMPTY_ARRAY = [];

/**
 * Edit.
 *
 * @param {Object}                  props
 * @param {{navigationArea:string}} props.context
 * @param {Function}                props.setAttributes
 * @param {Object}                  props.attributes
 * @param {boolean}                 props.isSelected
 * @param {string}                  props.clientId
 * @param {*}                       props.layout
 * @param {string}                  props.className
 * @param {JSX.Element|null}        props.customPlaceholder
 * @param {JSX.Element|null}        props.customAppender
 * @return {JSX.Element} Block edit.
 */
const Edit = ( {
	attributes,
	setAttributes,
	isSelected,
	clientId,
	layout: {
		justifyContent,
		orientation = 'horizontal',
		flexWrap = 'wrap',
	} = {},
	className,
	context: { navigationArea },

	// These props are used by the navigation editor to override specific
	// navigation block settings.
	customPlaceholder: CustomPlaceholder = null,
	customAppender: CustomAppender = null,
} ) => {
	const [ areaMenu, setAreaMenu ] = useEntityProp(
		'root',
		'navigationArea',
		'navigation',
		navigationArea
	);
	const navigationAreaMenu = areaMenu === 0 ? undefined : areaMenu;
	const ref = navigationArea ? navigationAreaMenu : attributes.ref;
	const registry = useRegistry();
	const setRef = useCallback( postId => {
		setAttributes( { ref: postId }, ref );

		if ( navigationArea ) {
			setAreaMenu( postId );
		}
	}, [] );

	const [ hasAlreadyRendered, RecursionProvider ] = useNoRecursiveRenders(
		`navigationMenu/${ ref }`
	);

	// Preload classic menus, so that they don't suddenly pop-in when viewing
	// the Select Menu dropdown.
	useNavigationEntities();

	const { hasUncontrolledInnerBlocks, isInnerBlockSelected } = useSelect(
		select => {
			const { getBlock, getBlocks, hasSelectedInnerBlock } = select(
				blockEditorStore
			);

			// This relies on the fact that `getBlock` won't return controlled
			// inner blocks, while `getBlocks` does. It might be more stable to
			// introduce a selector like `getUncontrolledInnerBlocks`, just in
			// case `getBlock` is fixed.
			const _uncontrolledInnerBlocks = getBlock( clientId ).innerBlocks;
			const _hasUncontrolledInnerBlocks =
				_uncontrolledInnerBlocks?.length;
			const _controlledInnerBlocks = _hasUncontrolledInnerBlocks
				? EMPTY_ARRAY
				: getBlocks( clientId );
			const innerBlocks = _hasUncontrolledInnerBlocks
				? _uncontrolledInnerBlocks
				: _controlledInnerBlocks;

			return {
				hasSubmenus: !! innerBlocks.find(
					block => block.name === 'core/navigation-submenu'
				),
				hasUncontrolledInnerBlocks: _hasUncontrolledInnerBlocks,
				uncontrolledInnerBlocks: _uncontrolledInnerBlocks,
				isInnerBlockSelected: hasSelectedInnerBlock( clientId, true ),
			};
		},
		[ clientId ]
	);

	const { replaceInnerBlocks, selectBlock } = useDispatch( blockEditorStore );

	const isWithinUnassignedArea = !! navigationArea && ! ref;

	const [ isPlaceholderShown, setIsPlaceholderShown ] = useState(
		! hasUncontrolledInnerBlocks || isWithinUnassignedArea
	);

	const {
		isNavigationMenuResolved,
		isNavigationMenuMissing,
		canSwitchNavigationMenu,
		hasResolvedNavigationMenus,
		navigationMenu,
		canUserUpdateNavigationEntity,
		hasResolvedCanUserUpdateNavigationEntity,
		canUserDeleteNavigationEntity,
		hasResolvedCanUserDeleteNavigationEntity,
		canUserCreateNavigation,
		hasResolvedCanUserCreateNavigation,
	} = useNavigationMenu( ref );

	const navRef = useRef();
	const isDraftNavigationMenu = navigationMenu?.status === 'draft';

	const isEntityAvailable =
		! isNavigationMenuMissing && isNavigationMenuResolved;

	const blockProps = useBlockProps( {
		ref: navRef,
		role: 'tablist',
		className: classnames( className, 'mdc-tab-bar', 'tab-bar', {
			'items-justified-right': justifyContent === 'right',
			'items-justified-space-between': justifyContent === 'space-between',
			'items-justified-left': justifyContent === 'left',
			'items-justified-center': justifyContent === 'center',
			'is-vertical': orientation === 'vertical',
			'no-wrap': flexWrap === 'nowrap',
		} ),
	} );

	// Hide the placeholder if an navigation menu entity has loaded.
	useEffect( () => {
		setIsPlaceholderShown( ! isEntityAvailable );
	}, [ isEntityAvailable ] );

	const [ showCantEditNotice, hideCantEditNotice ] = useNavigationNotice( {
		name: 'block-library/core/navigation/permissions/update',
		message: __(
			'You do not have permission to edit this Menu. Any changes made will not be saved.'
		),
	} );

	const [ showCantCreateNotice, hideCantCreateNotice ] = useNavigationNotice(
		{
			name: 'block-library/core/navigation/permissions/create',
			message: __(
				'You do not have permission to create Navigation Menus.'
			),
		}
	);

	useEffect( () => {
		if ( ! isSelected && ! isInnerBlockSelected ) {
			hideCantEditNotice();
			hideCantCreateNotice();
		}

		if ( isSelected || isInnerBlockSelected ) {
			if (
				hasResolvedCanUserUpdateNavigationEntity &&
				! canUserUpdateNavigationEntity
			) {
				showCantEditNotice();
			}

			if (
				! ref &&
				hasResolvedCanUserCreateNavigation &&
				! canUserCreateNavigation
			) {
				showCantCreateNotice();
			}
		}
	}, [
		isSelected,
		isInnerBlockSelected,
		canUserUpdateNavigationEntity,
		hasResolvedCanUserUpdateNavigationEntity,
		canUserCreateNavigation,
		hasResolvedCanUserCreateNavigation,
		ref,
	] );

	const startWithEmptyMenu = useCallback( () => {
		registry.batch( () => {
			if ( navigationArea ) {
				setAreaMenu( 0 );
			}
			setAttributes( {
				ref: undefined,
			} );
			if ( ! ref ) {
				replaceInnerBlocks( clientId, [] );
			}
			setIsPlaceholderShown( true );
		} );
	}, [ clientId, ref ] );

	// Show a warning if the selected menu is no longer available.
	// TODO - the user should be able to select a new one?
	if ( ref && isNavigationMenuMissing ) {
		return (
			<div { ...blockProps }>
				<Warning>
					{ __(
						'Navigation menu has been deleted or is unavailable. '
					) }
					<Button onClick={ startWithEmptyMenu } variant="link">
						{ __( 'Create a new menu?' ) }
					</Button>
				</Warning>
			</div>
		);
	}

	if ( isEntityAvailable && hasAlreadyRendered ) {
		return (
			<div { ...blockProps }>
				<Warning>
					{ __( 'Block cannot be rendered inside itself.' ) }
				</Warning>
			</div>
		);
	}

	const PlaceholderComponent = CustomPlaceholder
		? CustomPlaceholder
		: Placeholder;

	return (
		<EntityProvider kind="postType" type="wp_navigation" id={ ref }>
			<RecursionProvider>
				<BlockControls>
					{ ! isDraftNavigationMenu && isEntityAvailable && (
						<ToolbarGroup>
							<ToolbarDropdownMenu
								label={ __(
									'Select Menu',
									'material-design-google'
								) }
								text={ __(
									'Select Menu',
									'material-design-google'
								) }
								icon={ null }
							>
								{ ( { onClose } ) => (
									<NavigationMenuSelector
										clientId={ clientId }
										onSelect={ ( { id } ) => {
											setRef( id );
											onClose();
										} }
										onCreateNew={ startWithEmptyMenu }
										canUserCreateNavigation={
											canUserCreateNavigation
										}
									/>
								) }
							</ToolbarDropdownMenu>
						</ToolbarGroup>
					) }
				</BlockControls>

				{ isEntityAvailable && (
					<InspectorControls __experimentalGroup="advanced">
						{ hasResolvedCanUserUpdateNavigationEntity &&
							canUserUpdateNavigationEntity && (
								<NavigationMenuNameControl />
							) }
						{ hasResolvedCanUserDeleteNavigationEntity &&
							canUserDeleteNavigationEntity && (
								<NavigationMenuDeleteControl
									onDelete={ startWithEmptyMenu }
								/>
							) }
					</InspectorControls>
				) }

				<div { ...blockProps }>
					<div className="mdc-tab-scroller">
						<div className="mdc-tab-scroller__scroll-area">
							<div className="mdc-tab-scroller__scroll-content">
								{ isPlaceholderShown && (
									<PlaceholderComponent
										onFinish={ post => {
											setIsPlaceholderShown( false );
											if ( post ) {
												setRef( post.id );
											}
											selectBlock( clientId );
										} }
										canSwitchNavigationMenu={
											canSwitchNavigationMenu
										}
										hasResolvedNavigationMenus={
											hasResolvedNavigationMenus
										}
										clientId={ clientId }
										canUserCreateNavigation={
											canUserCreateNavigation
										}
									/>
								) }

								{ ! hasResolvedCanUserCreateNavigation ||
									( ! isEntityAvailable &&
										! isPlaceholderShown && (
											<PlaceholderPreview isLoading />
										) ) }

								{ ! isPlaceholderShown && isEntityAvailable && (
									<NavigationInnerBlocks
										isVisible={ ! isPlaceholderShown }
										clientId={ clientId }
										appender={ CustomAppender }
										hasCustomAppender={
											!! CustomPlaceholder
										}
										orientation={ orientation }
									/>
								) }
							</div>
						</div>
					</div>
				</div>
			</RecursionProvider>
		</EntityProvider>
	);
};

export default Edit;
