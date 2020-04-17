/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl } from '@wordpress/components';

/**
 * Internal dependencies
 */
import genericAttributesSetter from '../../../../../utils/generic-attributes-setter';

/**
 * Common Posts List Inspector Controls component.
 *
 * @param {Object} props - Component props.
 * @param {Object} props.attributes - Block attributes.
 * @param {Function} props.setAttributes - Function to set block attributes value.
 *
 * @return {Function} A functional component.
 */
const InputInspectorControls = ( {
	attributes: { id, label },
	setAttributes,
} ) => {
	const setter = genericAttributesSetter( setAttributes );

	return (
		<InspectorControls>
			<PanelBody
				title={ __( 'Field Settings', 'material-theme-builder' ) }
				initialOpen={ true }
			>
				<TextControl
					label={ __( 'ID', 'material-theme-builder' ) }
					value={ id }
					onChange={ setter( 'id' ) }
				/>
				<TextControl
					label={ __( 'Label', 'material-theme-builder' ) }
					value={ label }
					onChange={ setter( 'label' ) }
				/>
			</PanelBody>
		</InspectorControls>
	);
};

export default InputInspectorControls;
