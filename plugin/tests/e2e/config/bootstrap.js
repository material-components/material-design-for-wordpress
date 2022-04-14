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
 * External dependencies.
 */
import { setDefaultOptions } from 'expect-puppeteer';
import fetch from 'node-fetch';

/**
 * WordPress dependencies.
 */
import {
	enablePageDialogAccept,
	setBrowserViewport,
} from '@wordpress/e2e-test-utils';

/**
 * Environment variables.
 */
const { PUPPETEER_TIMEOUT, EXPECT_PUPPETEER_TIMEOUT } = process.env;

/**
 * Set of console logging types observed to protect against unexpected yet
 * handled (i.e. not catastrophic) errors or warnings. Each key corresponds
 * to the Puppeteer ConsoleMessage type, its value the corresponding function
 * on the console global object.
 *
 * @type {Object<string,string>}
 */
const OBSERVED_CONSOLE_MESSAGE_TYPES = {
	warning: 'warn',
	error: 'error',
};

/**
 * Array of page event tuples of [ eventName, handler ].
 *
 * @type {Array}
 */
const pageEvents = [];

// The Jest timeout is increased because these tests are a bit slow
jest.setTimeout( PUPPETEER_TIMEOUT || 100000 );

// Todo add `flaky-tests-reporter` and `report-flaky-tests` GitHub action workflow.
if ( process.env.CI ) {
	jest.retryTimes( 2 );
}

// Set default timeout for individual expect-puppeteer assertions. (Default: 500)
setDefaultOptions( { timeout: EXPECT_PUPPETEER_TIMEOUT || 500 } );

/**
 * Adds an event listener to the page to handle additions of page event
 * handlers, to assure that they are removed at test teardown.
 */
function capturePageEventsForTearDown() {
	page.on( 'newListener', ( eventName, listener ) => {
		pageEvents.push( [ eventName, listener ] );
	} );
}

/**
 * Removes all bound page event handlers.
 */
function removePageEvents() {
	pageEvents.forEach( ( [ eventName, handler ] ) => {
		page.removeListener( eventName, handler );
	} );
}

/**
 * Adds a page event handler to emit uncaught exception to process if one of
 * the observed console logging types is encountered.
 */
function observeConsoleLogging() {
	page.on( 'console', message => {
		const type = message.type();
		if ( ! OBSERVED_CONSOLE_MESSAGE_TYPES.hasOwnProperty( type ) ) {
			return;
		}

		let text = message.text();

		// styled-components warns about dynamically created components.
		// @todo Fix issues.
		if ( text.includes( ' has been created dynamically.' ) ) {
			return;
		}

		const logFunction = OBSERVED_CONSOLE_MESSAGE_TYPES[ type ];

		// As of Puppeteer 1.6.1, `message.text()` wrongly returns an object of
		// type JSHandle for error logging, instead of the expected string.
		//
		// See: https://github.com/GoogleChrome/puppeteer/issues/3397
		//
		// The recommendation there to asynchronously resolve the error value
		// upon a console event may be prone to a race condition with the test
		// completion, leaving a possibility of an error not being surfaced
		// correctly. Instead, the logic here synchronously inspects the
		// internal object shape of the JSHandle to find the error text. If it
		// cannot be found, the default text value is used instead.
		text = message.args()?.[ 0 ]?._remoteObject?.description || text;

		// Disable reason: We intentionally bubble up the console message
		// which, unless the test explicitly anticipates the logging via
		// @wordpress/jest-console matchers, will cause the intended test
		// failure.

		// eslint-disable-next-line no-console
		console[ logFunction ]( text );
	} );
}

/**
 * Remove `beforeunload` ewvent in the `editor.js` file to rpevent a DOMException.
 */
async function removeBeforeunloadEvents() {
	await page.setRequestInterception( true );
	await page.on( 'request', async request => {
		if ( request.url().match( /dist\/editor(\.min)?\.js/ ) ) {
			fetch( request.url() )
				.then( response => response.text() )
				.then( response => {
					const body = response.replace(
						'beforeunload',
						'nobeforeunload'
					);

					// Send response
					request.respond( {
						ok: true,
						status: 200,
						contentType: 'application/javascript',
						body,
					} );
				} )
				.catch( () => request.continue() );
		} else {
			request.continue();
		}
	} );
}

/**
 * Runs Axe tests when the block editor is found on the current page.
 *
 * @return {?Promise} Promise resolving once Axe texts are finished.
 */
async function runAxeTestsForBlockEditor() {
	// Make sure page exists and if page has .block-editor.
	if ( ! page || ! ( await page.$( '.block-editor' ) ) ) {
		return;
	}

	await expect( page ).toPassAxeTests( {
		// Temporary disabled rules to enable initial integration.
		// See: https://github.com/WordPress/gutenberg/pull/15018.
		disabledRules: [
			'aria-allowed-attr',
			'aria-allowed-role',
			'aria-hidden-focus',
			'aria-input-field-name',
			'aria-valid-attr-value',
			'button-name',
			'color-contrast',
			'dlitem',
			'duplicate-id',
			'label',
			'link-name',
			'listitem',
			'page-has-heading-one',
			'region',
			'nested-interactive',
			'duplicate-id-active',
		],
		exclude: [
			// Ignores elements created by metaboxes.
			'.edit-post-layout__metaboxes',
			// Ignores elements created by TinyMCE.
			'.mce-container',
		],
	} );
}

/**
 * Before every test suite run, delete all content created by the test. This ensures
 * other posts/comments/etc. aren't dirtying tests and tests don't depend on
 * each other's side-effects.
 */
// eslint-disable-next-line jest/require-top-level-describe
beforeAll( async () => {
	capturePageEventsForTearDown();
	await removeBeforeunloadEvents();
	enablePageDialogAccept();
	observeConsoleLogging();
	// 15inch screen.
	await setBrowserViewport( {
		width: 1680,
		height: 948,
	} );
	await page.setDefaultNavigationTimeout( 10000 );
	await page.setDefaultTimeout( 10000 );
	global.page = page;
} );

// eslint-disable-next-line jest/require-top-level-describe
afterEach( async () => {
	await runAxeTestsForBlockEditor();
	// 15inch screen.
	await setBrowserViewport( {
		width: 1680,
		height: 948,
	} );
} );

// eslint-disable-next-line jest/require-top-level-describe
afterAll( () => {
	removePageEvents();
} );
