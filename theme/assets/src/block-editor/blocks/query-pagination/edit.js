/**
 * WordPress dependencies
 */
import { getBlockSupport } from '@wordpress/blocks';
import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';

// Override core template.
const TEMPLATE = [
	[ 'material/query-pagination-first' ],
	[ 'material/query-pagination-previous' ],
	[ 'material/query-pagination-next' ],
	[ 'material/query-pagination-last' ],
];

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
