/**
 * External dependencies
 */
import fs from 'fs';
import path from 'path';
import '@testing-library/jest-dom/extend-expect';
import { waitFor } from '@testing-library/dom';
import MutationObserver from '@sheerun/mutationobserver-shim';

/**
 * Internal dependencies
 */
import {
	initReCaptchaToken,
	initContactForm,
} from '../../../assets/src/front-end/contact-form';

jest.dontMock( 'fs' );

window.MutationObserver = MutationObserver;

/**
 * Render the contact form.
 */
const setup = () => {
	document.body.innerHTML = `<div id="content">${ fs.readFileSync(
		path.resolve( __dirname, './contact-form.html' ),
		'utf-8'
	) }</div>`;
};

/**
 * Retrieves FormData object from the mock.
 *
 * @param {Object} mock XHR mock object.
 */
const retrieveFormDataFromMock = mock => {
	const formDataInstance = mock.calls[ 0 ][ 0 ];
	const formDataAsObject = {};
	formDataInstance.forEach( ( value, key ) => {
		formDataAsObject[ key ] = value;
	} );
	return [ formDataInstance, formDataAsObject ];
};

/**
 * XMLHttpRequest mock.
 */
const mockXMLHttpRequest = () => {
	const mock = {
		open: jest.fn(),
		addEventListener: jest.fn(),
		setRequestHeader: jest.fn(),
		send: jest.fn(),
		getResponseHeader: jest.fn(),

		upload: {
			addEventListener: jest.fn(),
		},
		DONE: 4,
	};

	jest.spyOn( window, 'XMLHttpRequest' ).mockImplementation( () => mock );
	return mock;
};

