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

describe( 'Customize controls', () => {
	beforeAll( async () => {
		await visitAdminPage( 'customize.php' );
	} );

	describe( 'Corner Styles section', () => {
		beforeAll( async () => {
			await page.evaluate( el => {
				el.click();
			}, await page.$( '#accordion-panel-mtb h3' ) );

			await page.waitFor( 500 );

			await page.evaluate( el => {
				el.click();
			}, await page.$( '#accordion-section-mtb_corner_styles h3' ) );
		} );

		it( 'should always display the Small Component Radius setting control', async () => {
			expect(
				await isVisible( '#range-slider-control-mtb_small_component_radius' )
			).toBeTruthy();
		} );

		it( 'should always display the Medium Component Radius setting control', async () => {
			expect(
				await isVisible( '#range-slider-control-mtb_medium_component_radius' )
			).toBeTruthy();
		} );

		it( 'should always display the Large Component Radius setting control', async () => {
			expect(
				await isVisible( '#range-slider-control-mtb_large_component_radius' )
			).toBeTruthy();
		} );
	} );

	describe( 'Small Component Radius Control', () => {
		beforeAll( async () => {
			await page.evaluate( el => {
				el.click();
			}, await page.$( '#accordion-panel-mtb h3' ) );

			await page.waitFor( 500 );

			await page.evaluate( el => {
				el.click();
			}, await page.$( '#accordion-section-mtb_corner_styles h3' ) );
		} );

		it( 'should have a default value of 4 when the Baseline Design style is selected', async () => {
			await page.evaluate( el => {
				el.click();
			}, await page.$( '#accordion-section-mtb_style h3' ) );

			await page.evaluate(
				radio => radio.click(),
				await page.$( '#mtb_style-baseline' )
			);

			const inputValue = await page.evaluate( input => {
				return input.value;
			}, await page.$( '#range-slider-control-mtb_small_component_radius .components-range-control__number' ) );

			expect( inputValue ).toBe( '4' );
		} );
	} );

	describe( 'Medium Component Radius Control', () => {
		beforeAll( async () => {
			await page.evaluate( el => {
				el.click();
			}, await page.$( '#accordion-panel-mtb h3' ) );

			await page.waitFor( 500 );

			await page.evaluate( el => {
				el.click();
			}, await page.$( '#accordion-section-mtb_corner_styles h3' ) );
		} );

		it( 'should have a default value of 4 when the Baseline Design style is selected', async () => {
			await page.evaluate( el => {
				el.click();
			}, await page.$( '#accordion-section-mtb_style h3' ) );

			await page.evaluate(
				radio => radio.click(),
				await page.$( '#mtb_style-baseline' )
			);

			const inputValue = await page.evaluate( input => {
				return input.value;
			}, await page.$( '#range-slider-control-mtb_medium_component_radius .components-range-control__number' ) );

			expect( inputValue ).toBe( '4' );
		} );
	} );

	describe( 'Large Component Radius Control', () => {
		beforeAll( async () => {
			await page.evaluate( el => {
				el.click();
			}, await page.$( '#accordion-panel-mtb h3' ) );

			await page.waitFor( 500 );

			await page.evaluate( el => {
				el.click();
			}, await page.$( '#accordion-section-mtb_corner_styles h3' ) );
		} );

		it( 'should have a default value of 24 when the Baseline Design style is selected', async () => {
			await page.evaluate( el => {
				el.click();
			}, await page.$( '#accordion-section-mtb_style h3' ) );

			await page.evaluate(
				radio => radio.click(),
				await page.$( '#mtb_style-baseline' )
			);

			const inputValue = await page.evaluate( input => {
				return input.value;
			}, await page.$( '#range-slider-control-mtb_large_component_radius .components-range-control__number' ) );

			expect( inputValue ).toBe( '0' );
		} );
	} );
} );
