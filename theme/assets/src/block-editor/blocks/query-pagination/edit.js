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
import { getBlockSupport } from '@wordpress/blocks';
import {
	useBlockProps,
	useInnerBlocksProps as useInnerBlocksPropsGte59,
	// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
	__experimentalUseInnerBlocksProps as useInnerBlocksPropsLte58,
} from '@wordpress/block-editor';

// Override core template.
const TEMPLATE = [
	[ 'material/query-pagination-first' ],
	[ 'material/query-pagination-previous' ],
	[ 'material/query-pagination-next' ],
	[ 'material/query-pagination-last' ],
];

// In order to support both versions of WP
// Supports:
//  - Later or equal 5.8
//  - Greater or equal 5.9
const useInnerBlocksProps =
	useInnerBlocksPropsLte58 || useInnerBlocksPropsGte59;

const getDefaultBlockLayout = blockTypeOrName => {
	const layoutBlockSupportConfig = getBlockSupport(
		blockTypeOrName,
		'__experimentalLayout'
	);

	return layoutBlockSupportConfig?.default;
};

const QueryPaginationEdit = ( { attributes: { layout }, name } ) => {
	const usedLayout = layout || getDefaultBlockLayout( name );
	const blockProps = useBlockProps();
	const innerBlockProps = useInnerBlocksProps( blockProps, {
		template: TEMPLATE,
		allowedBlocks: TEMPLATE,
		__experimentalLayout: usedLayout,
	} );

	return (
		<>
			<div { ...innerBlockProps } />
		</>
	);
};

export default QueryPaginationEdit;
