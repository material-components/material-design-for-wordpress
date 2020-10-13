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
 * Internal dependencies
 */
import CardImageEdit from './card-image-edit';
import CardPrimary from './card-primary';

/**
 * Card Image component.
 *
 * @param {Object} props - Component props.
 * @param {string} props.imageSourceUrl - Image Source URL.
 * @param {boolean} props.isImageEditMode - Whether or not the image edit mode is enabled.
 * @param {string} props.contentLayout - Content layout.
 * @param {boolean} props.displayImage - Whether or not to display the image.
 * @param {string} props.type - Media type ('16-9' or 'square').
 * @param {Object} props.cardPrimaryProps - Card Primary Props.
 * @param {boolean} props.cardIndex - Card Index.
 * @param {Function} props.setter - Block attributes setter.
 * @param {boolean} props.isEditMode - Whether or not the edit mode is enabled.
 *
 * @return {Function} Function returning the HTML markup for the component.
 */
const CardImage = ( {
	imageSourceUrl,
	isImageEditMode,
	contentLayout,
	displayImage,
	type,
	cardPrimaryProps,
	cardIndex,
	setter,
	isEditMode,
} ) => {
	const cardImageEditProps = {
		imageSourceUrl,
		isImageEditMode,
		contentLayout,
		displayImage,
		type,
		cardPrimaryProps,
		cardIndex,
		setter,
		isEditMode,
	};

	return (
		<>
			{ isEditMode ? (
				<CardImageEdit { ...cardImageEditProps } />
			) : (
				( imageSourceUrl || contentLayout === 'text-over-media' ) && (
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
				)
			) }
		</>
	);
};

export default CardImage;
