/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import { useCallback } from '@wordpress/element';
import { PanelBody, ToggleControl } from '@wordpress/components';

/**
 * Internal dependencies
 */
import genericAttributesSetter from '../../../utils/generic-attributes-setter';
import CardStylesPanel from '../../../components/card-styles-panel';

/**
 * Card Collections Inspector Controls component.
 *
 * @param {Object} props - Component props.
 * @param {Object} props.attributes - Block attributes.
 * @param {Function} props.setAttributes - Function to set block attributes value.
 *
 * @return {Function} A functional component.
 */
const CardCollectionsInspectorControls = ( { attributes, setAttributes } ) => {
	const setter = useCallback( genericAttributesSetter( setAttributes ), [] );

	const {
		style,
		columns,
		gutter,
		roundedCorners,
		lightbox,
		outlined,
	} = attributes;

	return (
		<InspectorControls>
			<CardStylesPanel
				style={ style }
				columns={ columns }
				showContentLayout={ false }
				gutter={ gutter }
				showGutter={ true }
				roundedCorners={ roundedCorners }
				showRoundedCorners={ true }
				outlined={ outlined }
				setter={ setter }
			/>
			<PanelBody
				title={ __( 'Image Settings', 'material-theme-builder' ) }
				initialOpen={ true }
			>
				<ToggleControl
					label={ __( 'Lightbox', 'material-theme-builder' ) }
					checked={ lightbox }
					onChange={ setter( 'lightbox' ) }
				/>
			</PanelBody>
		</InspectorControls>
	);
};

export default CardCollectionsInspectorControls;
