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
				? __( 'Content Settings', 'material-design' )
				: sprintf( __( 'Card #%d Content Settings' ), cardIndex + 1 )
		}
		initialOpen={ isPanelInitialOpened }
	>
		<ToggleControl
			label={ __( 'Show title', 'material-design' ) }
			checked={ displayTitle }
			onChange={ value => {
				setter( 'displayTitle', value, cardIndex );
				setter( 'displaySecondaryText', value, cardIndex );
			} }
		/>
		{ displayTitle && (
			<ToggleControl
				label={ __( 'Show secondary text', 'material-design' ) }
				checked={ displaySecondaryText }
				onChange={ value => setter( 'displaySecondaryText', value, cardIndex ) }
			/>
		) }
		<ToggleControl
			label={ __( 'Show image', 'material-design' ) }
			checked={ displayImage }
			onChange={ value => setter( 'displayImage', value, cardIndex ) }
		/>
		{ cardLayoutStyle === 'vertical' && (
			<ToggleControl
				label={ __( 'Show supporting text', 'material-design' ) }
				checked={ displaySupportingText }
				onChange={ value =>
					setter( 'displaySupportingText', value, cardIndex )
				}
			/>
		) }
		<ToggleControl
			label={ __( 'Show actions', 'material-design' ) }
			checked={ displayActions }
			onChange={ value => setter( 'displayActions', value, cardIndex ) }
		/>
		{ displayActions && (
			<ToggleControl
				label={ __( 'Show secondary action button', 'material-design' ) }
				checked={ displaySecondaryActionButton }
				onChange={ value =>
					setter( 'displaySecondaryActionButton', value, cardIndex )
				}
			/>
		) }
	</PanelBody>
);

export default InspectorControlsStylePanel;
