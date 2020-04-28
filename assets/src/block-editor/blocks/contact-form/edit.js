/* global mtb */

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { InnerBlocks, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl, ToggleControl } from '@wordpress/components';

/**
 * Internal dependencies
 */
import genericAttributesSetter from '../../utils/generic-attributes-setter';
import RecaptchaInspectorControlsPanel from './components/recaptcha-inspector-controls-panel';
import './editor.css';
import ContactFormContext from './contact-form-context';

const ALLOWED_BLOCKS = [
	'material/name-input-field',
	'material/email-input-field',
	'material/website-input-field',
	'material/telephone-input-field',
	'core/paragraph',
	'material/button',
];

const TEMPLATES = [
	[ 'material/name-input-field' ],
	[ 'material/email-input-field' ],
	[ 'material/website-input-field' ],
	[ 'material/message-input-field' ],
	[
		'material/button',
		{
			label: __( 'Submit', 'material-theme-builder' ),
			style: 'unelevated',
			isSubmit: true,
		},
	],
];

/**
 * Contact Form Edit component.
 *
 * @param {Object} props - Component props.
 * @param {string} props.className - Component classes.
 *
 * @return {Function} Function returning the HTML markup for the component.
 */
const Edit = props => {
	const {
		attributes: { emailTo, subject, confirmationMessage, outlined, fullWidth },
		className,
		setAttributes,
	} = props;

	if ( ! mtb.allow_contact_form_block ) {
		return (
			<div>
				{ __(
					'Only administrators or editor with the manage options capabilities can use this block',
					'material-theme-builder'
				) }
			</div>
		);
	}

	const setter = genericAttributesSetter( setAttributes );

	return (
		<ContactFormContext.Provider
			value={ {
				parentOutlined: outlined,
				parentFullWidth: fullWidth,
			} }
		>
			<InspectorControls>
				<PanelBody
					title={ __( 'Email Feedback Settings', 'material-theme-builder' ) }
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
			<div className={ className }>
				<InnerBlocks template={ TEMPLATES } allowedBlocks={ ALLOWED_BLOCKS } />
			</div>
		</ContactFormContext.Provider>
	);
};

export default Edit;
