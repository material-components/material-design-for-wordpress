/**
 * WordPress dependencies
 */
// import { __ } from '@wordpress/i18n';
import { InnerBlocks } from '@wordpress/block-editor';

/**
 * Material list edit component.
 */
const ListEdit = () => {
	return (
		<ul className="mdc-list">
			<InnerBlocks
				template={ [ [ 'material/list-item' ], [ 'material/list-item' ] ] }
				allowedBlocks={ [ 'material/list-item' ] }
			/>
		</ul>
	);
};

export default ListEdit;
