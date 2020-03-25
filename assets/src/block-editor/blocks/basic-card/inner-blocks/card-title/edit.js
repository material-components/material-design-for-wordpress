/**
 * WordPress dependencies
 */
import { RichText } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import genericAttributesSetter from '../../../../utils/generic-attributes-setter';

/**
 * Card Title Edit component.
 *
 * @param {Object} props - Component props.
 *
 * @return {Function} Function returning the HTML markup for the component.
 */
const Edit = ( {
	attributes: { title, subTitle },
	setAttributes,
	className,
} ) => {
	const setter = genericAttributesSetter( setAttributes );

	return (
		<div className={ className }>
			<div className="basic-post-card__primary">
				<RichText
					tagName="h2"
					className="basic-card__title mdc-typography mdc-typography--headline6"
					value={ title }
					onChange={ setter( 'title' ) }
				/>
				<RichText
					tagName="h3"
					className="basic-card__subtitle mdc-typography mdc-typography--subtitle2"
					value={ subTitle }
					onChange={ setter( 'subTitle' ) }
				/>
			</div>
		</div>
	);
};

export default Edit;
