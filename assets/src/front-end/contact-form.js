/* global grecaptcha, jQuery */

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
	document.getElementById( 'mtbContactFormErrorMsgContainer' ).style.display =
		'block';
	initReCaptchaToken();
};

/**
 * Initialize contact form.
 */
export const initContactForm = () => {
	const form = document.getElementById( 'mtbContactForm' );
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
		const ajaxData = {};
		ajaxData.token = form.querySelector( '[name=mtb_token]' ).value;

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
				ajaxData[ name ] = value;
			}
		}

		ajaxData.contact_fields = JSON.stringify( contactFields );

		const jxhr = jQuery.ajax( {
			url: getConfig( 'ajax_url' ),
			dataType: 'json',
			type: 'POST',
			data: ajaxData,
		} );

		jxhr.done( data => {
			if ( data.success === true ) {
				form.reset();
				form.style.display = 'none';
				document.getElementById(
					'mtbContactFormSuccessMsgContainer'
				).style.display = 'block';
				initReCaptchaToken();
			} else {
				handleAjaxFormSubmissionError( form );
			}
		} );

		jxhr.fail( () => {
			handleAjaxFormSubmissionError( form );
		} );

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
	const form = document.getElementById( 'mtbContactForm' );

	if ( ! form ) {
		return;
	}

	const tokenField = form.querySelector( '[name=mtb_token]' );

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
