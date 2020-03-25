/**
 * WordPress dependencies
 */
import { InnerBlocks } from '@wordpress/block-editor';

/**
 * Card Collections Save component.
 *
 * @param {Object} props - Component props.
 * @param {Object} props.className - Component class name.
 *
 * @return {Function} Function returning the HTML markup for the component.
 */
const Edit = ( { className } ) => {
	return (
		<>
			<div className={ className }>
				<div className="mdc-card basic-card">
					<InnerBlocks.Content/>
				</div>
			</div>
		</>
	);
};

export default Edit;
