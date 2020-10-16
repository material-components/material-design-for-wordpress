/**
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Internal dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { MediaPlaceholder } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import { useState, useEffect } from '@wordpress/element';
import { Button } from '@wordpress/components';

/**
 * Internal dependencies
 */
import CardPrimary from './card-primary';

/**
 * Card Image Edit component.
 *
 * @param {Object} props - Component props.
 * @param {string} props.imageSourceUrl - Image Source URL.
 * @param {boolean} props.isImageEditMode - Image Edit mode.
 * @param {string} props.contentLayout - Content layout.
 * @param {boolean} props.displayImage - Whether or not to display the image.
 * @param {string} props.type - Media type ('16-9' or 'square').
 * @param {Object} props.cardPrimaryProps - Card Primary Props.
 * @param {boolean} props.cardIndex - Card Index.
 * @param {Function} props.setter - Block attributes setter.
 *
 * @return {Function} Function returning the HTML markup for the component.
 */
const CardImageEdit = ( {
	imageSourceUrl,
	isImageEditMode,
	contentLayout,
	displayImage,
	type,
	cardPrimaryProps,
	cardIndex,
	setter,
} ) => {
	const [ hasImage, setHasImage ] = useState(
		imageSourceUrl !== undefined && imageSourceUrl !== ''
	);
	const [ isFocused, setIsFocused ] = useState( false );

	useEffect( () => {
		if ( imageSourceUrl !== undefined && imageSourceUrl !== '' ) {
			setHasImage( true );
		} else {
			setHasImage( false );
		}
	}, [ imageSourceUrl ] );

	/**
	 * Image select handler.
	 *
	 * @param {Object} el Image object.
	 */
	const onImageSelect = el => {
		setter( 'imageSourceUrl', el.url, cardIndex );
		setter( 'isImageEditMode', false, cardIndex );
		setHasImage( el.url !== undefined && el.url !== '' );
	};

	/**
	 * Image removal handler.
	 */
	const onRemoveImage = () => {
		setter( 'imageSourceUrl', '', cardIndex );
		setter( 'isImageEditMode', false, cardIndex );
		setHasImage( false );
	};

	/**
	 * Handle image container on blur event.
	 *
	 * @param {Object} event - Event.
	 */
	const onImageContainerBlur = event => {
		const currentTarget = event.currentTarget;
		/* istanbul ignore next */
		setTimeout( () => {
			if ( ! currentTarget.contains( document.activeElement ) ) {
				setIsFocused( false );
			}
		}, 0 );
	};

	return (
		<>
			{ ( ! hasImage || isImageEditMode ) && displayImage && (
				<MediaPlaceholder
					onSelect={ onImageSelect }
					allowedTypes={ [ 'image' ] }
					multiple={ false }
					labels={ {
						title: __( 'Card Image selector', 'material-design' ),
					} }
					accept="image/*"
				></MediaPlaceholder>
			) }
			{ hasImage && ! isImageEditMode && imageSourceUrl && (
				<>
					<div
						className={ classnames( 'material-design-card__media-container', {
							'material-design-card__media-container-focused': isFocused,
						} ) }
						onFocus={ () => setIsFocused( true ) }
						onBlur={ onImageContainerBlur }
					>
						<div
							tabIndex={ 0 }
							className={ classnames(
								'mdc-card__media',
								`mdc-card__media--${ type }`,
								'material-design-card__media',
								{
									[ `material-design-card-with-${ contentLayout }` ]: contentLayout,
								}
							) }
							style={ { backgroundImage: `url(${ imageSourceUrl })` } }
						>
							{ contentLayout === 'text-over-media' && (
								<div className="mdc-card__media-content">
									<CardPrimary { ...cardPrimaryProps } />
								</div>
							) }
						</div>
						<div
							className={ classnames( 'material-design-card__media-actions', {
								'material-design-card__media-actions-shown': isFocused,
							} ) }
						>
							<Button
								className="material-design-card__media-close-button"
								icon="no"
								showTooltip={ true }
								label={ __( 'Remove Card Image', 'material-design' ) }
								onClick={ onRemoveImage }
							/>
						</div>
					</div>
				</>
			) }
		</>
	);
};

export default CardImageEdit;
