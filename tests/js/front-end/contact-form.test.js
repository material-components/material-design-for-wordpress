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
import { initReCaptchaToken } from '../../../assets/src/front-end/contact-form';

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

		it( 'invokes grecaptcha ready, execute and sets the token field value', async () => {
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
