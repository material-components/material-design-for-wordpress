/**
 * WordPress dependencies
 */
import { InnerBlocks } from '@wordpress/block-editor';

/**
 * Card Primary Save component.
 *
 * @return {Function} Function returning the HTML markup for the component.
 */
const Save = ( { className } ) => (
	<div className={ className }>
		<div
			className="mdc-card__primary-action basic-card__primary-action mdc-ripple-upgraded"
			tabIndex={ 0 }
		>
			<InnerBlocks.Content />
		</div>
	</div>
);

export default Save;
