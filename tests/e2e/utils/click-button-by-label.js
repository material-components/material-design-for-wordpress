/* global page */

/**
 * Clicks a button based on the label on the button.
 *
 * @param {string} label Aria label.
 */
export async function clickButtonByLabel( label ) {
	const btnSelector = `button[aria-label="${ label }"]`;
	await page.waitForSelector( btnSelector );
	await page.evaluate( selector => {
		document.querySelector( selector ).click();
	}, btnSelector );
}
