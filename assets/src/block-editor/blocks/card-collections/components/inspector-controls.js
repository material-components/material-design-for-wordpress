/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import { useCallback } from '@wordpress/element';
import { PanelBody, RangeControl } from '@wordpress/components';

/**
 * Internal dependencies
 */
import genericAttributesSetter from '../../../utils/generic-attributes-setter';
import CardStylesPanel from '../../../components/card-styles-panel';
import InspectorControlsStylePanel from '../../card/components/inspector-controls-style-panel';

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
		numberOfCards,
		cardsProps,
		gutter,
		cornerRadius,
		outlined,
		setter,
	} = attributes;

	return (
		<InspectorControls>
			<CardStylesPanel
				style={ style }
				columns={ columns }
				showContentLayout={ false }
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
			</PanelBody>
			{ cardsProps.map( ( cardProps, cardIndex ) => {
				const inspectorControlsStylePanelProps = {
					contentLayout: cardProps.contentLayout,
					displayTitle: cardProps.displayTitle,
					displaySubTitle: cardProps.displaySubTitle,
					displayImage: cardProps.displayImage,
					displaySecondaryText: cardProps.displaySecondaryText,
					displayActions: cardProps.displayActions,
					cornerRadius: cardProps.cornerRadius,
					outlined: cardProps.outlined,
					isSingleCard: false,
					setter,
					cardIndex,
					panelsInitialOpen: false,
				};
				return (
					<InspectorControlsStylePanel
						key={ cardIndex }
						{ ...inspectorControlsStylePanelProps }
					/>
				);
			} ) }
		</InspectorControls>
	);
};

export default CardCollectionsInspectorControls;
