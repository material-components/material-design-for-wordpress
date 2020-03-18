/**
 * WordPress dependencies
 */
import { visitAdminPage } from '@wordpress/e2e-test-utils';

const isVisible = async selector => {
	return await page.$eval( selector, elem => {
		return (
			window.getComputedStyle( elem ).getPropertyValue( 'visibility' ) !==
				'hidden' && elem.offsetHeight
		);
	} );
};

describe( 'customize controls', () => {
	beforeAll( async () => {
		await visitAdminPage( 'customize.php' );
	} );

	it( 'should add custom material theme settings panel', async () => {
		// Check if panel is added
		expect( await page.$( '#accordion-panel-mtb' ) ).not.toBeNull();
	} );

	it( 'should display custom material theme sections', async () => {
		const title = await page.$( '#accordion-panel-mtb h3' );
		await page.evaluate( btn => {
			btn.click();
		}, title );

		await page.waitFor( 500 );

		// Assert style section is displayed.
		expect( await isVisible( '#accordion-section-mtb_style' ) ).toBeTruthy();
	} );

	it( 'should expand collapsible section', async () => {
		const title = await page.$( '#accordion-section-mtb_style h3' );
		await page.evaluate( btn => {
			btn.click();
		}, title );

		await page.waitFor( 500 );

		// Assert style section is displayed.
		expect(
			await isVisible( '#sub-accordion-section-mtb_style' )
		).toBeTruthy();
	} );

	it( 'should collapse collapsible section', async () => {
		const title = await page.$( '#accordion-section-mtb_style h3' );
		await page.evaluate( btn => {
			btn.click();
		}, title );

		await page.waitFor( 500 );

		// Assert style section is displayed.
		expect( await isVisible( '#sub-accordion-section-mtb_style' ) ).toBeFalsy();
	} );

	it( 'should update primary color if a style is selected', async () => {
		const crane = await page.$( '#mtb_style-crane' );
		await page.evaluate( radio => radio.click(), crane );

		const primaryColor = await page.$( '#_customize-input-mtb_primary_color' );

		// Assert primary color is updated.
		expect( await page.evaluate( input => input.value, primaryColor ) ).toEqual(
			'#5d1049'
		);

		const fortnightly = await page.$( '#mtb_style-fortnightly' );
		await page.evaluate( radio => radio.click(), fortnightly );

		// Assert primary color is updated.
		expect( await page.evaluate( input => input.value, primaryColor ) ).toEqual(
			'#ffffff'
		);
	} );

	it( 'should update design style to custom if any value is updated', async () => {
		const primaryColor = await page.$( '#_customize-input-mtb_primary_color' );
		await page.evaluate( input => {
			input.value = '#000000';
			input.dispatchEvent( new Event( 'change' ) );
		}, primaryColor );

		const selectedOption = await page.$(
			'[name=_customize-radio-mtb_style]:checked'
		);

		// Assert style is updated to custom.
		expect(
			await page.evaluate( input => input.value, selectedOption )
		).toEqual( 'custom' );
	} );
} );
