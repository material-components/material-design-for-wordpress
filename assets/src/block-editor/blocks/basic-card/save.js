/**
 * WordPress dependencies
 */
import { InnerBlocks } from '@wordpress/block-editor';

/**
 * Card Save component.
 *
 * @return {Function} Function returning the HTML markup for the component.
 */
const Save = () => {
	return (
		<div className="mdc-card basic-card">
			<div
				className="mdc-card__primary-action basic-card__primary-action mdc-ripple-upgraded"
				tabIndex={ 0 }
			>
				<InnerBlocks.Content />
			</div>
		</div>
	);
};

export default Save;
