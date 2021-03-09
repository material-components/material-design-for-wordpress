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

/* global jest */

const original = jest.requireActual( '@wordpress/block-editor' );

import { __experimentalRichText as RichText } from './rich-text';

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
};
