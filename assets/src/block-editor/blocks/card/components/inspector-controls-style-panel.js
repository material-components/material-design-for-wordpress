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
import { __, sprintf } from '@wordpress/i18n';
import { PanelBody, RadioControl, ToggleControl } from '@wordpress/components';

/**
 * Internal dependencies
 */
import GlobalShapeSize from '../../../components/global-shape-size';
import { name as CardBlockName } from '../index';
import getConfig from '../../../utils/get-config';

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
				? __( 'Style Settings', 'material-design' )
				: sprintf( __( 'Card #%d Style Settings' ), cardIndex + 1 )
		}
		initialOpen={ isPanelInitialOpened }
	>
		{ cardLayoutStyle === 'vertical' && (
			<RadioControl
				label={ __( 'Content layout', 'material-design' ) }
				selected={ contentLayout }
				options={ CONTENT_LAYOUTS }
				onChange={ value => setter( 'contentLayout', value, cardIndex ) }
			/>
		) }

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
				onChange={ value => setter( 'cornerRadius', value, cardIndex ) }
				min={ MIN_CARD_ROUND_CORNERS }
				max={ MAX_CARD_ROUND_CORNERS }
				blockName={ CardBlockName }
			/>
		</div>

		<ToggleControl
			label={ __( 'Outlined', 'material-design' ) }
			checked={ outlined }
			onChange={ value => setter( 'outlined', value, cardIndex ) }
		/>
	</PanelBody>
);

export default InspectorControlsStylePanel;
