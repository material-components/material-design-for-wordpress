/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import {
	PanelBody,
	RadioControl,
	RangeControl,
	ToggleControl,
	TextControl,
} from '@wordpress/components';
import { useCallback } from '@wordpress/element';

/**
 * Internal dependencies
 */
import genericAttributesSetter from '../../../utils/generic-attributes-setter';

const CONTENT_LAYOUTS = [
	{
		label: __( 'Text above media', 'material-theme-builder' ),
		value: 'text-above-media',
	},
	{
		label: __( 'Text over media', 'material-theme-builder' ),
		value: 'text-over-media',
	},
	{
		label: __( 'Text under media', 'material-theme-builder' ),
		value: 'text-under-media',
	},
];

const MIN_CARD_ROUND_CORNERS = 0;
const MAX_CARD_ROUND_CORNERS = 20;

/**
 * Single Card Inspector Controls component.
 *
 * @param {Object} props - Component props.
 * @param {Object} props.attributes - Block attributes.
 * @param {Function} props.setAttributes - Function to set block attributes value.
 *
 * @return {Function} A functional component.
 */
const CardInspectorControls = ( {
	attributes: {
		contentLayout,
		displayTitle,
		displaySubTitle,
		displayImage,
		displaySecondaryText,
		displayActions,
		cornerRadius,
		outlined,
		actionButtonRel,
		actionButtonLinkTarget,
	},
	setAttributes,
} ) => {
	const setter = genericAttributesSetter( setAttributes );

	const onToggleOpenInNewTab = useCallback(
		value => {
			const newLinkTarget = value ? '_blank' : undefined;

			let updatedRel = actionButtonRel;
			if ( newLinkTarget && ! actionButtonRel ) {
				updatedRel = 'noreferrer noopener';
			} else if (
				! newLinkTarget &&
				actionButtonRel === 'noreferrer noopener'
			) {
				updatedRel = undefined;
			}

			setAttributes( {
				actionButtonLinkTarget: newLinkTarget,
				actionButtonRel: updatedRel,
			} );
		},
		[ actionButtonRel, setAttributes ]
	);

	return (
		<InspectorControls>
			<PanelBody
				title={ __( 'Style settings', 'material-theme-builder' ) }
				initialOpen={ true }
			>
				<RadioControl
					label={ __( 'Content layout', 'material-theme-builder' ) }
					selected={ contentLayout }
					options={ CONTENT_LAYOUTS }
					onChange={ setter( 'contentLayout' ) }
				/>
				<RangeControl
					label={ __( 'Rounded Corners', 'material-theme-builder' ) }
					value={ cornerRadius }
					onChange={ setter( 'cornerRadius' ) }
					min={ MIN_CARD_ROUND_CORNERS }
					max={ MAX_CARD_ROUND_CORNERS }
				/>
				<ToggleControl
					label={ __( 'Outlined', 'material-theme-builder' ) }
					checked={ outlined }
					onChange={ setter( 'outlined' ) }
				/>
			</PanelBody>
			<PanelBody
				title={ __( 'Content settings', 'material-theme-builder' ) }
				initialOpen={ true }
			>
				<ToggleControl
					label={ __( 'Show Title', 'material-theme-builder' ) }
					checked={ displayTitle }
					onChange={ setter( 'displayTitle' ) }
				/>
				<ToggleControl
					label={ __( 'Show Subtitle', 'material-theme-builder' ) }
					checked={ displaySubTitle }
					onChange={ setter( 'displaySubTitle' ) }
				/>
				<ToggleControl
					label={ __( 'Show Image', 'material-theme-builder' ) }
					checked={ displayImage }
					onChange={ setter( 'displayImage' ) }
				/>
				<ToggleControl
					label={ __( 'Show Secondary Text', 'material-theme-builder' ) }
					checked={ displaySecondaryText }
					onChange={ setter( 'displaySecondaryText' ) }
				/>
				<ToggleControl
					label={ __( 'Show Actions', 'material-theme-builder' ) }
					checked={ displayActions }
					onChange={ setter( 'displayActions' ) }
				/>
			</PanelBody>
			<PanelBody
				title={ __( 'Action Button Settings', 'material-theme-builder' ) }
				initialOpen={ true }
			>
				<ToggleControl
					label={ __( 'Open in new tab', 'material-theme-builder' ) }
					onChange={ onToggleOpenInNewTab }
					checked={ actionButtonLinkTarget === '_blank' }
				/>
				<TextControl
					value={ actionButtonRel }
					label={ __( 'Link rel', 'material-theme-builder' ) }
					onChange={ setter( 'actionButtonRel' ) }
				/>
			</PanelBody>
		</InspectorControls>
	);
};

export default CardInspectorControls;
