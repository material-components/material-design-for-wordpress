/**
 * Internal dependencies
 */
import { InnerBlocks } from '@wordpress/block-editor';

const ListSave = () => (
	<ul className="mdc-list">
		<InnerBlocks.Content />
	</ul>
);

export default ListSave;
