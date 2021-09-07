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
				await page.$( '#accordion-panel-material_design' )
			).not.toBeNull();
		} );

		it( 'should display custom material theme sections', async () => {
			const title = await page.$( '#accordion-panel-material_design h3' );
			await page.evaluate( btn => {
				btn.click();
			}, title );

			await page.waitFor( 500 );

			// Assert style section is displayed.
			expect(
				await isVisible( '#accordion-section-material_design_style' )
			).toBeTruthy();
		} );

		it( 'should expand collapsible section', async () => {
			const title = await page.$(
				'#accordion-section-material_design_style h3'
			);
			await page.evaluate( btn => {
				btn.click();
			}, title );

			await page.waitFor( 500 );

			// Assert style section is displayed.
			expect(
				await isVisible( '#sub-accordion-section-material_design_style' )
			).toBeTruthy();
		} );

		it( 'should collapse collapsible section', async () => {
			const title = await page.$(
				'#accordion-section-material_design_style h3'
			);
			await page.evaluate( btn => {
				btn.click();
			}, title );

			await page.waitFor( 500 );

			// Assert style section is displayed.
			expect(
				await isVisible( '#sub-accordion-section-material_design_style' )
			).toBeFalsy();
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
