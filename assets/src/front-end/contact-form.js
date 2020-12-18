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

/* global grecaptcha, XMLHttpRequest, FormData */

/**
 * External dependencies
 */
import { MDCTextField } from '@material/textfield';

/**
 * Internal dependencies
 */
import getConfig from '../block-editor/utils/get-config';

/**
 * Handle the ajax form submission error.
 *
 * @param {Object} form Contact form.
 */
const handleAjaxFormSubmissionError = form => {
	form.reset();
	form.style.display = 'none';
	document.getElementById(
		'materialDesignContactFormErrorMsgContainer'
	).style.display = 'block';
	initReCaptchaToken();
};

/**
 * Initialize contact form.
 */
export const initContactForm = () => {
	const form = document.getElementById( 'materialDesignContactForm' );
	if ( ! form ) {
		return false;
	}

	for ( const field of form.querySelectorAll( '.mdc-text-field' ) ) {
		new MDCTextField( field );
	}

	initReCaptchaToken();

	form.addEventListener( 'submit', event => {
		event.preventDefault();

		const contactFields = {};
		const formData = new FormData();
		formData.append(
			'token',
			form.querySelector( '[name=material_design_token]' ).value
		);

		for ( const field of form.querySelectorAll( 'input, textarea' ) ) {
			const name = field.name;
			const label = field.dataset.label;
			const value = field.value;

			if ( field.type !== 'hidden' && field.type !== 'submit' ) {
				contactFields[ field.id ] = {
					name,
					label,
					value,
				};
			} else {
				formData.append( name, value );
			}
		}
		formData.append( 'contact_fields', JSON.stringify( contactFields ) );

		const xhr = new XMLHttpRequest();
		xhr.open( 'POST', getConfig( 'ajax_url' ) );
		xhr.send( formData );

		xhr.onreadystatechange = () => {
			if ( xhr.readyState === XMLHttpRequest.DONE ) {
				const status = xhr.status;
				if ( status === 0 || ( status >= 200 && status < 400 ) ) {
					const data = JSON.parse( xhr.responseText );
					if ( data.success === true ) {
						form.reset();
						form.style.display = 'none';
						document.getElementById(
							'materialDesignContactFormSuccessMsgContainer'
						).style.display = 'block';
						initReCaptchaToken();
					} else {
						handleAjaxFormSubmissionError( form );
					}
				} else {
					handleAjaxFormSubmissionError( form );
				}
			}
		};
		return false;
	} );

	for ( const field of form.querySelectorAll( 'input, textarea' ) ) {
		field.addEventListener(
			'invalid',
			() => {
				field
					.closest( '.mdc-text-field' )
					.classList.add( 'mdc-text-field--invalid' );
			},
			false
		);
	}
};

/**
 * Initialize reCAPTCHA token.
 */
export const initReCaptchaToken = () => {
	const form = document.getElementById( 'materialDesignContactForm' );

	if ( ! form ) {
		return;
	}

	const tokenField = form.querySelector( '[name=material_design_token]' );

	if (
		typeof grecaptcha !== 'undefined' &&
		grecaptcha.hasOwnProperty( 'ready' ) &&
		getConfig( 'recaptcha_site_key' ) &&
		tokenField
	) {
		grecaptcha.ready( function() {
			grecaptcha
				.execute( getConfig( 'recaptcha_site_key' ), { action: 'contact' } )
				.then( function( token ) {
					tokenField.setAttribute( 'value', token );
				} );
		} );
	}
};
