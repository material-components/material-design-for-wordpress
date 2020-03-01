/* global page */

/**
 * Internal dependencies
 */
import { openGlobalBlockInserter } from '@wordpress/e2e-test-utils';

/**
 * Search for block in the global inserter
 *
 * @param {string} searchTerm The text to search for.
 */
export async function searchForBlock( searchTerm ) {
	await openGlobalBlockInserter();
	await page.keyboard.type( searchTerm );
}
