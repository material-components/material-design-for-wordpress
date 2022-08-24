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
import { createNewPost, ensureSidebarOpened } from '@wordpress/e2e-test-utils';

/**
 * Internal dependencies
 */
import { insertBlockByKeyword, selectBlockByName } from '../../../../utils';

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

		const [ liLabel ] = await page.$$( '.mdc-list-item__primary-text div' );

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
			await page.$x(
				"//span[contains(@class, 'mdc-list-item__graphic')]"
			)
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
			await page.evaluate(
				// eslint-disable-next-line @wordpress/no-global-active-element
				() => document.activeElement.parentNode.className
			)
		).toContain( 'mdc-list-item__secondary-text' );
	} );

	// eslint-disable-next-line jest/no-disabled-tests
	it.skip( 'should merge and split for single line list', async () => {
		await insertBlockByKeyword( 'mlist' );
		await selectBlockByName( 'material/list' );

		const [ primary ] = await page.$$( '.mdc-list-item__primary-text' );

		expect( await page.$$( '.mdc-list-item' ) ).toHaveLength( 1 );

		await primary.click();
		await page.keyboard.type( 'List Item 1', { delay: 250 } );
		await primary.press( 'Enter', { delay: 50 } );
		await page.keyboard.type( 'List Item 2', { delay: 250 } );
		await primary.press( 'Enter', { delay: 50 } );
		await page.keyboard.type( 'List Item 3', { delay: 250 } );

		expect( await page.$$( '.mdc-list-item' ) ).toHaveLength( 3 );

		let items = await page.$$( '.mdc-list-item__primary-text' );

		await items[ 1 ].click();
		await primary.press( 'Home', { delay: 50 } );
		await primary.press( 'Backspace', { delay: 250 } );

		expect( await page.$$( '.mdc-list-item' ) ).toHaveLength( 2 );
		expect(
			await page.evaluate( el => el.innerText.trim(), primary )
		).toStrictEqual( 'List Item 1List Item 2' );

		await page.keyboard.press( 'Enter', { delay: 50 } );

		items = await page.$$( '.mdc-list-item__primary-text' );
		expect( await page.$$( '.mdc-list-item' ) ).toHaveLength( 3 );
		expect(
			await page.evaluate( el => el.innerText.trim(), items[ 0 ] )
		).toStrictEqual( 'List Item 1' );
		expect(
			await page.evaluate( el => el.innerText.trim(), items[ 1 ] )
		).toStrictEqual( 'List Item 2' );
		expect(
			await page.evaluate( el => el.innerText.trim(), items[ 2 ] )
		).toStrictEqual( 'List Item 3' );
	} );

	// eslint-disable-next-line jest/no-disabled-tests
	it.skip( 'should merge and split for secondary line list (same list item)', async () => {
		// With 5.9 this test is flaky, focusElement on list item is causing the test to fail.
		await insertBlockByKeyword( 'mlist' );
		await selectBlockByName( 'material/list' );

		const [ primary ] = await page.$$( '.mdc-list-item__primary-text' );
		const [ twoLineOption ] = await page.$x(
			"//span[contains(text(), 'List Item With Secondary Text')]"
		);

		await twoLineOption.click();
		await page.waitForFunction(
			`document.querySelectorAll( '.mdc-list-item__secondary-text' ).length === 1`
		); // wait until all the list items are updated.

		await primary.click();
		await page.keyboard.type( 'List Item 1', { delay: 250 } );
		await primary.press( 'Enter', { delay: 50 } );
		await page.keyboard.type( 'Secondary Text 1', { delay: 250 } );

		const [ secondary ] = await page.$$( '.mdc-list-item__secondary-text' );

		expect(
			await page.evaluate( el => el.innerText.trim(), primary )
		).toStrictEqual( 'List Item 1' );
		expect(
			await page.evaluate( el => el.innerText.trim(), secondary )
		).toStrictEqual( 'Secondary Text 1' );

		await primary.press( 'Home', { delay: 50 } );
		await primary.press( 'Backspace', { delay: 50 } );

		expect(
			await page.evaluate( el => el.innerText.trim(), primary )
		).toStrictEqual( 'List Item 1Secondary Text 1' );

		await primary.press( 'Enter', { delay: 50 } );

		expect(
			await page.evaluate( el => el.innerText.trim(), primary )
		).toStrictEqual( 'List Item 1' );
		expect(
			await page.evaluate( el => el.innerText.trim(), secondary )
		).toStrictEqual( 'Secondary Text 1' );
	} );

	it.skip( 'should merge and split for secondary line list (multiple list items)', async () => {
		// Flaky test.
		await insertBlockByKeyword( 'mlist' );
		await selectBlockByName( 'material/list' );

		const [ primary ] = await page.$$( '.mdc-list-item__primary-text' );
		const [ twoLineOption ] = await page.$x(
			"//span[contains(text(), 'List Item With Secondary Text')]"
		);

		await twoLineOption.click();
		await page.waitForFunction(
			`document.querySelectorAll( '.mdc-list-item__secondary-text' ).length === 1`
		); // wait until all the list items are updated.

		await primary.click();
		await page.keyboard.type( 'List Item 1', { delay: 250 } );
		await primary.press( 'Enter', { delay: 50 } );
		await page.keyboard.type( 'Secondary Text 1', { delay: 250 } );
		await primary.press( 'Enter', { delay: 50 } );

		await page.keyboard.type( 'List Item 2', { delay: 250 } );
		await primary.press( 'Enter', { delay: 50 } );
		await page.keyboard.type( 'Secondary Text 2', { delay: 250 } );

		expect( await page.$$( '.mdc-list-item' ) ).toHaveLength( 2 );

		let items = await page.$$( '.mdc-list-item__primary-text' );
		let secondaryItems = await page.$$( '.mdc-list-item__secondary-text' );

		await items[ 1 ].click();
		await primary.press( 'Home', { delay: 50 } );
		await primary.press( 'Backspace', { delay: 250 } );

		expect( await page.$$( '.mdc-list-item' ) ).toHaveLength( 1 );
		expect(
			await page.evaluate( el => el.innerText.trim(), items[ 0 ] )
		).toStrictEqual( 'List Item 1' );
		expect(
			await page.evaluate(
				el => el.innerText.trim(),
				secondaryItems[ 0 ]
			)
		).toStrictEqual( 'Secondary Text 1List Item 2 Secondary Text 2' );

		await primary.press( 'Enter', { delay: 50 } );

		expect( await page.$$( '.mdc-list-item' ) ).toHaveLength( 2 );

		items = await page.$$( '.mdc-list-item__primary-text' );
		secondaryItems = await page.$$( '.mdc-list-item__secondary-text' );

		expect(
			await page.evaluate( el => el.innerText.trim(), items[ 0 ] )
		).toStrictEqual( 'List Item 1' );
		expect(
			await page.evaluate(
				el => el.innerText.trim(),
				secondaryItems[ 0 ]
			)
		).toStrictEqual( 'Secondary Text 1' );

		expect(
			await page.evaluate( el => el.innerText.trim(), items[ 1 ] )
		).toStrictEqual( 'List Item 2 Secondary Text 2' );
		expect(
			await page.evaluate(
				el => el.innerText.trim(),
				secondaryItems[ 1 ]
			)
		).toStrictEqual( '' );
	} );
} );
