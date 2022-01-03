/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { getBlockSupport } from '@wordpress/blocks';
import { useSelect } from '@wordpress/data';
import {
	useBlockProps,
	useInnerBlocksProps,
	store as blockEditorStore,
} from '@wordpress/block-editor';

// Override core template.
const TEMPLATE = [
	[ 'core/query-pagination-previous' ],
	[ 'core/query-pagination-next' ],
];

const getDefaultBlockLayout = blockTypeOrName => {
	const layoutBlockSupportConfig = getBlockSupport(
		blockTypeOrName,
		'__experimentalLayout'
	);

	return layoutBlockSupportConfig?.default;
};

const QueryPaginationEdit = ( {
	attributes: { paginationArrow, layout },
	setAttributes,
	clientId,
	name,
} ) => {
	const usedLayout = layout || getDefaultBlockLayout( name );
	const hasNextPreviousBlocks = useSelect( select => {
		const { getBlocks } = select( blockEditorStore );
		const innerBlocks = getBlocks( clientId );

		return innerBlocks?.find( innerBlock => {
			return [
				'core/query-pagination-next',
				'core/query-pagination-previous',
			].includes( innerBlock.name );
		} );
	}, [] );

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
