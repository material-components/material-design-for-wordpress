/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { InspectorControls, RichText } from '@wordpress/block-editor';

/**
 * Card Secondary Image Edit component.
 *
 * @param {Object} props - Component props.
 *
 * @return {Function} Function returning the HTML markup for the component.
 */
const Edit = props => {
	const { attributes, setAttributes, classname } = props;

	return (
		<>
			<InspectorControls { ...props } />
			<RichText
				tagName="div"
				className={ classnames(
					classname,
					'basic-card__secondary',
					'mdc-typography',
					'mdc-typography--body2'
				) }
				value={ attributes.content }
				onChange={ content => setAttributes( { content } ) }
			/>
		</>
	);
};

export default Edit;
