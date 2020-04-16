/* global grecaptcha, mtb, jQuery */

/**
 * External dependencies
 */
import { MDCTextField } from '@material/textfield';

const $ = jQuery.noConflict( true );

/**
 *
 * @param {*} form
 */
export const initContactForm = () => {
	const form = document.getElementById( 'mtb-contactForm' );

	if ( ! form ) {
		return;
	}

	const fields = [];

	for ( const field of form.querySelectorAll( '.mdc-text-field' ) ) {
		fields.push( new MDCTextField( field ) );
	}

	initReCaptchaToken();

	form.addEventListener( 'submit', event => {
		event.preventDefault();

		let isValid = true;
		fields.forEach( field => {
			if ( field.required && ! field.valid ) {
				isValid = false;
				// Blur the field so error styles are rendered.
				field.foundation_.deactivateFocus();
			}
		} );

		if ( ! isValid ) {
			event.preventDefault();
			return;
		}

		const data = {
			token: form.querySelector( '[name=mtb_token]' ).value,
			contactFields: {},
		};

		for ( const field of form.querySelectorAll( 'input, textarea' ) ) {
			const name = field.name;
			const label = field.dataset.label;
			const value = field.value;

			if ( field.type !== 'hidden' ) {
				data.contactFields[ field.id ] = {
					name,
					label,
					value,
				};
			} else {
				data[ name ] = value;
			}
		}

		$.ajax( {
			type: 'POST',
			url: mtb.ajax_url,
			data,
			dataType: 'json',
			success( response ) {
				// console.log( response );
				if ( response.success === true ) {
					form[ 0 ].reset();
					form.hide();
					$( '#contactFormMsg' ).show();
					initReCaptchaToken();
				} else {
					// TODO: Refactor to show message in page.
					// eslint-disable-next-line no-alert,no-undef
					alert( 'An error occurred' );
				}
			},
		} );
	} );

	$( '#contactFormMsg' ).on( 'click', function() {
		$( '#contactFormMsg' ).hide();
		form.show();
	} );
};

/**
 * Initialize reCAPTCHA token.
 *
 * @param field
 */
export const initReCaptchaToken = () => {
	const form = document.getElementById( 'mtb-contactForm' );

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
