/* global mtb */

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { InnerBlocks } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import genericAttributesSetter from '../../utils/generic-attributes-setter';
import './editor.css';
import ContactFormContext from './contact-form-context';
import FormInspectorControls from './components/inspector-controls';

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
		attributes: { outlined, fullWidth, preview },
		className,
		setAttributes,
	} = props;

	if ( ! mtb.allow_contact_form_block ) {
		return (
			<div>
				{ __(
					'Only administrators or editor with the manage options capability can use this block',
					'material-theme-builder'
				) }
			</div>
		);
	}

	// Display preview if available.
	if ( preview ) {
		return (
			<img
				src={ mtb.contact_form_preview }
				alt={ __( 'Contact Form Preview', 'material-theme-builder' ) }
			/>
		);
	}

	const setter = genericAttributesSetter( setAttributes );

	return (
		<ContactFormContext.Provider
			value={ {
				parentOutlined: outlined,
				parentFullWidth: fullWidth,
				parentSetter: setter,
			} }
		>
			<FormInspectorControls setter={ setter } { ...props } />
			<div className={ className }>
				<InnerBlocks template={ TEMPLATES } allowedBlocks={ ALLOWED_BLOCKS } />
			</div>
		</ContactFormContext.Provider>
	);
};

export default Edit;
