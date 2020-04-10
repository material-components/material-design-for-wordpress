/**
 * External dependencies
 */
import classNames from 'classnames';

/**
 * Internal dependencies
 */
import { InnerBlocks } from '@wordpress/block-editor';

const ListSave = ( { attributes: { style }, className } ) => (
	<div className={ className }>
		<ul
			className={ classNames( 'mdc-list', {
				'mdc-list--two-line': style === 'two-line',
			} ) }
		>
			<InnerBlocks.Content />
		</ul>
	</div>
);

export default ListSave;
