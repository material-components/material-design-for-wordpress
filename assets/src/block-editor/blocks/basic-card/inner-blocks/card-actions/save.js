/**
 * WordPress dependencies
 */
import { InnerBlocks } from '@wordpress/block-editor';

/**
 * Card Save component.
 *
 * @return {Function} Function returning the HTML markup for the component.
 */
const Save = () => (
	<div className="mdc-card__actions">
		<div className="mdc-card__action-buttons">
			<InnerBlocks.Content />
		</div>
	</div>
);

export default Save;
