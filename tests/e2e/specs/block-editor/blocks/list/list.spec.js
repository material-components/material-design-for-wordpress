/**
 * WordPress dependencies
 */
import { createNewPost /*insertBlock*/ } from '@wordpress/e2e-test-utils';
import { insertBlockByKeyword } from '../../../../utils/insert-block';

// import { selectBlockByName } from '../../../../utils';

describe( 'blocks: material/list', () => {
	beforeEach( async () => {
		await createNewPost( {} );
	} );

	it.only( 'should be inserted', async () => {
		await insertBlockByKeyword( 'mlist' );

		// Check if block was inserted
		expect( await page.$( '[data-type="material/list"]' ) ).not.toBeNull();
		expect( await page.$( '[data-type="material/list-item"]' ) ).not.toBeNull();
	} );
} );
