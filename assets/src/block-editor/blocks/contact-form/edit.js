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
import { InnerBlocks } from '@wordpress/block-editor';
import { withSelect, withDispatch } from '@wordpress/data';
import { compose } from '@wordpress/compose';

/**
 * Internal dependencies
 */
import { name } from './block.json';
import genericAttributesSetter from '../../utils/generic-attributes-setter';
import './editor.css';
import ContactFormContext from './contact-form-context';
import FormInspectorControls from './components/inspector-controls';
import getConfig from '../../utils/get-config';

const ALLOWED_BLOCKS = [
	'material/name-input-field',
	'material/email-input-field',
	'material/website-input-field',
	'material/short-text-input-field',
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
			label: __( 'Send', 'material-design' ),
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
		createWarningNotice,
		formNotices,
		insertedForms,
	} = props;

	if ( ! getConfig( 'allow_contact_form_block' ) ) {
		return (
			<div>
				{ __(
					'Only administrators or editor with the manage options capability can use this block',
					'material-design'
				) }
			</div>
		);
	}

	// Display preview if available.
	if ( preview ) {
		return (
			<img
				src={ getConfig( 'contact_form_preview' ) }
				alt={ __( 'Contact Form Preview', 'material-design' ) }
			/>
		);
	}

	const setter = genericAttributesSetter( setAttributes );
	const displayNotice = 1 < insertedForms && 0 === formNotices.length;

	if ( displayNotice ) {
		createWarningNotice(
			__( 'Only one contact form is supported per page', 'material-design' )
		);
	}

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

export default compose( [
	withSelect( select => {
		const insertedBlocks = select( 'core/block-editor' ).getBlocks();
		const insertedForms = insertedBlocks.filter( block => block.name === name );
		const pageNotices = select( 'core/notices' ).getNotices();

		return {
			insertedForms: insertedForms.length,
			formNotices: pageNotices.filter(
				notice =>
					notice.content ===
					__( 'Only one contact form is supported per page', 'material-design' )
			),
		};
	} ),
	withDispatch( dispatch => ( {
		createWarningNotice: dispatch( 'core/notices' ).createWarningNotice,
	} ) ),
] )( Edit );
