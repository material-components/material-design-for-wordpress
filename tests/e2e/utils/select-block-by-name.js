/**
 * Select a block by name.
 *
 * @param {string} name The block name to select.
 */
import { getAllBlocks, selectBlockByClientId } from '@wordpress/e2e-test-utils';

export const selectBlockByName = async name => {
	await selectBlockByClientId(
		( await getAllBlocks() ).find( block => block.name === name ).clientId
	);
};
