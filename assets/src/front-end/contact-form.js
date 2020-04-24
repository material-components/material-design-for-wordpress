/* global grecaptcha, mtb, fetch, FormData */
/* istanbul ignore file */

/**
 * External dependencies
 */
import { MDCTextField } from '@material/textfield';

/**
 * Initialize contact form.
 */
export const initContactForm = () => {
	const form = document.getElementById( 'mtbContactForm' );
	if ( ! form ) {
		return false;
	}

	const contactFormMessage = document.getElementById(
		'mtbContactFormMsgContainer'
	);

	for ( const field of form.querySelectorAll( '.mdc-text-field' ) ) {
		new MDCTextField( field );
	}

	initReCaptchaToken();

	form.addEventListener( 'submit', event => {
		event.preventDefault();

		const contactFields = {};
		const formData = new FormData();
		formData.append( 'token', form.querySelector( '[name=mtb_token]' ).value );

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

		fetch( mtb.ajax_url, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
			},
			body: new URLSearchParams( formData ),
		} )
			.then( response => response.json() )
			.then( data => {
				if ( data.success === true ) {
					form.reset();
					form.style.display = 'none';
					contactFormMessage.style.display = 'block';
					initReCaptchaToken();
				} else {
					// TODO: Refactor to show message in page.
					// eslint-disable-next-line no-alert,no-undef
					alert( 'An error occurred' );
				}
			} )
			.catch( () => {
				// TODO: Refactor to show message in page.
				// eslint-disable-next-line no-alert,no-undef
				alert( 'An error occurred' );
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

	contactFormMessage.addEventListener( 'click', () => {
		contactFormMessage.style.display = 'none';
		form.style.display = 'block';
	} );
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
		mtb &&
		mtb.hasOwnProperty( 'recaptcha_site_key' ) &&
		mtb.recaptcha_site_key &&
		tokenField
	) {
		grecaptcha.ready( function() {
			grecaptcha
				.execute( mtb.recaptcha_site_key, { action: 'contact' } )
				.then( function( token ) {
					tokenField.setAttribute( 'value', token );
				} );
		} );
	}
};
