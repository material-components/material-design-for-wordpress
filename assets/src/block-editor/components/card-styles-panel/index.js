/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	PanelBody,
	RangeControl,
	RadioControl,
	ToggleControl,
} from '@wordpress/components';

/**
 * Internal dependencies
 */
import ImageRadioControl from '../image-radio-control';
import { GridIcon, ListIcon, MasonryIcon } from './icons/index';

const CARD_STYLES = [
	{
		label: __( 'Masonry', 'material-theme-builder' ),
		value: 'masonry',
		src: MasonryIcon,
	},
	{
		label: __( 'List', 'material-theme-builder' ),
		value: 'list',
		src: ListIcon,
	},
	{
		label: __( 'Grid', 'material-theme-builder' ),
		value: 'grid',
		src: GridIcon,
	},
];

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

const CardStylesPanel = ( {
	style,
	columns,
	showColumns = true,
	minColumns = 2,
	maxColumns = 4,
	contentLayout,
	showContentLayout = true,
	roundedCorners,
	showRoundedCorners = false,
	minRoundedCornersRadius = 0,
	maxRoundedCornersRadius = 24,
	outlined,
	showOutlined = true,
	setter,
} ) => (
	<PanelBody
		title={ __( 'Styles', 'material-theme-builder' ) }
		initialOpen={ true }
	>
		<ImageRadioControl
			selected={ style }
			options={ CARD_STYLES }
			onChange={ setter( 'style' ) }
		/>

		{ ( style === 'masonry' || style === 'grid' ) && showColumns && (
			<>
				<RangeControl
					label={ __( 'Columns', 'material-theme-builder' ) }
					value={ columns }
					onChange={ setter( 'columns' ) }
					min={ minColumns }
					max={ maxColumns }
				/>
				{ showContentLayout && (
					<RadioControl
						label={ __( 'Content layout', 'material-theme-builder' ) }
						selected={ contentLayout }
						options={ CONTENT_LAYOUTS }
						onChange={ setter( 'contentLayout' ) }
					/>
				) }
			</>
		) }
		{ showRoundedCorners && (
			<RangeControl
				label={ __( 'Rounded Corners', 'material-theme-builder' ) }
				value={ roundedCorners }
				onChange={ setter( 'roundedCorners' ) }
				min={ minRoundedCornersRadius }
				max={ maxRoundedCornersRadius }
			/>
		) }
		{ showOutlined && (
			<ToggleControl
				label={ __( 'Outlined', 'material-theme-builder' ) }
				checked={ outlined }
				onChange={ setter( 'outlined' ) }
			/>
		) }
	</PanelBody>
);

export default CardStylesPanel;
