/**
 * External dependencies
 */
import classNames from 'classnames';

/**
 * Internal dependencies
 */
import { InnerBlocks } from '@wordpress/block-editor';

const ListSave = ( { attributes: { style }, className } ) => (
	<ul
		className={ classNames( 'mdc-list', className, {
			'mdc-list--two-line': style === 'two-line',
		} ) }
	>
		<InnerBlocks.Content />
	</ul>
);

export default ListSave;
