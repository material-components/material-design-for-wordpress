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
 * External dependencies
 */

/**
 * WordPress dependencies
 */
import { InspectorControls } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import genericAttributesSetter from '../../utils/generic-attributes-setter';
import { PanelBody, RangeControl, ToggleControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import ElevationStyleControl from './elevationControl';

const MIN_POST_CONTENT_LENGTH = 10;
const MAX_POST_CONTENT_LENGTH = 30;

/**
 * @param {Object}   props
 * @param {Function} props.setAttributes
 * @param {Object}   props.attributes
 * @param {boolean}  props.attributes.showFeaturedImage
 * @param {boolean}  props.attributes.showTitle
 * @param {boolean}  props.attributes.showExcerpt
 * @param {boolean}  props.attributes.showDate
 * @param {boolean}  props.attributes.showAuthor
 * @param {boolean}  props.attributes.showComments
 * @param {number}   props.attributes.postContentLength
 * @param {string}   props.attributes.cardStyle
 */
const InspectControls = ( {
	setAttributes,
	attributes: {
		showFeaturedImage,
		showTitle,
		showExcerpt,
		showDate,
		showAuthor,
		showComments,
		postContentLength,
		cardStyle,
	},
} ) => {
	const setter = genericAttributesSetter( setAttributes );
	return (
		<InspectorControls>
			<PanelBody
				title={ __(
					'Show / Hide post information',
					'material-design'
				) }
				description={ __(
					'Choose which information to show in the card.',
					'material-design'
				) }
				initialOpen={ true }
			>
				<ToggleControl
					label={ __( 'Featured Image', 'material-design' ) }
					checked={ showFeaturedImage }
					onChange={ setter( 'showFeaturedImage' ) }
				/>
				<ToggleControl
					label={ __( 'Post title', 'material-design' ) }
					checked={ showTitle }
					onChange={ setter( 'showTitle' ) }
				/>
				<ToggleControl
					label={ __( 'Post date', 'material-design' ) }
					checked={ showDate }
					onChange={ setter( 'showDate' ) }
				/>
				<ToggleControl
					label={ __( 'Post excerpt', 'material-design' ) }
					checked={ showExcerpt }
					onChange={ setter( 'showExcerpt' ) }
				/>
				{ showExcerpt && (
					<RangeControl
						label={ __(
							'Max number of words in post excerpt',
							'material-design'
						) }
						value={ postContentLength }
						onChange={ setter( 'postContentLength' ) }
						min={ MIN_POST_CONTENT_LENGTH }
						max={ MAX_POST_CONTENT_LENGTH }
					/>
				) }
				<ToggleControl
					label={ __( 'Author', 'material-design' ) }
					checked={ showAuthor }
					onChange={ setter( 'showAuthor' ) }
				/>
				<ToggleControl
					label={ __( 'Comments', 'material-design' ) }
					checked={ showComments }
					onChange={ setter( 'showComments' ) }
				/>
			</PanelBody>
			<PanelBody
				title={ __( 'Style Settings', 'material-design' ) }
				description={ __(
					'Card style - only applies to current block / template.',
					'material-design'
				) }
				initialOpen={ true }
			>
				<ElevationStyleControl
					onChange={ setter( 'cardStyle' ) }
					selected={ cardStyle }
				/>
			</PanelBody>
		</InspectorControls>
	);
};

export default InspectControls;
