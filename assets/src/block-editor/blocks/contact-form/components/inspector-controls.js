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
import { PanelBody, TextControl, ToggleControl } from '@wordpress/components';

/**
 * Internal dependencies
 */
import RecaptchaInspectorControlsPanel from './recaptcha-inspector-controls-panel';

const FormInspectorControls = props => {
	const {
		attributes: { emailTo, subject, confirmationMessage, outlined },
		setter,
	} = props;

	return (
		<InspectorControls>
			<PanelBody
				title={ __( 'Form Email Settings', 'material-design' ) }
				initialOpen={ true }
			>
				<TextControl
					label={ __( 'Email address', 'material-design' ) }
					value={ emailTo }
					onChange={ setter( 'emailTo' ) }
				/>
				<TextControl
					label={ __( 'Subject', 'material-design' ) }
					value={ subject }
					onChange={ setter( 'subject' ) }
				/>
				<TextControl
					label={ __( 'Submission confirmation message', 'material-design' ) }
					value={ confirmationMessage }
					onChange={ setter( 'confirmationMessage' ) }
				/>
			</PanelBody>
			<PanelBody
				title={ __( 'Style', 'material-design' ) }
				initialOpen={ true }
			>
				<ToggleControl
					label={ __( 'Outlined', 'material-design' ) }
					checked={ outlined }
					onChange={ setter( 'outlined' ) }
				/>
			</PanelBody>
			<RecaptchaInspectorControlsPanel />
		</InspectorControls>
	);
};

export default FormInspectorControls;
