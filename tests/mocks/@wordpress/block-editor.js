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
