/**
 * WordPress dependencies
 */
import { insertBlock, createNewPost } from '@wordpress/e2e-test-utils';

/**
 * Internal dependencies
 */
import { selectBlockByName } from '../../../../utils';

describe( 'blocks: material/tab-bar', () => {
	beforeEach( async () => {
		await createNewPost( {} );
	} );

	it( 'should be inserted', async () => {
		await insertBlock( 'Tab Bar' );
		expect( await page.$( '[data-type="material/tab-bar"]' ) ).not.toBeNull();
	} );

	it( 'should have "None" selected as the icon position initially', async () => {
		await insertBlock( 'Tab Bar' );
		await selectBlockByName( 'material/tab-bar' );

		expect(
			await page.$x(
				"//button[contains(@class, 'btn-group__list__list-item__button--active') and contains(text(), 'None')]"
			)
		).toHaveLength( 1 );
	} );

	it( 'should change icon position to "Leading", select icon and evaluate', async () => {
		await insertBlock( 'Tab Bar' );
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

		expect( await page.$$( '.icons-search__search-input' ) ).toHaveLength( 1 );

		const [ icon ] = await page.$$( '.icons-container__icon__icon-btn' );

		// Pick an icon
		await icon.click();

		expect( await page.$$( '.material-icons.mdc-tab__icon' ) ).toHaveLength(
			1
		);

		expect( await page.$$( '.mdc-tab--stacked' ) ).toHaveLength( 0 );
	} );

	it( 'should change icon position to "Above", select icon and evaluate', async () => {
		await insertBlock( 'Tab Bar' );
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

		expect( await page.$$( '.icons-search__search-input' ) ).toHaveLength( 1 );

		const [ icon ] = await page.$$( '.icons-container__icon__icon-btn' );

		// Pick an icon
		await icon.click();

		expect( await page.$$( '.material-icons.mdc-tab__icon' ) ).toHaveLength(
			1
		);

		expect( await page.$$( '.mdc-tab--stacked' ) ).toHaveLength( 1 );
	} );

	it( 'should remove a tab if the X button was clicked', async () => {
		await insertBlock( 'Tab Bar' );
		await selectBlockByName( 'material/tab-bar' );

		expect( await page.$$( '.mdc-tab.tab' ) ).toHaveLength( 2 );

		const [ activeTabRemoveBtn ] = await page.$$(
			'.mdc-tab--active .tab__delete'
		);

		expect( activeTabRemoveBtn ).not.toBeFalsy();

		// click the delete button
		await activeTabRemoveBtn.click();

		expect( await page.$$( '.mdc-tab.tab' ) ).toHaveLength( 1 );
	} );

	it( 'should add a tab if the "+ New Tab" button was clicked', async () => {
		await insertBlock( 'Tab Bar' );
		await selectBlockByName( 'material/tab-bar' );

		expect( await page.$$( '.mdc-tab.tab' ) ).toHaveLength( 2 );

		const [ newTabBtn ] = await page.$$( '.mdc-tab-bar .tab-add' );

		expect( newTabBtn ).not.toBeFalsy();

		// click the add button
		await newTabBtn.click();

		expect( await page.$$( '.mdc-tab.tab' ) ).toHaveLength( 3 );
	} );

	it( 'should add content to tab and switch tabs to see if content is hiding', async () => {
		await insertBlock( 'Tab Bar' );
		await selectBlockByName( 'material/tab-bar' );

		const [ addBlock ] = await page.$$(
			'[data-block] .block-editor-inserter__toggle'
		);
		await addBlock.click();

		const [ searchBlock ] = await page.$$( '.editor-inserter__search' );
		await searchBlock.type( 'Hello World' );

		const [ helloWorldBlock ] = await page.$$(
			'.editor-block-list-item-material-hello-world'
		);
		await helloWorldBlock.click();

		expect(
			await page.$x( "//h2[contains(text(), 'Hello Editor')]" )
		).toHaveLength( 1 );

		const [ otherTab ] = await page.$x( "//span[contains(text(), 'Tab 2')]" );
		await otherTab.click();

		expect(
			await page.$x( "//h2[contains(text(), 'Hello Editor')]" )
		).toHaveLength( 0 );
	} );
} );
