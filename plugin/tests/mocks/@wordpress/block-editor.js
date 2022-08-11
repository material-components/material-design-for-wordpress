/**
 * Copyright 2021 Google LLC
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

const original = jest.requireActual( '@wordpress/block-editor' );

// eslint-disable-next-line import/named
import { __experimentalRichText as RichText } from './rich-text';

const blockprops = props => props;
blockprops.save = props => props;

module.exports = {
	...original,
	AlignmentToolbar: () => null,
	BlockControls: ( { children } ) => children,
	ContrastChecker: ( { textColor, backgroundColor } ) => (
		<div className="components-contrast-checked">
			{ textColor } - { backgroundColor }
		</div>
	),
	MediaPlaceholder: ( { onSelect } ) => (
		<div
			className="components-placeholder block-editor-media-placeholder is-small"
			onSelect={ node => onSelect( node.currentTarget.value ) }
		>
			Placeholder
		</div>
	),
	URLInput: ( {
		onChange,
		value,
		placeholder = 'Paste URL or type to search',
	} ) => (
		<div className="components-base-control block-editor-url-input">
			<div className="components-base-control__field">
				<input
					aria-autocomplete="list"
					aria-expanded="false"
					aria-label="URL"
					aria-owns="block-editor-url-input-suggestions-1"
					className="block-editor-url-input__input"
					placeholder={ placeholder }
					role="combobox"
					type="text"
					value={ value }
					onChange={ node => onChange( node.currentTarget.value ) }
				/>
			</div>
		</div>
	),
	InnerBlocks: () => {
		const innerBlocks = [
			{
				id: 'button-1',
				name: 'material/button',
			},
		];

		return (
			<>
				{ innerBlocks.map( block => (
					<div key={ block.id }> { JSON.stringify( block ) } </div>
				) ) }
			</>
		);
	},
	InspectorControls: ( { children } ) => children,
	RichText,
	useBlockProps: blockprops,
	__experimentalColorGradientSettingsDropdown: () => (
		<div
			className="components-item-group block-editor-panel-color-gradient-settings__item-group"
			role="list"
			data-wp-c16t="true"
			data-wp-component="ItemGroup"
		>
			<div className="components-dropdown block-editor-panel-color-gradient-settings__dropdown">
				<div role="listitem">
					<button className="components-item block-editor-panel-color-gradient-settings__item">
						<div className="components-flex components-h-stack">
							<span
								className="component-color-indicator block-editor-panel-color-gradient-settings__color-indicator"
								style={ { background: 'rgb(172, 39, 109)' } }
							></span>
							<div
								data-wp-c16t="true"
								data-wp-component="FlexItem"
								className="components-flex-item"
							>
								Text Color
							</div>
						</div>
					</button>
				</div>
			</div>
		</div>
	),
};
