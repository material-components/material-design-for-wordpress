/**
 * WordPress dependencies
 */
import { __, sprintf } from '@wordpress/i18n';
import {
	PanelBody,
	RadioControl,
	RangeControl,
	ToggleControl,
} from '@wordpress/components';

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

const InspectorControlsStylePanel = ( {
	cardLayoutStyle = 'vertical',
	contentLayout,
	cornerRadius,
	outlined,
	isSingleCard,
	setter,
	cardIndex,
	panelsInitialOpen = true,
} ) => {
	let stylePanelTitle = __( 'Style settings', 'material-theme-builder' );

	if ( ! isSingleCard ) {
		stylePanelTitle = sprintf( __( 'Card #%d Style settings' ), cardIndex + 1 );
	}

	return (
		<>
			<PanelBody title={ stylePanelTitle } initialOpen={ panelsInitialOpen }>
				{ cardLayoutStyle === 'vertical' && (
					<RadioControl
						label={ __( 'Content layout', 'material-theme-builder' ) }
						selected={ contentLayout }
						options={ CONTENT_LAYOUTS }
						onChange={ value => setter( 'contentLayout', value, cardIndex ) }
					/>
				) }
				<RangeControl
					label={ __( 'Rounded Corners', 'material-theme-builder' ) }
					value={ cornerRadius }
					onChange={ value => setter( 'cornerRadius', value, cardIndex ) }
					min={ MIN_CARD_ROUND_CORNERS }
					max={ MAX_CARD_ROUND_CORNERS }
				/>
				<ToggleControl
					label={ __( 'Outlined', 'material-theme-builder' ) }
					checked={ outlined }
					onChange={ value => setter( 'outlined', value, cardIndex ) }
				/>
			</PanelBody>
		</>
	);
};

export default InspectorControlsStylePanel;
