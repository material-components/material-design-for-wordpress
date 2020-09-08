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
				title={ __( 'Form Email Settings', 'material-theme-builder' ) }
				initialOpen={ true }
			>
				<TextControl
					label={ __( 'Email address', 'material-theme-builder' ) }
					value={ emailTo }
					onChange={ setter( 'emailTo' ) }
				/>
				<TextControl
					label={ __( 'Subject', 'material-theme-builder' ) }
					value={ subject }
					onChange={ setter( 'subject' ) }
				/>
				<TextControl
					label={ __(
						'Submission confirmation message',
						'material-theme-builder'
					) }
					value={ confirmationMessage }
					onChange={ setter( 'confirmationMessage' ) }
				/>
			</PanelBody>
			<PanelBody
				title={ __( 'Style', 'material-theme-builder' ) }
				initialOpen={ true }
			>
				<ToggleControl
					label={ __( 'Outlined', 'material-theme-builder' ) }
					checked={ outlined }
					onChange={ setter( 'outlined' ) }
				/>
			</PanelBody>
			<RecaptchaInspectorControlsPanel />
		</InspectorControls>
	);
};

export default FormInspectorControls;
