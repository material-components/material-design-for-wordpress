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
import { useEntityBlockEditor } from '@wordpress/core-data';
import {
	useInnerBlocksProps,
	InnerBlocks,
	__experimentalBlockContentOverlay as BlockContentOverlay, // eslint-disable-line @wordpress/no-unsafe-wp-apis
	store as blockEditorStore,
} from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';
import { useMemo } from '@wordpress/element';

/**
 * Internal dependencies
 */
import PlaceholderPreview from './placeholder/placeholder-preview';

const ALLOWED_BLOCKS = [ 'material/navigation-link' ];

const DEFAULT_BLOCK = {
	name: 'material/navigation-link',
};

const LAYOUT = {
	type: 'default',
	alignments: [],
};

/**
 * Inner Blocks
 *
 * @param {Object}  props
 * @param {boolean} props.isVisible
 * @param {string}  props.clientId
 * @param {boolean} props.hasCustomPlaceholder
 * @param {string}  props.orientation
 *
 * @return {JSX.Element} Inner Blocks
 */
export default function NavigationInnerBlocks( {
	isVisible,
	clientId,
	hasCustomPlaceholder,
	orientation,
} ) {
	const {
		isImmediateParentOfSelectedBlock,
		selectedBlockHasDescendants,
		isSelected,
	} = useSelect(
		select => {
			const {
				getClientIdsOfDescendants,
				hasSelectedInnerBlock,
				getSelectedBlockClientId,
			} = select( blockEditorStore );
			const selectedBlockId = getSelectedBlockClientId();

			return {
				isImmediateParentOfSelectedBlock: hasSelectedInnerBlock(
					clientId,
					false
				),
				selectedBlockHasDescendants: !! getClientIdsOfDescendants( [
					selectedBlockId,
				] )?.length,

				// This prop is already available but computing it here ensures it's
				// fresh compared to isImmediateParentOfSelectedBlock
				isSelected: selectedBlockId === clientId,
			};
		},
		[ clientId ]
	);

	const [ blocks, onInput, onChange ] = useEntityBlockEditor(
		'postType',
		'wp_navigation'
	);

	const shouldDirectInsert = useMemo(
		() =>
			blocks.every( ( { name } ) => name === 'material/navigation-link' ),
		[ blocks ]
	);

	// When the block is selected itself or has a top level item selected that
	// doesn't itself have children, show the standard appender. Else show no
	// appender.
	const parentOrChildHasSelection =
		isSelected ||
		( isImmediateParentOfSelectedBlock && ! selectedBlockHasDescendants );

	const placeholder = useMemo( () => <PlaceholderPreview />, [] );

	const innerBlocksProps = useInnerBlocksProps(
		{
			className: 'wp-block-navigation__container',
		},
		{
			value: blocks,
			onInput,
			onChange,
			allowedBlocks: ALLOWED_BLOCKS,
			__experimentalDefaultBlock: DEFAULT_BLOCK,
			__experimentalDirectInsert: shouldDirectInsert,
			orientation,

			// As an exception to other blocks which feature nesting, show
			// the block appender even when a child block is selected.
			// This should be a temporary fix, to be replaced by improvements to
			// the sibling inserter.
			// See https://github.com/WordPress/gutenberg/issues/37572.
			renderAppender:
				isSelected ||
				( isImmediateParentOfSelectedBlock &&
					! selectedBlockHasDescendants ) ||
				// Show the appender while dragging to allow inserting element between item and the appender.
				parentOrChildHasSelection
					? InnerBlocks.ButtonBlockAppender
					: false,

			// Template lock set to false here so that the Nav
			// Block on the experimental menus screen does not
			// inherit templateLock={ 'all' }.
			templateLock: false,
			__experimentalLayout: LAYOUT,
			placeholder:
				! isVisible || hasCustomPlaceholder ? undefined : placeholder,
		}
	);

	return (
		<BlockContentOverlay
			clientId={ clientId }
			tagName={ 'div' }
			wrapperProps={ innerBlocksProps }
		/>
	);
}
