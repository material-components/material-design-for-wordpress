/**
 * Internal dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { MediaPlaceholder } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';

/**
 * Internal dependencies
 */
import CardPrimary from './card-primary';

/**
 * Card Image Component.
 *
 * @param {Object} props - Component props.
 * @param {string} props.imageSourceUrl - Image Source URL.
 * @param {boolean} props.imageEditMode - Image Edit mode.
 * @param {string} props.contentLayout - Content layout.
 * @param {Object} props.cardPrimaryProps - Card Primary Props.
 * @param {Function} props.setAttributes - Block attributes setter.
 *
 * @return {Function} Function returning the HTML markup for the component.
 */
const CardImage = ( {
	imageSourceUrl,
	imageEditMode,
	contentLayout,
	cardPrimaryProps,
	setAttributes,
} ) => {
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
			imageEditMode: false,
		} );
		setHasImage( el.url !== undefined && el.url !== '' );
	};

	return (
		<>
			{ ( ! hasImage || imageEditMode ) && (
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
			{ hasImage && ! imageEditMode && imageSourceUrl && (
				<>
					<div
						className={ classnames(
							'mdc-card__media',
							'mdc-card__media--16-9',
							'mtb-card__media',
							{ [ `mtb-card-with-${ contentLayout }` ]: contentLayout }
						) }
						style={ { backgroundImage: `url(${ imageSourceUrl })` } }
					>
						{ contentLayout === 'text-over-media' && (
							<div className="mdc-card__media-content">
								<CardPrimary { ...cardPrimaryProps } />
							</div>
						) }
					</div>
				</>
			) }
		</>
	);
};

export default CardImage;
