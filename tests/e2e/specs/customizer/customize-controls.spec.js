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
			expect(
				await page.$( '#accordion-panel-material_theme_builder' )
			).not.toBeNull();
		} );

		it( 'should display custom material theme sections', async () => {
			const title = await page.$(
				'#accordion-panel-material_theme_builder h3'
			);
			await page.evaluate( btn => {
				btn.click();
			}, title );

			await page.waitFor( 500 );

			// Assert style section is displayed.
			expect(
				await isVisible( '#accordion-section-material_theme_builder_style' )
			).toBeTruthy();
		} );

		it( 'should expand collapsible section', async () => {
			const title = await page.$(
				'#accordion-section-material_theme_builder_style h3'
			);
			await page.evaluate( btn => {
				btn.click();
			}, title );

			await page.waitFor( 500 );

			// Assert style section is displayed.
			expect(
				await isVisible( '#sub-accordion-section-material_theme_builder_style' )
			).toBeTruthy();
		} );

		it( 'should collapse collapsible section', async () => {
			const title = await page.$(
				'#accordion-section-material_theme_builder_style h3'
			);
			await page.evaluate( btn => {
				btn.click();
			}, title );

			await page.waitFor( 500 );

			// Assert style section is displayed.
			expect(
				await isVisible( '#sub-accordion-section-material_theme_builder_style' )
			).toBeFalsy();
		} );
	} );

	describe( 'Design Style section', () => {
		it( 'should update primary color if a style is selected', async () => {
			const crane = await page.$( '#material_theme_builder-style-crane' );
			await page.evaluate( radio => radio.click(), crane );

			const primaryColor = await page.$(
				'#customize-control-material_theme_builder-primary_color .color-picker-hex'
			);

			// Assert primary color is updated.
			expect(
				await page.evaluate( input => input.value, primaryColor )
			).toEqual( '#5d1049' );

			const fortnightly = await page.$(
				'#material_theme_builder-style-fortnightly'
			);
			await page.evaluate( radio => radio.click(), fortnightly );

			// Assert primary color is updated.
			expect(
				await page.evaluate( input => input.value, primaryColor )
			).toEqual( '#121212' );
		} );

		it( 'should update design style to custom if any value is updated', async () => {
			const primaryColor = await page.$(
				'#customize-control-material_theme_builder-primary_color .color-picker-hex'
			);
			await page.evaluate( input => {
				input.value = '#000000';
				input.dispatchEvent( new Event( 'change' ) );
			}, primaryColor );

			const selectedOption = await page.$(
				'[name="_customize-radio-material_theme_builder-style"]:checked'
			);

			// Assert style is updated to custom.
			expect(
				await page.evaluate( input => input.value, selectedOption )
			).toEqual( 'custom' );
		} );
	} );

	describe( 'Color Palettes section', () => {
		beforeAll( async () => {
			const title = await page.$(
				'#accordion-section-material_theme_builder_colors h3'
			);
			await page.evaluate( btn => {
				btn.click();
			}, title );

			await page.waitFor( 500 );
		} );

		it( 'should always display color input field', async () => {
			expect(
				await isVisible(
					'#customize-control-material_theme_builder-primary_color .color-picker-hex'
				)
			).toBeTruthy();
		} );

		it( 'should show two tabs on "Select Color" button click', async () => {
			const picker = await page.$(
				'#customize-control-material_theme_builder-primary_color .wp-color-result'
			);
			await page.evaluate( btn => {
				btn.click();
			}, picker );

			const tabOne = await page.$(
				'#mtb-palette-material_theme_builder-primary_color'
			);
			const tabTwo = await page.$(
				'#mtb-custom-material_theme_builder-primary_color'
			);

			expect( tabOne ).not.toBeNull();
			expect( tabTwo ).not.toBeNull();
		} );

		it( 'should render all material colors', async () => {
			const colors = await page.$$(
				'#mtb-palette-material_theme_builder-primary_color .components-circular-option-picker__option-wrapper'
			);

			expect( colors.length ).toEqual( 254 );
		} );

		it( 'should select a color on click', async () => {
			const firstColor = await page.$(
				'#mtb-palette-material_theme_builder-primary_color .components-circular-option-picker__option-wrapper__row:first-child .components-circular-option-picker__option-wrapper:first-child button'
			);
			await page.evaluate( btn => {
				btn.click();
			}, firstColor );

			const primaryColor = await page.$(
				'#customize-control-material_theme_builder-primary_color .color-picker-hex'
			);

			// Assert primary color is updated.
			expect(
				await page.evaluate( input => input.value, primaryColor )
			).toEqual( '#ffebee' );
		} );
	} );

	describe( 'Material Blocks', () => {
		it( 'should show the material library button', async () => {
			expect( await page.$$( '.toggle-material-library' ) ).not.toBeNull();
		} );

		it( 'should show the material library components and hide preview pane', async () => {
			await page.evaluate(
				button => button.click(),
				await page.$( '.toggle-material-library' )
			);

			expect( await isVisible( '#mcb-material-library-preview' ) ).toBeTruthy();

			const previewDisplay = await page.evaluate(
				node => node.style.display,
				await page.$( '#customize-preview' )
			);

			expect( previewDisplay ).toBe( 'none' );
		} );
	} );
} );
