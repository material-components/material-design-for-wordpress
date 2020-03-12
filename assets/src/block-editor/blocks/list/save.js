/**
 * Internal dependencies
 */
import { InnerBlocks } from '@wordpress/block-editor';

const ListSave = ( { className } ) => (
	<ul className={ `mdc-list mdc-list--two-line ${ className }` }>
		<InnerBlocks.Content />
	</ul>
);

export default ListSave;
