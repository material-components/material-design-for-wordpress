/**
 * WordPress dependencies
 */
import { createNewPost, insertBlock } from '@wordpress/e2e-test-utils';

import { selectBlockByName } from '../../../../utils';

describe( 'blocks: material/data-table', () => {
	it( 'should be inserted', async () => {
		await createNewPost( {} );
		await insertBlock( 'Table' );

		const createButton = await page.$$( '.wp-block-table__placeholder-button' );
		createButton[ 0 ].click();

		// Check if block was inserted
		expect( await page.$( '[data-type="core/table"]' ) ).not.toBeNull();
	} );

	it( 'should have a "Styles" selection with Material style added', async () => {
		await selectBlockByName( 'core/table' );
		const panels = await page.$$( '.components-panel__body-toggle' );

		await panels[ 0 ].click();

		const styles = await page.$$( '.block-editor-block-styles__item-label' );
		expect( styles ).toHaveLength( 3 );
	} );

	it( 'should select Material table when style is selected', async () => {
		await selectBlockByName( 'core/table' );
		const styles = await page.$$( '.block-editor-block-styles__item-label' );

		await styles[ 2 ].click();
		const table = await page.$$( '.edit-post-visual-editor .mdc-data-table' );
		expect( table ).toHaveLength( 1 );
	} );

	it( 'should update table cell content', async () => {
		const tableCells = await page.$$(
			'.edit-post-visual-editor .mdc-data-table .wp-block-table__cell-content'
		);
		await tableCells[ 0 ].focus();
		await page.keyboard.type( 'Column 1' );

		const className = await page.evaluate(
			() =>
				document.querySelectorAll(
					'.edit-post-visual-editor .mdc-data-table .wp-block-table__cell-content'
				)[ 0 ].className
		);

		expect( className.indexOf( 'is-selected' ) ).not.toBe( -1 );

		const content = await page.evaluate(
			() =>
				document.querySelectorAll(
					'.edit-post-visual-editor .mdc-data-table .wp-block-table__cell-content'
				)[ 0 ].textContent
		);
		expect( content ).toBe( 'Column 1' );
	} );
} );
