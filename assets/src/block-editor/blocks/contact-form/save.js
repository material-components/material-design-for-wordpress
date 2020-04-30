/**
 * WordPress dependencies
 */
import { InnerBlocks } from '@wordpress/block-editor';

/**
 * Contact Form Save component.
 *
 * @param {Object} props - Component props.
 * @param {string} props.className - Component classes.
 *
 * @return {Function} Function returning the HTML markup for the component.
 */
const Save = props => {
	const { className } = props;

	return (
		<div className={ className }>
			<InnerBlocks.Content />
		</div>
	);
};

export default Save;
