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
 * Clicks a button based on the text on the button.
 *
 * This is almost a copy of the upstream util, however, it uses page.evaluate for clicking since it seems to work more reliably.
 *
 * @param {string} buttonText The text that appears on the button to click.
 */
export async function clickButton( buttonText ) {
	const button = await page.waitForXPath(
		`//button[contains(text(), '${ buttonText }')]`
	);
	await page.evaluate( btn => {
		btn.click();
	}, button );
}
