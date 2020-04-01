/**
 * External dependencies
 */
import classNames from 'classnames';

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
import { useState } from '@wordpress/element';

/**
 * Internal dependencies
 */
import ImageRadioControl from '../image-radio-control';
import { GridIcon, ListIcon, MasonryIcon } from './style-icons/index';
import './style.css';

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

const GUTTER_DEVICES = [
	{
		name: 'desktop',
		icon: 'computer',
	},
	{
		name: 'mobile',
		icon: 'smartphone',
	},
	{
		name: 'tablet',
		icon: 'tablet',
	},
];

const CardStylesPanel = ( {
	style,
	columns,
	allowIndividualStyleOverride = false,
	showAllowIndividualStyleOverride = false,
	showColumns = true,
	minColumns = 2,
	maxColumns = 4,
	contentLayout,
	showContentLayout = true,
	gutter,
	showGutter = false,
	roundedCorners,
	showRoundedCorners = false,
	minRoundedCornersRadius = 0,
	maxRoundedCornersRadius = 24,
	outlined,
	showOutlined = true,
	setter,
} ) => {
	const [ gutterDevice, setGutterDevice ] = useState( 'desktop' );
	// Set the gutter for selected device.

	const setGutter = setter( 'gutter', newGutter => {
		return { ...gutter, ...{ [ gutterDevice ]: newGutter } };
	} );

	return (
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
					{ showAllowIndividualStyleOverride && (
						<ToggleControl
							label={ __(
								'Allow individual card override',
								'material-theme-builder'
							) }
							checked={ allowIndividualStyleOverride }
							onChange={ setter( 'allowIndividualStyleOverride' ) }
						/>
					) }
					{ ! allowIndividualStyleOverride && showContentLayout && (
						<RadioControl
							label={ __( 'Content layout', 'material-theme-builder' ) }
							selected={ contentLayout }
							options={ CONTENT_LAYOUTS }
							onChange={ setter( 'contentLayout' ) }
						/>
					) }
				</>
			) }
			{ ! allowIndividualStyleOverride && showRoundedCorners && (
				<RangeControl
					label={ __( 'Rounded Corners', 'material-theme-builder' ) }
					value={ roundedCorners }
					onChange={ setter( 'roundedCorners' ) }
					min={ minRoundedCornersRadius }
					max={ maxRoundedCornersRadius }
				/>
			) }
			{ ! allowIndividualStyleOverride && showOutlined && (
				<ToggleControl
					label={ __( 'Outlined', 'material-theme-builder' ) }
					checked={ outlined }
					onChange={ setter( 'outlined' ) }
				/>
			) }
			{ showGutter && (
				<RangeControl
					label={
						<>
							{ __( 'Gutter', 'material-theme-builder' ) }
							<div className="components-base-control__label-actions">
								{ GUTTER_DEVICES.map( device => (
									<button
										key={ device.name }
										className={ classNames( '', {
											'is-selected': device.name === gutterDevice,
										} ) }
										onClick={ () => setGutterDevice( device.name ) }
									>
										<i className="material-icons">{ device.icon }</i>
									</button>
								) ) }
							</div>
						</>
					}
					value={ gutter[ gutterDevice ] || 0 }
					onChange={ value => setGutter( value ) }
					min={ 0 }
					max={ 24 }
				/>
			) }
		</PanelBody>
	);
};

export default CardStylesPanel;