describe( 'Front-end: Contact Form', () => {
	const tokenValue = 'CAPTCHA_TOKEN';
	const ready = jest.fn( fn => fn() );
	const execute = jest.fn( () => {
		return new Promise( resolve => {
			resolve( tokenValue );
		} );
	} );

	beforeAll( () => {
		global.mtb = {
			ajax_url: 'http://example.com/',
			recaptcha_site_key: 'SITE_KEY',
		};
		global.grecaptcha = {
			ready,
			execute,
		};
	} );

	beforeEach( () => {
		jest.clearAllMocks();
	} );

	describe( 'initContactForm', () => {
		it( 'returns false when the specific contact form does not exists', () => {
			document.body.innerHTML = `<div id="content">${ fs.readFileSync(
				path.resolve( __dirname, './invalid-contact-form.html' ),
				'utf-8'
			) }</div>`;

			const result = initContactForm();

			expect( result ).toStrictEqual( false );
		} );

		it( 'instantiates text fields as Material Design text fields', () => {
			setup();
			initContactForm();

			expect(
				document
					.querySelector( '.mdc-notched-outline' )
					.classList.contains( 'mdc-notched-outline--upgraded' )
			).toStrictEqual( true );
		} );

		it( 'calls successfully the ajax request and shows the success message when the form submission is successful', async () => {
			setup();
			document.getElementById( 'mtb-name-1' ).value = 'Test Name';
			document.getElementById( 'mtb-email-1' ).value = 'email@example.com';
			document.getElementById( 'mtb-website-1' ).value = 'http://example.com';
			document.getElementById( 'mtb-message-1' ).value = 'Test message';

			const xhr = mockXMLHttpRequest();
			initContactForm();

			document.querySelector( '.mdc-button' ).click();

			expect( xhr.send.mock.calls[ 0 ][ 0 ] ).not.toBeUndefined();
			const [ formDataInstance, formDataAsObject ] = retrieveFormDataFromMock(
				xhr.send.mock
			);

			expect( xhr.open ).toHaveBeenCalledWith( 'POST', global.mtb.ajax_url );
			expect( xhr.send ).toHaveBeenCalledWith( formDataInstance );

			expect( formDataAsObject ).toStrictEqual( {
				_wp_http_referer: '/3732-2/',
				action: 'mtb_submit_contact_form',
				contact_fields:
					'{"mtb-name-1":{"name":"mtb-name-1","label":"Name","value":"Test Name"},"mtb-email-1":{"name":"mtb-email-1","label":"Email","value":"email@example.com"},"mtb-website-1":{"name":"mtb-website-1","label":"Website","value":"http://example.com"},"mtb-message-1":{"name":"mtb-message-1","label":"Message","value":"Test message"}}',
				mtb_contact_form_nonce: '8d2ba7b1f1',
				mtb_token: 'token_here',
				token: 'token_here',
			} );

			xhr.readyState = XMLHttpRequest.DONE;
			xhr.status = 200;
			xhr.responseText = JSON.stringify( { success: true } );

			expect( xhr.onreadystatechange ).not.toBeUndefined();
			xhr.onreadystatechange.call();

			await waitFor( () => {
				expect(
					document.getElementById( 'mtbContactFormSuccessMsgContainer' ).style
						.display
				).toStrictEqual( 'block' );
			} );
		} );

		it( 'calls successfully the ajax request and shows the error message when the form submission is not successful', async () => {
			setup();
			document.getElementById( 'mtb-name-1' ).value = 'Test Name';
			document.getElementById( 'mtb-email-1' ).value = 'email@example.com';
			document.getElementById( 'mtb-website-1' ).value = 'http://example.com';
			document.getElementById( 'mtb-message-1' ).value = 'Test message';
			document.getElementsByName( '_wp_http_referer' )[ 0 ].value = '';

			const xhr = mockXMLHttpRequest();
			initContactForm();
			document.querySelector( '.mdc-button' ).click();

			expect( xhr.send.mock.calls[ 0 ][ 0 ] ).not.toBeUndefined();
			const [ formDataInstance, formDataAsObject ] = retrieveFormDataFromMock(
				xhr.send.mock
			);

			expect( xhr.open ).toHaveBeenCalledWith( 'POST', global.mtb.ajax_url );
			expect( xhr.send ).toHaveBeenCalledWith( formDataInstance );

			expect( formDataAsObject ).toStrictEqual( {
				_wp_http_referer: '',
				action: 'mtb_submit_contact_form',
				contact_fields:
					'{"mtb-name-1":{"name":"mtb-name-1","label":"Name","value":"Test Name"},"mtb-email-1":{"name":"mtb-email-1","label":"Email","value":"email@example.com"},"mtb-website-1":{"name":"mtb-website-1","label":"Website","value":"http://example.com"},"mtb-message-1":{"name":"mtb-message-1","label":"Message","value":"Test message"}}',
				mtb_contact_form_nonce: '8d2ba7b1f1',
				mtb_token: 'token_here',
				token: 'token_here',
			} );

			xhr.readyState = XMLHttpRequest.DONE;
			xhr.status = 200;

			// Simulate a valid request that failed.
			xhr.responseText = JSON.stringify( { success: false } );

			expect( xhr.onreadystatechange ).not.toBeUndefined();
			xhr.onreadystatechange.call();

			await waitFor( () => {
				expect(
					document.getElementById( 'mtbContactFormErrorMsgContainer' ).style
						.display
				).toStrictEqual( 'block' );
			} );
		} );

		it( 'calls the ajax request with failure and shows the error message when the form submission is not successful', async () => {
			setup();
			document.getElementById( 'mtb-name-1' ).value = 'Test Name';
			document.getElementById( 'mtb-email-1' ).value = 'email@example.com';
			document.getElementById( 'mtb-website-1' ).value = 'http://example.com';
			document.getElementById( 'mtb-message-1' ).value = 'Test message';
			document.getElementsByName( 'action' )[ 0 ].value = '';

			const xhr = mockXMLHttpRequest();
			initContactForm();

			document.querySelector( '.mdc-button' ).click();
			expect( xhr.send.mock.calls[ 0 ][ 0 ] ).not.toBeUndefined();
			const [ formDataInstance, formDataAsObject ] = retrieveFormDataFromMock(
				xhr.send.mock
			);

			expect( xhr.open ).toHaveBeenCalledWith( 'POST', global.mtb.ajax_url );
			expect( xhr.send ).toHaveBeenCalledWith( formDataInstance );

			expect( formDataAsObject ).toStrictEqual( {
				_wp_http_referer: '/3732-2/',
				action: '',
				contact_fields:
					'{"mtb-name-1":{"name":"mtb-name-1","label":"Name","value":"Test Name"},"mtb-email-1":{"name":"mtb-email-1","label":"Email","value":"email@example.com"},"mtb-website-1":{"name":"mtb-website-1","label":"Website","value":"http://example.com"},"mtb-message-1":{"name":"mtb-message-1","label":"Message","value":"Test message"}}',
				mtb_contact_form_nonce: '8d2ba7b1f1',
				mtb_token: 'token_here',
				token: 'token_here',
			} );

			xhr.readyState = XMLHttpRequest.DONE;

			// Simulate a HTTP error.
			xhr.status = 401;
			xhr.responseText = null;

			expect( xhr.onreadystatechange ).not.toBeUndefined();
			xhr.onreadystatechange.call();

			await waitFor( () => {
				expect(
					document.getElementById( 'mtbContactFormErrorMsgContainer' ).style
						.display
				).toStrictEqual( 'block' );
			} );
		} );

		it( 'errors', () => {
			setup();
			document.getElementById( 'mtb-email-1' ).value = 'bad email';

			initContactForm();

			document.getElementById( 'mtbContactForm' ).checkValidity();

			expect(
				document
					.getElementById( 'mtb-email-1' )
					.closest( '.mdc-text-field' )
					.classList.contains( 'mdc-text-field--invalid' )
			).toStrictEqual( true );
		} );
	} );

	describe( 'initReCaptchaToken', () => {
		it( 'runs only when an element with id `mtbContactForm` exists', () => {
			setup();
			// Remove the form element.
			document.getElementById( 'mtbContactForm' ).remove();
			initReCaptchaToken();

			expect( ready ).toHaveBeenCalledTimes( 0 );
		} );

		it( 'runs only when an element with name `mtb_token` exists', () => {
			setup();
			// Remove the token text element.
			document.querySelector( '[name=mtb_token]' ).remove();
			initReCaptchaToken();

			expect( ready ).toHaveBeenCalledTimes( 0 );
		} );

		it( 'runs only when `recaptcha_site_key` is set and valid', () => {
			setup();
			delete global.mtb.recaptcha_site_key;
			initReCaptchaToken();

			expect( ready ).toHaveBeenCalledTimes( 0 );

			global.mtb.recaptcha_site_key = '';
			initReCaptchaToken();

			expect( ready ).toHaveBeenCalledTimes( 0 );
		} );

		it( 'invokes grecaptcha ready, executes and sets the token field value', async () => {
			global.mtb.recaptcha_site_key = 'SITE_KEY';
			setup();
			initReCaptchaToken();
			expect( ready ).toHaveBeenCalledTimes( 1 );
			expect( execute ).toHaveBeenCalledTimes( 1 );

			await waitFor( () =>
				expect(
					document.querySelector( '[name=mtb_token]' ).value
				).toStrictEqual( tokenValue )
			);
		} );
	} );
} );
