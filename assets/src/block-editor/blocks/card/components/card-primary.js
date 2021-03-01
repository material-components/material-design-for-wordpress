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
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { RichText } from '@wordpress/block-editor';

/**
 * Card Primary component.
 *
 * @param {Object} props - Component props.
 * @param {boolean} props.displayTitle - Whether or not to display the title.
 * @param {string} props.title - Title.
 * @param {boolean} props.displaySecondaryText - Whether or not to display the secondary text.
 * @param {string} props.secondaryText - Secondary text.
 * @param {boolean} props.cardIndex - Card Index.
 * @param {Function} props.setter - Block attribute setter.
 * @param {boolean} props.isEditMode - Whether or not the edit mode is enabled.
 *
 * @return {Function} Function returning the HTML markup for the component.
 */
const CardPrimary = ( {
	displayTitle,
	title,
	displaySecondaryText,
	secondaryText,
	cardIndex,
	setter,
	isEditMode,
} ) => (
	<div className="material-design-card__primary">
		{ isEditMode ? (
			<>
				{ displayTitle && (
					<RichText
						tagName="h2"
						className="material-design-card__title mdc-typography mdc-typography--headline6"
						value={ title }
						onChange={ value => setter( 'title', value, cardIndex ) }
						placeholder={ __( 'Title goes here', 'material-design' ) }
						place
					/>
				) }
				{ displaySecondaryText && (
					<RichText
						tagName="h3"
						className="material-design-card__secondary-text mdc-typography mdc-typography--subtitle2"
						value={ secondaryText }
						onChange={ value => setter( 'secondaryText', value, cardIndex ) }
						placeholder={ __( 'Secondary text', 'material-design' ) }
					/>
				) }
			</>
		) : (
			<>
				{ displayTitle && (
					<h2 className="material-design-card__title mdc-typography mdc-typography--headline6">
						{ title }
					</h2>
				) }
				{ displaySecondaryText && (
					<h3 className="material-design-card__secondary-text mdc-typography mdc-typography--subtitle2">
						{ secondaryText }
					</h3>
				) }
			</>
		) }
	</div>
);

export default CardPrimary;
