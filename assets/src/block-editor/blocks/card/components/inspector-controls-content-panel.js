/**
 * WordPress dependencies
 */
import { __, sprintf } from '@wordpress/i18n';
import { PanelBody, ToggleControl } from '@wordpress/components';

/**
 * Inspector Controls Content Panel component.
 *
 * @param {Object} props - Component props.
 * @param {string} props.cardLayoutStyle - Card style layout.
 * @param {boolean} props.displayTitle - Whether or not to display the card title.
 * @param {boolean} props.displaySecondaryText - Whether or not to display the card secondary text.
 * @param {boolean} props.displayImage - Whether or not to display the card image.
 * @param {boolean} props.displaySupportingText - Whether or not to display the card supporting text.
 * @param {boolean} props.displayActions - Whether or not to display the card actions row.
 * @param {boolean} props.displaySecondaryActionButton - Whether or not to display the card secondary button.
 * @param {boolean} props.isSingleCard - Whether or not it is a single card or the card is part of a collection
 * @param {Function} props.setter - Function to set the block attributes value.
 * @param {number} props.cardIndex - Card index.
 * @param {boolean} props.isPanelInitialOpened - Whether or not the control panel is initially opened.
 *
 * @return {Function} Function returning the HTML markup for the component.
 */
const InspectorControlsStylePanel = ( {
	cardLayoutStyle = 'vertical',
	displayTitle,
	displaySecondaryText,
	displayImage,
	displaySupportingText,
	displayActions,
	displaySecondaryActionButton,
	isSingleCard,
	setter,
	cardIndex,
	isPanelInitialOpened = true,
} ) => (
	<PanelBody
		title={
			isSingleCard
				? __( 'Content Settings', 'material-theme-builder' )
				: sprintf( __( 'Card #%d Content Settings' ), cardIndex + 1 )
		}
		initialOpen={ isPanelInitialOpened }
	>
		<ToggleControl
			label={ __( 'Show title', 'material-theme-builder' ) }
			checked={ displayTitle }
			onChange={ value => setter( 'displayTitle', value, cardIndex ) }
		/>
		<ToggleControl
			label={ __( 'Show secondary text', 'material-theme-builder' ) }
			checked={ displaySecondaryText }
			onChange={ value => setter( 'displaySecondaryText', value, cardIndex ) }
		/>
		<ToggleControl
			label={ __( 'Show image', 'material-theme-builder' ) }
			checked={ displayImage }
			onChange={ value => setter( 'displayImage', value, cardIndex ) }
		/>
		{ cardLayoutStyle === 'vertical' && (
			<ToggleControl
				label={ __( 'Show supporting text', 'material-theme-builder' ) }
				checked={ displaySupportingText }
				onChange={ value =>
					setter( 'displaySupportingText', value, cardIndex )
				}
			/>
		) }
		<ToggleControl
			label={ __( 'Show actions', 'material-theme-builder' ) }
			checked={ displayActions }
			onChange={ value => setter( 'displayActions', value, cardIndex ) }
		/>
		{ displayActions && (
			<ToggleControl
				label={ __( 'Show secondary action button', 'material-theme-builder' ) }
				checked={ displaySecondaryActionButton }
				onChange={ value =>
					setter( 'displaySecondaryActionButton', value, cardIndex )
				}
			/>
		) }
	</PanelBody>
);

export default InspectorControlsStylePanel;
