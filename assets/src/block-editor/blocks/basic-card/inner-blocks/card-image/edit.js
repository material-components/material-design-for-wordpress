/**
 * WordPress dependencies.
 */
import {
	BlockControls,
	InspectorControls,
	MediaPlaceholder,
} from '@wordpress/block-editor';
import { useState } from '@wordpress/element';
import { Toolbar } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Card Image Edit component.
 *
 * @param {Object} props - Component props.
 *
 * @return {Function} Function returning the HTML markup for the component.
 */
const Edit = props => {
	console.log( 'props', props );
	const { attributes, setAttributes } = props;

	const { imageSourceUrl, editMode } = attributes;

	const [ hasImage, setHasImage ] = useState(
		imageSourceUrl !== undefined && imageSourceUrl !== ''
	);

	/**
	 * Image select handler.
	 *
	 * @param {Object} el Element
	 */
	const onImageSelect = el => {
		setAttributes( { imageSourceUrl: el.url } );
		setAttributes( { editMode: false } );
		setHasImage( el.url !== undefined && el.url !== '' );
	};

	return (
		<>
			<InspectorControls { ...props } />
			<BlockControls>
				<Toolbar
					controls={ [
						{
							icon: 'edit',
							title: __( 'Edit Image', 'material-theme=builder' ),
							onClick: () => setAttributes( { editMode: ! editMode } ),
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
				<div
					className="mdc-card__media basic-card__media mdc-card__media--16-9"
					style={ { backgroundImage: `url(${ imageSourceUrl })` } }
				></div>
			) }
		</>
	);
};

export default Edit;
