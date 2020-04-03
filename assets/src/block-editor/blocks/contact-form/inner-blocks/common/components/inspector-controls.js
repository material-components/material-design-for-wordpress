/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl, ToggleControl } from '@wordpress/components';

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
	attributes: { id, label, outlined, fullWidth },
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
				{ /*<ToggleControl*/ }
				{ /*	label={ __( 'Show Label', 'material-theme-builder' ) }*/ }
				{ /*	checked={ displayLabel }*/ }
				{ /*	onChange={ setter( 'displayLabel' ) }*/ }
				{ /*/>*/ }
			</PanelBody>
			<PanelBody
				title={ __( 'Style', 'material-theme-builder' ) }
				initialOpen={ true }
			>
				<ToggleControl
					label={ __( 'Outlined', 'material-theme-builder' ) }
					checked={ outlined }
					onChange={ setter( 'outlined' ) }
				/>
				<ToggleControl
					label={ __( 'Full Width', 'material-theme-builder' ) }
					checked={ fullWidth }
					onChange={ setter( 'fullWidth' ) }
				/>
			</PanelBody>
		</InspectorControls>
	);
};

export default InputInspectorControls;
