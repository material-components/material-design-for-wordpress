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
import genericAttributesSetter from '../../../../../../plugin/assets/src/block-editor/utils/generic-attributes-setter';
import { PanelBody, ToggleControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * @param {Object}   props
 * @param {Function} props.setAttributes
 * @param {Object}   props.attributes
 * @param {boolean}  props.attributes.showExcerpt
 * @param {boolean}  props.attributes.showDate
 * @param {boolean}  props.attributes.showAuthor
 * @param {boolean}  props.attributes.showComments
 */
const InspectControls = ( {
	setAttributes,
	attributes: { showExcerpt, showDate, showAuthor, showComments },
} ) => {
	const setter = genericAttributesSetter( setAttributes );
	return (
		<InspectorControls>
			<PanelBody
				title={ __(
					'Show / Hide post information',
					'material-design'
				) }
				initialOpen={ true }
			>
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
		</InspectorControls>
	);
};

export default InspectControls;
