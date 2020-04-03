/**
 * WordPress dependencies
 */
import { InnerBlocks } from '@wordpress/block-editor';

const ALLOWED_BLOCKS = [
	'material/name-input-field',
	'material/email-input-field',
	'material/website-input-field',
	'material/telephone-input-field',
	'core/paragraph',
];

const TEMPLATES = [
	[ 'material/name-input-field' ],
	[ 'material/email-input-field' ],
	[ 'material/website-input-field' ],
];

/**
 * Contact Form Edit component.
 *
 * @param {Object} props - Component props.
 * @param {string} props.className - Component classes.
 *
 * @return {Function} Function returning the HTML markup for the component.
 */
const Edit = props => {
	const { className } = props;

	return (
		<div className={ className }>
			<InnerBlocks template={ TEMPLATES } allowedBlocks={ ALLOWED_BLOCKS } />
		</div>
	);
};

export default Edit;
