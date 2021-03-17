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
import GlobalShapeSize from '../global-shape-size';
import { GridIcon, ListIcon, MasonryIcon } from './style-icons/index';
import { name as CardCollectionBlockName } from '../../blocks/cards-collection/index';
import getConfig from '../../utils/get-config';
import AttributeWithDevices from '../attribute-with-devices';

const CARD_STYLES = [
	{
		label: __( 'Masonry', 'material-design' ),
		value: 'masonry',
		src: MasonryIcon,
	},
	{
		label: __( 'List', 'material-design' ),
		value: 'list',
		src: ListIcon,
	},
	{
		label: __( 'Grid', 'material-design' ),
		value: 'grid',
		src: GridIcon,
	},
];

const CONTENT_LAYOUTS = [
	{
		label: __( 'Text above media', 'material-design' ),
		value: 'text-above-media',
	},
	{
		label: __( 'Text over media', 'material-design' ),
		value: 'text-over-media',
	},
	{
		label: __( 'Text under media', 'material-design' ),
		value: 'text-under-media',
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
	cornerRadius,
	showCornerRadius = false,
	minRoundedCornersRadius = 0,
	maxRoundedCornersRadius = 24,
	outlined,
	showOutlined = true,
	setter,
} ) => (
	<PanelBody title={ __( 'Styles', 'material-design' ) } initialOpen={ true }>
		<ImageRadioControl
			selected={ style }
			options={ CARD_STYLES }
			onChange={ setter( 'style' ) }
		/>

		{ ( style === 'masonry' || style === 'grid' ) && showColumns && (
			<>
				<RangeControl
					label={ __( 'Columns', 'material-design' ) }
					value={ columns }
					onChange={ setter( 'columns' ) }
					min={ minColumns }
					max={ maxColumns }
				/>
				{ showAllowIndividualStyleOverride && (
					<ToggleControl
						label={ __( 'Allow individual card override', 'material-design' ) }
						checked={ allowIndividualStyleOverride }
						onChange={ setter( 'allowIndividualStyleOverride' ) }
					/>
				) }
				{ ! allowIndividualStyleOverride && showContentLayout && (
					<RadioControl
						label={ __( 'Content layout', 'material-design' ) }
						selected={ contentLayout }
						options={ CONTENT_LAYOUTS }
						onChange={ setter( 'contentLayout' ) }
					/>
				) }
			</>
		) }

		{ ! allowIndividualStyleOverride && showCornerRadius && (
			<div className="components-base-control">
				<label className="components-base-control__label" htmlFor="shape-size">
					{ __( 'Corner Styles', 'material-design' ) }
				</label>

				<div>
					{ __(
						'Overrides will only apply to these cards. Change Cards corner styles in ',
						'material-design'
					) }
					<a
						href={ getConfig( 'customizerUrls' ).shape }
						target="_blank"
						rel="noreferrer noopener"
					>
						{ __( 'Material Design Options', 'material-design' ) }
					</a>
					{ __( ' to update all cards.', 'material-design' ) }
				</div>
				<GlobalShapeSize
					value={ cornerRadius }
					onChange={ setter( 'cornerRadius' ) }
					min={ minRoundedCornersRadius }
					max={ maxRoundedCornersRadius }
					blockName={ CardCollectionBlockName }
				/>
			</div>
		) }

		{ ! allowIndividualStyleOverride && showOutlined && (
			<ToggleControl
				label={ __( 'Outlined', 'material-design' ) }
				checked={ outlined }
				onChange={ setter( 'outlined' ) }
			/>
		) }
		{ showGutter && (
			<AttributeWithDevices
				label={ __( 'Gutter', 'material-design' ) }
				value={ gutter }
				onChange={ setter( 'gutter' ) }
				min={ 1 }
				max={ 24 }
			/>
		) }
	</PanelBody>
);

export default CardStylesPanel;
