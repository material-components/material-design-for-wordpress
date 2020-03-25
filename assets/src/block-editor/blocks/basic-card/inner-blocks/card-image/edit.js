/**
 * WordPress dependencies.
 */
import { BlockControls, MediaPlaceholder } from '@wordpress/block-editor';
import { useState } from '@wordpress/element';
import { Toolbar } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import genericAttributesSetter from '../../../../utils/generic-attributes-setter';

/**
 * Card Image Edit component.
 *
 * @param {Object} props - Component props.
 *
 * @return {Function} Function returning the HTML markup for the component.
 */
const Edit = ( {
	attributes: { imageSourceUrl, editMode },
	setAttributes,
	className,
} ) => {
	const setter = genericAttributesSetter( setAttributes );
	const [ hasImage, setHasImage ] = useState(
		imageSourceUrl !== undefined && imageSourceUrl !== ''
	);

	/**
	 * Image select handler.
	 *
	 * @param {Object} el Element
	 */
	const onImageSelect = el => {
		setAttributes( {
			imageSourceUrl: el.url,
			editMode: false,
		} );
		setHasImage( el.url !== undefined && el.url !== '' );
	};

	return (
		<>
			<BlockControls>
				<Toolbar
					controls={ [
						{
							icon: 'edit',
							title: __( 'Edit Image', 'material-theme=builder' ),
							onClick: setter( 'editMode', () => ! editMode ),
							isActive: editMode,
						},
					] }
				/>
			</BlockControls>
			{ ( ! hasImage || editMode ) && (
				<MediaPlaceholder
					onSelect={ onImageSelect }
					allowedTypes={ [ 'image' ] }
					multiple={ false }
					labels={ {
						title: __( 'Card Image selector', 'material-theme-builder' ),
					} }
					accept="image/*"
				></MediaPlaceholder>
			) }
			{ hasImage && ! editMode && (
				<div className={ className }>
					<div
						className="mdc-card__media basic-card__media mdc-card__media--16-9"
						style={ { backgroundImage: `url(${ imageSourceUrl })` } }
					></div>
				</div>
			) }
		</>
	);
};

export default Edit;
