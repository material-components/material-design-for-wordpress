/**
 * WordPress dependencies
 */
import { __, sprintf } from '@wordpress/i18n';
import { PanelBody, RadioControl, ToggleControl } from '@wordpress/components';

/**
 * Internal dependencies
 */
import GlobalShapeSize from '../../../components/global-shape-size';
import { name as CardBlockName } from '../index';

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
 * Inspector Controls Content Panel component.
 *
 * @param {Object} props - Component props.
 * @param {string} props.cardLayoutStyle - Card style layout.
 * @param {number} props.cornerRadius - Card corner radius.
 * @param {boolean} props.outlined - Whether or not the card has an outlined style.
 * @param {boolean} props.isSingleCard - Whether or not it is a single card or the card is part of a collection
 * @param {Function} props.setter - Function to set the block attributes value.
 * @param {number} props.cardIndex - Card index.
 * @param {boolean} props.isPanelInitialOpened - Whether or not the control panel is initially opened.
 *
 * @return {Function} Function returning the HTML markup for the component.
 */
const InspectorControlsStylePanel = ( {
	cardLayoutStyle = 'vertical',
	contentLayout,
	cornerRadius,
	outlined,
	isSingleCard,
	setter,
	cardIndex,
	isPanelInitialOpened = true,
} ) => (
	<PanelBody
		title={
			isSingleCard
				? __( 'Style Settings', 'material-theme-builder' )
				: sprintf( __( 'Card #%d Style Settings' ), cardIndex + 1 )
		}
		initialOpen={ isPanelInitialOpened }
	>
		{ cardLayoutStyle === 'vertical' && (
			<RadioControl
				label={ __( 'Content layout', 'material-theme-builder' ) }
				selected={ contentLayout }
				options={ CONTENT_LAYOUTS }
				onChange={ value => setter( 'contentLayout', value, cardIndex ) }
			/>
		) }
		<GlobalShapeSize
			label={ __( 'Rounded corners', 'material-theme-builder' ) }
			value={ cornerRadius }
			onChange={ value => setter( 'cornerRadius', value, cardIndex ) }
			min={ MIN_CARD_ROUND_CORNERS }
			max={ MAX_CARD_ROUND_CORNERS }
			blockName={ CardBlockName }
		/>
		<ToggleControl
			label={ __( 'Outlined', 'material-theme-builder' ) }
			checked={ outlined }
			onChange={ value => setter( 'outlined', value, cardIndex ) }
		/>
	</PanelBody>
);

export default InspectorControlsStylePanel;
