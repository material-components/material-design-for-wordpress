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
import { __ } from '@wordpress/i18n';
import { RichText } from '@wordpress/block-editor';

/**
 * Card Supporting Text component.
 *
 * @param {Object} props - Component props.
 * @param {string} props.supportingText - Supporting text.
 * @param {string} props.contentLayout - Content layout.
 * @param {number} props.cardIndex - Card index.
 * @param {Function} props.setter - Block attribute setter.
 * @param {boolean} props.isEditMode - Whether or not the edit mode is enabled.
 *
 * @return {Function} Function returning the HTML markup for the component.
 */
const CardSupportingText = ( {
	supportingText,
	contentLayout,
	cardIndex,
	setter,
	isEditMode,
} ) => (
	<>
		{ isEditMode ? (
			<RichText
				tagName="div"
				className={ classnames(
					'material-design-card__supporting-text',
					`material-design-card__supporting-text_${ contentLayout }`,
					'mdc-typography',
					'mdc-typography--body2'
				) }
				value={ supportingText }
				onChange={ value => setter( 'supportingText', value, cardIndex ) }
				placeholder={ __( 'Supporting text', 'material-design' ) }
			/>
		) : (
			<div
				className={ classnames(
					'material-design-card__supporting-text',
					`material-design-card__supporting-text_${ contentLayout }`,
					'mdc-typography',
					'mdc-typography--body2'
				) }
			>
				{ supportingText }
			</div>
		) }
	</>
);

export default CardSupportingText;
