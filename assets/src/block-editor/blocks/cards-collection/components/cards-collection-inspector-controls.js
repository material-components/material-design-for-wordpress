/**
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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
			isPanelInitialOpened: false,
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
			isPanelInitialOpened: false,
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

	/**
	 * Handle the display title setting change.
	 *
	 * @param {boolean} value Display title setting value
	 */
	const onDisplayTitleChange = value => {
		setAttributes( {
			displayTitle: value,
			displaySecondaryText: value,
		} );
	};

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
				title={ __( 'Content', 'material-design' ) }
				initialOpen={ true }
			>
				<RangeControl
					label={ __( 'Number of cards', 'material-design' ) }
					value={ numberOfCards }
					onChange={ standardSetter( 'numberOfCards' ) }
					min={ MIN_NUMBER_OF_CARDS }
					max={ MAX_NUMBER_OF_CARDS }
				/>

				<ToggleControl
					label={ __( 'Allow individual card override', 'material-design' ) }
					checked={ allowIndividualContentOverride }
					onChange={ standardSetter( 'allowIndividualContentOverride' ) }
				/>

				{ ! allowIndividualContentOverride && (
					<>
						<ToggleControl
							label={ __( 'Show title', 'material-design' ) }
							checked={ displayTitle }
							onChange={ onDisplayTitleChange }
						/>
						{ displayTitle && (
							<ToggleControl
								label={ __( 'Show secondary text', 'material-design' ) }
								checked={ displaySecondaryText }
								onChange={ standardSetter( 'displaySecondaryText' ) }
							/>
						) }
						<ToggleControl
							label={ __( 'Show image', 'material-design' ) }
							checked={ displayImage }
							onChange={ standardSetter( 'displayImage' ) }
						/>
						{ style !== 'list' && (
							<ToggleControl
								label={ __( 'Show supporting text', 'material-design' ) }
								checked={ displaySupportingText }
								onChange={ standardSetter( 'displaySupportingText' ) }
							/>
						) }
						<ToggleControl
							label={ __( 'Show actions', 'material-design' ) }
							checked={ displayActions }
							onChange={ standardSetter( 'displayActions' ) }
						/>
						{ displayActions && (
							<ToggleControl
								label={ __(
									'Show secondary action button',
									'material-design'
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
