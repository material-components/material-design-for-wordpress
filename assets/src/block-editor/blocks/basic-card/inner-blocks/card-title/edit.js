/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { InspectorControls, RichText } from '@wordpress/block-editor';

/**
 * Card Title Edit component.
 *
 * @param {Object} props - Component props.
 *
 * @return {Function} Function returning the HTML markup for the component.
 */
const Edit = props => {
	const { attributes, setAttributes, className } = props;

	return (
		<>
			<InspectorControls { ...props } />
			<div className="basic-post-card__primary">
				<RichText
					tagName="h2"
					className={ classnames(
						className,
						'basic-card__title',
						'mdc-typography',
						'mdc-typography--headline6'
					) }
					value={ attributes.title }
					onChange={ title => setAttributes( { title } ) }
				/>
				<RichText
					tagName="h3"
					className={ classnames(
						className,
						'basic-card__subtitle',
						'mdc-typography',
						'mdc-typography--subtitle2'
					) }
					value={ attributes.subTitle }
					onChange={ subTitle => setAttributes( { subTitle } ) }
				/>
			</div>
		</>
	);
};

export default Edit;
