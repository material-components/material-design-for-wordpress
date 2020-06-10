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

	describe( 'Panel and collapsible sections', () => {
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
			expect(
				await isVisible( '#sub-accordion-section-mtb_style' )
			).toBeFalsy();
		} );
	} );

	describe( 'Design Style section', () => {
		it( 'should update primary color if a style is selected', async () => {
			const crane = await page.$( '#mtb_style-crane' );
			await page.evaluate( radio => radio.click(), crane );

			const primaryColor = await page.$(
				'#customize-control-mtb_primary_color .color-picker-hex'
			);

			// Assert primary color is updated.
			expect(
				await page.evaluate( input => input.value, primaryColor )
			).toEqual( '#5d1049' );

			const fortnightly = await page.$( '#mtb_style-fortnightly' );
			await page.evaluate( radio => radio.click(), fortnightly );

			// Assert primary color is updated.
			expect(
				await page.evaluate( input => input.value, primaryColor )
			).toEqual( '#121212' );
		} );

		it( 'should update design style to custom if any value is updated', async () => {
			const primaryColor = await page.$(
				'#customize-control-mtb_primary_color .color-picker-hex'
			);
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

	describe( 'Color Palettes section', () => {
		beforeAll( async () => {
			const title = await page.$( '#accordion-section-mtb_colors h3' );
			await page.evaluate( btn => {
				btn.click();
			}, title );

			await page.waitFor( 500 );
		} );

		it( 'should always display color input field', async () => {
			expect(
				await isVisible(
					'#customize-control-mtb_primary_color .color-picker-hex'
				)
			).toBeTruthy();
		} );

		it( 'should show two tabs on "Select Color" button click', async () => {
			const picker = await page.$(
				'#customize-control-mtb_primary_color .wp-color-result'
			);
			await page.evaluate( btn => {
				btn.click();
			}, picker );

			const tabOne = await page.$( '#mtb-palette-mtb_primary_color' );
			const tabTwo = await page.$( '#mtb-custom-mtb_primary_color' );

			expect( tabOne ).not.toBeNull();
			expect( tabTwo ).not.toBeNull();
		} );

		it( 'should render all material colors', async () => {
			const colors = await page.$$(
				'#mtb-palette-mtb_primary_color .components-circular-option-picker__option-wrapper'
			);

			expect( colors.length ).toEqual( 254 );
		} );

		it( 'should select a color on click', async () => {
			const firstColor = await page.$(
				'#mtb-palette-mtb_primary_color .components-circular-option-picker__option-wrapper__row:first-child .components-circular-option-picker__option-wrapper:first-child button'
			);
			await page.evaluate( btn => {
				btn.click();
			}, firstColor );

			const primaryColor = await page.$(
				'#customize-control-mtb_primary_color .color-picker-hex'
			);

			// Assert primary color is updated.
			expect(
				await page.evaluate( input => input.value, primaryColor )
			).toEqual( '#ffebee' );
		} );
	} );

	describe( 'Shape Size section', () => {
		beforeAll( async () => {
			await page.evaluate( el => {
				el.click();
			}, await page.$( '#accordion-panel-mtb h3' ) );

			await page.waitFor( 500 );

			await page.evaluate( el => {
				el.click();
			}, await page.$( '#accordion-section-mtb_corner_styles h3' ) );
		} );

		it( 'should always display the `Global corner styles` setting control', async () => {
			expect(
				await isVisible( '#range-slider-control-mtb_global_radius' )
			).toBeTruthy();
		} );

		it( 'should hide all individual component controls', async () => {
			expect(
				await page.$( '#range-slider-control-mtb_button_radius' )
			).toBeNull();

			expect(
				await page.$( '#range-slider-control-mtb_text_field_radius' )
			).toBeNull();
		} );

		it( 'should expand all individual component controls when expand icon is clicked', async () => {
			await page.evaluate( el => {
				el.click();
			}, await page.$( '.range-slider-control-settings-expanded' ) );

			expect(
				await isVisible( '#range-slider-control-mtb_button_radius' )
			).toBeTruthy();

			expect(
				await isVisible( '#range-slider-control-mtb_image_list_radius' )
			).toBeTruthy();

			expect(
				await isVisible( '#range-slider-control-mtb_text_field_radius' )
			).toBeTruthy();
		} );
	} );

	describe( 'Global corner styles Control', () => {
		beforeAll( async () => {
			await page.evaluate( el => {
				el.click();
			}, await page.$( '#accordion-panel-mtb h3' ) );

			await page.waitFor( 500 );

			await page.evaluate( el => {
				el.click();
			}, await page.$( '#accordion-section-mtb_corner_styles h3' ) );

			await page.evaluate( el => {
				el.click();
			}, await page.$( '.range-slider-control-settings-expanded' ) );
		} );
	} );

	describe( 'Kitchen Sink', () => {
		it( 'should show the kitchen sink button', async () => {
			expect( await page.$$( '.toggle-kitchen-sink' ) ).not.toBeNull();
		} );

		it( 'should show the kitchen sink components and hide preview pane', async () => {
			await page.evaluate(
				button => button.click(),
				await page.$( '.toggle-kitchen-sink' )
			);

			expect( await isVisible( '#mcb-kitchen-sink-preview' ) ).toBeTruthy();

			const previewDisplay = await page.evaluate(
				node => node.style.display,
				await page.$( '#customize-preview' )
			);

			expect( previewDisplay ).toBe( 'none' );
		} );
	} );
} );
