/**
 * WordPress dependencies
 */
import { RichText } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import genericAttributesSetter from '../../../../utils/generic-attributes-setter';

/**
 * Card Secondary Image Edit component.
 *
 * @param {Object} props - Component props.
 *
 * @return {Function} Function returning the HTML markup for the component.
 */
const Edit = ( { attributes: { content }, setAttributes, className } ) => {
	const setter = genericAttributesSetter( setAttributes );

	return (
		<div className={ className }>
			<RichText
				tagName="div"
				className="basic-card__secondary mdc-typography mdc-typography--body2"
				value={ content }
				onChange={ setter( 'content' ) }
			/>
		</div>
	);
};

export default Edit;
