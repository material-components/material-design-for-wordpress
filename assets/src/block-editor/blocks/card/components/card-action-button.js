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
import ToolbarUrlInputPopover from '../../../components/toolbar-url-input-popover';

/**
 * Card Action Button component.
 *
 * @param {Object} props - Component properties.
 * @param {string} props.label - Button label.
 * @param {Function} props.onChangeLabel - Button label change handler.
 * @param {string} props.url - Button url.
 * @param {Function} props.onChangeUrl - Button url change handler
 * @param {boolean} props.newTab - Whether or not the button url should open in a new tab.
 * @param {Function} props.onChangeNewTab - Button new tab toggle handler.
 * @param {boolean} props.noFollow - Whether or not the button url rel property should be noFollow.
 * @param {Function} props.onChangeNoFollow - Button no follow toggle handler.
 * @param {boolean} props.disableSuggestions. - Whether or not the url input suggestion is enabled or not.
 * @param {Function} props.onPopupClose. - Url input popup close handler.
 * @param {Function} props.onPopupFocusOutside. - Url input popup focus outside handler.
 * @param {boolean} props.isFocused. - Whether or not the button is focused.
 * @param {boolean} props.isEditMode - Whether or not the edit mode is enabled.
 *
 * @return {Function} Function returning the HTML markup for the component.
 */
const CardActionButton = ( {
	label,
	onChangeLabel = () => {},
	onPopupFocusOutside = () => {},
	onChangeUrl = () => {},
	onChangeNewTab = () => {},
	url,
	newTab,
	noFollow,
	isFocused = false,
	isEditMode,
} ) => {
	let rel;
	if ( url && newTab ) {
		rel = 'noopener noreferrer';
		if ( noFollow ) {
			rel += ' nofollow';
		}
	}

	return (
		<>
			{ isEditMode ? (
				<button className="mdc-button mdc-card__action mdc-card__action--button">
					<RichText
						tagName="div"
						value={ label }
						onChange={ onChangeLabel }
						placeholder={ __( 'Button', 'material-design' ) }
						allowedFormats={ [
							'core/bold',
							'core/italic',
							'core/code',
							'core/image',
							'core/strikethrough',
							'core/underline',
							'core/text-color',
							'core/subscript',
							'core/superscript',
						] }
					/>
				</button>
			) : (
				<a
					href={ url || '#' }
					rel={ rel }
					target={ url && newTab ? '_blank' : undefined }
					className="mdc-button mdc-card__action mdc-card__action--button"
				>
					<div className="mdc-button__ripple"></div>
					<span
						className="mdc-button__label"
						dangerouslySetInnerHTML={ { __html: label } }
					></span>
				</a>
			) }
			{ isFocused && isEditMode && (
				<>
					<ToolbarUrlInputPopover
						url={ url }
						setURL={ onChangeUrl }
						isSelected={ true }
						opensInNewTab={ newTab }
						onChangeNewTab={ onChangeNewTab }
						onFocusOutside={ onPopupFocusOutside }
					/>
				</>
			) }
		</>
	);
};

export default CardActionButton;
