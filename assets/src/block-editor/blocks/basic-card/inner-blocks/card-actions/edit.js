/**
 * WordPress dependencies.
 */
import { InnerBlocks } from '@wordpress/block-editor';

/**
 * Allowed blocks.
 *
 * @type {string[]}
 */
const ALLOWED_BLOCKS = [ 'material/button' ];

/**
 * Inner block template.
 *
 * @type {string[][]}
 */
const TEMPLATE = [ [ 'material/button' ] ];

/**
 * Card Actions Edit component.
 *
 * @param {Object} props - Component props.
 *
 * @return {Function} Function returning the HTML markup for the component.
 */
const Edit = props => {
	// const { attributes, setAttributes } = props;

	return (
		<div className="mdc-card__actions">
			<div className="mdc-card__action-buttons">
				<InnerBlocks allowedBlocks={ ALLOWED_BLOCKS } template={ TEMPLATE } />
			</div>
		</div>
	);
};

export default Edit;
