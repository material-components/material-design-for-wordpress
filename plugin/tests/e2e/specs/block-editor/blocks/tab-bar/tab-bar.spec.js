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
import { createNewPost } from '@wordpress/e2e-test-utils';

/**
 * Internal dependencies
 */
import { insertBlock, selectBlockByName } from '../../../../utils';

describe( 'blocks: material/tab-bar', () => {
	beforeEach( async () => {
		await createNewPost( {} );
	} );

	it( 'should be inserted', async () => {
		await insertBlock( 'Tabs' );
		expect(
			await page.$( '[data-type="material/tab-bar"]' )
		).not.toBeNull();
	} );

	it( 'should have "None" selected as the icon position initially', async () => {
		await insertBlock( 'Tabs' );
		await selectBlockByName( 'material/tab-bar' );

		expect(
			await page.$x(
				"//button[contains(@class, 'btn-group__list__list-item__button--active') and contains(text(), 'None')]"
			)
		).toHaveLength( 1 );
	} );

	it( 'should change icon position to "Leading", select icon and evaluate', async () => {
		await insertBlock( 'Tabs' );
		await selectBlockByName( 'material/tab-bar' );

		const [ leadingBtn ] = await page.$x(
			"//button[contains(@class, 'btn-group__list__list-item__button') and contains(text(), 'Leading')]"
		);

		// Swap icon position
		await leadingBtn.click();

		expect(
			await page.$x(
				"//button[contains(@class, 'btn-group__list__list-item__button--active') and contains(text(), 'Leading')]"
			)
		).toHaveLength( 1 );

		expect( await page.$$( '.icons-search__search-input' ) ).toHaveLength(
			1
		);

		const [ icon ] = await page.$$( '.icons-container__icon__icon-btn' );

		// Pick an icon
		await icon.click();

		expect( await page.$$( '.material-icons.mdc-tab__icon' ) ).toHaveLength(
			1
		);

		expect( await page.$$( '.mdc-tab--stacked' ) ).toHaveLength( 0 );
	} );

	it( 'should change icon position to "Above", select icon and evaluate', async () => {
		await insertBlock( 'Tabs' );
		await selectBlockByName( 'material/tab-bar' );

		const [ leadingBtn ] = await page.$x(
			"//button[contains(@class, 'btn-group__list__list-item__button') and contains(text(), 'Above')]"
		);

		// Swap icon position
		await leadingBtn.click();

		expect(
			await page.$x(
				"//button[contains(@class, 'btn-group__list__list-item__button--active') and contains(text(), 'Above')]"
			)
		).toHaveLength( 1 );

		expect( await page.$$( '.icons-search__search-input' ) ).toHaveLength(
			1
		);

		const [ icon ] = await page.$$( '.icons-container__icon__icon-btn' );

		// Pick an icon
		await icon.click();

		expect( await page.$$( '.material-icons.mdc-tab__icon' ) ).toHaveLength(
			1
		);

		expect( await page.$$( '.mdc-tab--stacked' ) ).toHaveLength( 1 );
	} );

	it( 'should remove a tab if the X button was clicked', async () => {
		await insertBlock( 'Tabs' );
		await selectBlockByName( 'material/tab-bar' );

		expect( await page.$$( '.mdc-tab.tab' ) ).toHaveLength( 2 );

		const [ label ] = await page.$$(
			'.mdc-tab--active .mdc-tab__text-label span'
		);
		label.click();

		await page.keyboard.type( 'Tab 1' );

		const [ activeTabRemoveBtn ] = await page.$$(
			'.mdc-tab--active .tab__delete'
		);

		expect( activeTabRemoveBtn ).not.toBeFalsy();

		// click the delete button
		await activeTabRemoveBtn.click();

		expect( await page.$$( '.mdc-tab.tab' ) ).toHaveLength( 1 );
	} );

	it( 'should add a tab if the "+ New Tab" button was clicked', async () => {
		await insertBlock( 'Tabs' );
		await selectBlockByName( 'material/tab-bar' );

		expect( await page.$$( '.mdc-tab.tab' ) ).toHaveLength( 2 );

		const [ newTabBtn ] = await page.$$( '.tab-add' );

		expect( newTabBtn ).not.toBeFalsy();

		// click the add button
		await newTabBtn.click();

		expect( await page.$$( '.mdc-tab.tab' ) ).toHaveLength( 3 );
	} );

	it( 'should add content to tab and switch tabs to see if content is hiding', async () => {
		await insertBlock( 'Tabs' );
		await selectBlockByName( 'material/tab-bar' );

		const [ addBlock ] = await page.$$(
			'[data-block] .block-editor-inserter__toggle'
		);
		await addBlock.click();

		const [ searchBlock ] = await page.$$(
			'.block-editor-inserter__search'
		);
		await searchBlock.type( 'Heading' );

		const [ headingBlock ] = await page.$$(
			'.editor-block-list-item-heading'
		);
		await headingBlock.click();

		expect(
			await page.$$(
				'[data-type="material/tab-bar"] [data-type="core/heading"]'
			)
		).toHaveLength( 1 );

		const labels = await page.$$( '.mdc-tab__text-label span' );
		labels[ 1 ].click();

		await page.keyboard.type( 'Tab 2' );

		expect(
			await page.$x( "//h2[contains(text(), 'Hello Editor')]" )
		).toHaveLength( 0 );
	} );

	it( 'should not offer tab-bar as a block option within another Tabs content', async () => {
		await insertBlock( 'Tabs' );
		await selectBlockByName( 'material/tab-bar' );

		const [ addBlock ] = await page.$$(
			'[data-block] .block-editor-inserter__toggle'
		);
		await addBlock.click();

		const [ searchBlock ] = await page.$$(
			'.block-editor-inserter__search'
		);
		await searchBlock.type( 'Tabs' );

		try {
			expect(
				await page.$$( '.block-editor-inserter__no-results' )
			).toHaveLength( 1 );
		} catch ( ex ) {
			// eslint-disable-next-line jest/no-try-expect
			expect(
				await page.$$(
					'.block-editor-block-types-list__item editor-block-list-item-material-tab-bar'
				)
			).toHaveLength( 0 );
		}
	} );
} );
