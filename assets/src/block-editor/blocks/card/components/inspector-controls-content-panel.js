/**
 * WordPress dependencies
 */
import { __, sprintf } from '@wordpress/i18n';
import { PanelBody, ToggleControl } from '@wordpress/components';

const InspectorControlsStylePanel = ( {
	cardLayoutStyle = 'vertical',
	displayTitle,
	displaySecondaryText,
	displayImage,
	displaySupportingText,
	displayActions,
	isSingleCard,
	setter,
	cardIndex,
	panelsInitialOpen = true,
} ) => {
	let contentPanelTitle = __( 'Content settings', 'material-theme-builder' );

	if ( ! isSingleCard ) {
		contentPanelTitle = sprintf(
			__( 'Card #%d Content settings' ),
			cardIndex + 1
		);
	}

	return (
		<>
			<PanelBody title={ contentPanelTitle } initialOpen={ panelsInitialOpen }>
				<ToggleControl
					label={ __( 'Show Title', 'material-theme-builder' ) }
					checked={ displayTitle }
					onChange={ value => setter( 'displayTitle', value, cardIndex ) }
				/>
				<ToggleControl
					label={ __( 'Show Secondary Text', 'material-theme-builder' ) }
					checked={ displaySecondaryText }
					onChange={ value =>
						setter( 'displaySecondaryText', value, cardIndex )
					}
				/>
				<ToggleControl
					label={ __( 'Show Image', 'material-theme-builder' ) }
					checked={ displayImage }
					onChange={ value => setter( 'displayImage', value, cardIndex ) }
				/>
				{ cardLayoutStyle === 'vertical' && (
					<ToggleControl
						label={ __( 'Show Supporting Text', 'material-theme-builder' ) }
						checked={ displaySupportingText }
						onChange={ value =>
							setter( 'displaySupportingText', value, cardIndex )
						}
					/>
				) }
				<ToggleControl
					label={ __( 'Show Actions', 'material-theme-builder' ) }
					checked={ displayActions }
					onChange={ value => setter( 'displayActions', value, cardIndex ) }
				/>
			</PanelBody>
		</>
	);
};

export default InspectorControlsStylePanel;
