/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import { useCallback } from '@wordpress/element';
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
 * @return {Function} A functional component.
 */
const CardCollectionsInspectorControls = ( { attributes, setAttributes } ) => {
	const standardSetter = useCallback(
		genericAttributesSetter( setAttributes ),
		[]
	);

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
		displaySubTitle,
		displaySecondaryText,
		displayActions,
		displayImage,
		setter,
	} = attributes;

	let showContentLayout = true;

	if ( style === 'list' ) {
		showContentLayout = false;
	}

	return (
		<InspectorControls>
			<CardStylesPanel
				style={ style }
				columns={ columns }
				allowIndividualStyleOverride={ allowIndividualStyleOverride }
				showAllowIndividualStyleOverride={ true }
				contentLayout={ contentLayout }
				showContentLayout={ showContentLayout }
				gutter={ gutter }
				showGutter={ true }
				roundedCorners={ cornerRadius }
				showRoundedCorners={ true }
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
							label={ __( 'Show Subtitle', 'material-theme-builder' ) }
							checked={ displaySubTitle }
							onChange={ standardSetter( 'displaySubTitle' ) }
						/>
						<ToggleControl
							label={ __( 'Show Image', 'material-theme-builder' ) }
							checked={ displayImage }
							onChange={ standardSetter( 'displayImage' ) }
						/>
						{ style !== 'list' && (
							<ToggleControl
								label={ __( 'Show Secondary Text', 'material-theme-builder' ) }
								checked={ displaySecondaryText }
								onChange={ standardSetter( 'displaySecondaryText' ) }
							/>
						) }
						<ToggleControl
							label={ __( 'Show Actions', 'material-theme-builder' ) }
							checked={ displayActions }
							onChange={ standardSetter( 'displayActions' ) }
						/>
					</>
				) }
			</PanelBody>
			{ cardsProps.map( ( cardProps, cardIndex ) => {
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
					displaySubTitle: cardProps.displaySubTitle,
					displayImage: cardProps.displayImage,
					displaySecondaryText: cardProps.displaySecondaryText,
					displayActions: cardProps.displayActions,
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
			} ) }
		</InspectorControls>
	);
};

export default CardCollectionsInspectorControls;
