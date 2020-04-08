/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, RangeControl, ToggleControl } from '@wordpress/components';

/**
 * Internal dependencies
 */
import genericAttributesSetter from '../../../utils/generic-attributes-setter';
import CardStylesPanel from '../../../components/card-styles-panel';
import InspectorControlsStylePanel from '../../card/components/inspector-controls-style-panel';
import InspectorControlsContentPanel from '../../card/components/inspector-controls-content-panel';

import { MIN_NUMBER_OF_CARDS, MAX_NUMBER_OF_CARDS } from '../constants';

/**
 * Card Collections Inspector Controls component.
 *
 * @param {Object} props - Component props.
 * @param {Object} props.attributes - Block attributes.
 * @param {Function} props.setAttributes - Function to set block attributes value.
 *
 * @return {Function} Function returning the HTML markup for the component.
 */
const CardsCollectionInspectorControls = ( { attributes, setAttributes } ) => {
	const standardSetter = genericAttributesSetter( setAttributes );

	const {
		style,
		columns,
		contentLayout,
		numberOfCards,
		cardsProps,
		gutter,
		cornerRadius,
		outlined,
		allowIndividualStyleOverride,
		allowIndividualContentOverride,
		displayTitle,
		displaySecondaryText,
		displaySupportingText,
		displayActions,
		displaySecondaryActionButton,
		displayImage,
		setter,
	} = attributes;

	const individualCardsPanels = cardsProps.map( ( cardProps, cardIndex ) => {
		const inspectorControlsStylePanelProps = {
			cardLayoutStyle: style === 'list' ? 'horizontal' : 'vertical',
			contentLayout: cardProps.contentLayout,
			cornerRadius: cardProps.cornerRadius,
			outlined: cardProps.outlined,
			isSingleCard: false,
			setter,
			cardIndex,
			panelsInitialOpen: false,
		};

		const inspectorControlsContentPanelProps = {
			displayTitle: cardProps.displayTitle,
			displaySecondaryText: cardProps.displaySecondaryText,
			displayImage: cardProps.displayImage,
			displaySupportingText: cardProps.displaySupportingText,
			displayActions: cardProps.displayActions,
			displaySecondaryActionButton: cardProps.displaySecondaryActionButton,
			isSingleCard: false,
			setter,
			cardIndex,
			panelsInitialOpen: false,
		};
		return (
			<div key={ cardIndex }>
				{ allowIndividualStyleOverride && (
					<InspectorControlsStylePanel
						{ ...inspectorControlsStylePanelProps }
					/>
				) }
				{ allowIndividualContentOverride && (
					<InspectorControlsContentPanel
						{ ...inspectorControlsContentPanelProps }
					/>
				) }
			</div>
		);
	} );

	return (
		<InspectorControls>
			<CardStylesPanel
				style={ style }
				columns={ columns }
				allowIndividualStyleOverride={ allowIndividualStyleOverride }
				showAllowIndividualStyleOverride={ true }
				contentLayout={ contentLayout }
				showContentLayout={ style !== 'list' }
				gutter={ gutter }
				showGutter={ true }
				cornerRadius={ cornerRadius }
				showCornerRadius={ true }
				outlined={ outlined }
				setter={ standardSetter }
			/>
			<PanelBody
				title={ __( 'Content', 'material-theme-builder' ) }
				initialOpen={ true }
			>
				<RangeControl
					label={ __( 'Number of cards', 'material-theme-builder' ) }
					value={ numberOfCards }
					onChange={ standardSetter( 'numberOfCards' ) }
					min={ MIN_NUMBER_OF_CARDS }
					max={ MAX_NUMBER_OF_CARDS }
				/>

				<ToggleControl
					label={ __(
						'Allow individual card override',
						'material-theme-builder'
					) }
					checked={ allowIndividualContentOverride }
					onChange={ standardSetter( 'allowIndividualContentOverride' ) }
				/>

				{ ! allowIndividualContentOverride && (
					<>
						<ToggleControl
							label={ __( 'Show title', 'material-theme-builder' ) }
							checked={ displayTitle }
							onChange={ standardSetter( 'displayTitle' ) }
						/>
						<ToggleControl
							label={ __( 'Show Secondary Text', 'material-theme-builder' ) }
							checked={ displaySecondaryText }
							onChange={ standardSetter( 'displaySecondaryText' ) }
						/>
						<ToggleControl
							label={ __( 'Show Image', 'material-theme-builder' ) }
							checked={ displayImage }
							onChange={ standardSetter( 'displayImage' ) }
						/>
						{ style !== 'list' && (
							<ToggleControl
								label={ __( 'Show Supporting Text', 'material-theme-builder' ) }
								checked={ displaySupportingText }
								onChange={ standardSetter( 'displaySupportingText' ) }
							/>
						) }
						<ToggleControl
							label={ __( 'Show Actions', 'material-theme-builder' ) }
							checked={ displayActions }
							onChange={ standardSetter( 'displayActions' ) }
						/>
						{ displayActions && (
							<ToggleControl
								label={ __(
									'Show secondary action button',
									'material-theme-builder'
								) }
								checked={ displaySecondaryActionButton }
								onChange={ standardSetter( 'displaySecondaryActionButton' ) }
							/>
						) }
					</>
				) }
			</PanelBody>
			{ individualCardsPanels }
		</InspectorControls>
	);
};

export default CardsCollectionInspectorControls;
