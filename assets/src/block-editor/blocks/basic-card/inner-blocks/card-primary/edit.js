/**
 * WordPress dependencies.
 */
import { InnerBlocks } from '@wordpress/block-editor';

/**
 * Allowed blocks.
 *
 * @type {string[]}
 */
const ALLOWED_BLOCKS = [
	'material/card-image',
	'material/card-title',
	'material/card-secondary-text',
];

/**
 * Inner block template.
 *
 * @type {string[][]}
 */
const TEMPLATE = [
	[ 'material/card-image' ],
	[ 'material/card-title' ],
	[ 'material/card-secondary-text' ],
];

/**
 * Card Actions Edit component.
 *
 * @return {Function} Function returning the HTML markup for the component.
 */
const Edit = ( { className } ) => (
	<div className={ className }>
		<div
			className="mdc-card__primary-action basic-card__primary-action mdc-ripple-upgraded"
			tabIndex={ 0 }
		>
			<InnerBlocks
				allowedBlocks={ ALLOWED_BLOCKS }
				template={ TEMPLATE }
				templateLock={ false }
			/>
		</div>
	</div>
);

export default Edit;
