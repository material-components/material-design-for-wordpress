/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { InnerBlocks, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl } from '@wordpress/components';

/**
 * Internal dependencies
 */
import genericAttributesSetter from '../../utils/generic-attributes-setter';
import RecaptchaInspectorControlsPanel from './components/recaptcha-inspector-controls-panel';
import './editor.css';

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
		attributes: { emailTo, subject },
		className,
		setAttributes,
	} = props;
	const setter = genericAttributesSetter( setAttributes );
	return (
		<>
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
				</PanelBody>
				<RecaptchaInspectorControlsPanel />
			</InspectorControls>
			<div className={ className }>
				<InnerBlocks template={ TEMPLATES } allowedBlocks={ ALLOWED_BLOCKS } />
			</div>
		</>
	);
};

export default Edit;
