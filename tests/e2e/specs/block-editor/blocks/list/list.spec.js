/**
 * WordPress dependencies
 */
import { createNewPost, ensureSidebarOpened } from '@wordpress/e2e-test-utils';

import { selectBlockByName } from '../../../../utils';
import { insertBlockByKeyword } from '../../../../utils/insert-block';

describe( 'blocks: material/list', () => {
	beforeEach( async () => {
		await createNewPost( {} );
	} );

	it( 'should be inserted', async () => {
		await insertBlockByKeyword( 'mlist' );

		// Check if block was inserted
		expect( await page.$( '[data-type="material/list"]' ) ).not.toBeNull();
	} );

	it( 'should create a new list item block when ENTER is pressed', async () => {
		await insertBlockByKeyword( 'mlist' );
		await selectBlockByName( 'material/list' );

		const [ liLabel ] = await page.$$( '.mdc-list-item__text' );

		expect( await page.$$( '.mdc-list-item' ) ).toHaveLength( 1 );

		await liLabel.click();
		await liLabel.press( 'Enter' );

		expect( await page.$$( '.mdc-list-item' ) ).toHaveLength( 2 );
	} );

	it( 'should display leading icon if enabled', async () => {
		await ensureSidebarOpened();
		await insertBlockByKeyword( 'mlist' );
		await selectBlockByName( 'material/list' );

		await page.waitForFunction(
			`document.querySelectorAll( '.mdc-list-item__graphic' ).length === 1`
		); // wait until all the list items are updated.

		expect(
			await page.$x( "//span[contains(@class, 'mdc-list-item__graphic')]" )
		).toHaveLength( 1 );
	} );

	it( 'should display trailing icon if enabled', async () => {
		await ensureSidebarOpened();
		await insertBlockByKeyword( 'mlist' );
		await selectBlockByName( 'material/list' );

		const [ trailingIcons ] = await page.$x(
			"//button[contains(text(), 'Trailing')]"
		);

		await trailingIcons.click();
		await page.waitForFunction(
			`document.querySelectorAll( '.mdc-list-item__meta' ).length === 1`
		); // wait until all the list items are updated.

		expect(
			await page.$x( "//span[contains(@class, 'mdc-list-item__meta')]" )
		).toHaveLength( 1 );
	} );

	it( 'should display secondary line if the option was chosen', async () => {
		await ensureSidebarOpened();
		await insertBlockByKeyword( 'mlist' );
		await selectBlockByName( 'material/list' );

		const [ twoLineOption ] = await page.$x(
			"//span[contains(text(), 'List Item With Secondary Text')]"
		);

		expect(
			await page.$x(
				"//span[contains(@class, 'mdc-list-item__secondary-text')]"
			)
		).toHaveLength( 0 );

		await twoLineOption.click();
		await page.waitForFunction(
			`document.querySelectorAll( '.mdc-list-item__secondary-text' ).length === 1`
		); // wait until all the list items are updated.

		expect(
			await page.$x(
				"//span[contains(@class, 'mdc-list-item__secondary-text')]"
			)
		).toHaveLength( 1 );
	} );

	it( 'should focus secondary text when `Enter` is pressed in primary text', async () => {
		await insertBlockByKeyword( 'mlist' );
		await selectBlockByName( 'material/list' );

		const [ primary ] = await page.$$( '.mdc-list-item__primary-text' );

		expect( await page.$$( '.mdc-list-item' ) ).toHaveLength( 1 );

		const [ twoLineOption ] = await page.$x(
			"//span[contains(text(), 'List Item With Secondary Text')]"
		);

		await twoLineOption.click();
		await page.waitForFunction(
			`document.querySelectorAll( '.mdc-list-item__secondary-text' ).length === 1`
		); // wait until all the list items are updated.

		await primary.click();
		await primary.press( 'Enter' );

		expect(
			await page.evaluate( () => document.activeElement.parentNode.className )
		).toContain( 'mdc-list-item__secondary-text' );
	} );
} );
