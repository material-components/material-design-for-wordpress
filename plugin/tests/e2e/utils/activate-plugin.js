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
import {
	switchUserToAdmin,
	switchUserToTest,
	visitAdminPage,
} from '@wordpress/e2e-test-utils';

/**
 * Activates an installed plugin.
 *
 * Not using the provided activatePlugin() utility because it uses page.click(),
 * which does not work if the element is not in the view or obscured by another element
 * like an admin pointer.
 *
 * @param {string} slug Plugin slug.
 */
export async function activatePlugin( slug ) {
	await switchUserToAdmin();
	await visitAdminPage( 'plugins.php' );

	const disableLink = await page.$(
		`tr[data-slug="${ slug }"] .deactivate a`
	);
	if ( disableLink ) {
		return;
	}

	await page.evaluate( plugin => {
		const enableLink = document.querySelector(
			`tr[data-slug="${ plugin }"] .activate a`
		);

		if ( enableLink ) {
			enableLink.scrollIntoView();
			enableLink.click();
		}
	}, slug );

	await page.waitForSelector( `tr[data-slug="${ slug }"] .deactivate a` );
	await switchUserToTest();
}
