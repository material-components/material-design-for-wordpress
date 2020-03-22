/**
 * WordPress dependencies
 */
import { createNewPost /*insertBlock*/ } from '@wordpress/e2e-test-utils';

// import { selectBlockByName } from '../../../../utils';

describe( 'blocks: material/list', () => {
	beforeEach( async () => {
		await createNewPost( {} );
	} );

	it.todo(
		'should be inserted' /*, async () => {
		await insertBlock( 'mlist' );

		// Check if block was inserted
		expect( await page.$( '[data-type="material/list"]' ) ).not.toBeNull();
		expect( await page.$( '[data-type="material/list-item"]' ) ).not.toBeNull();
	} */
	);
} );
