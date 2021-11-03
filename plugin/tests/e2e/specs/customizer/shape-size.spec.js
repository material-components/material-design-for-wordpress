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

const moveRangeSlider = async ( slider, targetPercentage ) => {
	const boundingBox = await slider.boundingBox();
	const max = await page.evaluate( el => Number( el.max ), slider );

	if ( ! max || isNaN( max ) ) {
		return;
	}

	targetPercentage =
		targetPercentage > 1 ? targetPercentage / 100 : targetPercentage;
	const targetX = Math.floor( boundingBox.width * targetPercentage );

	await page.mouse.click(
		boundingBox.x + targetX,
		boundingBox.y + boundingBox.height / 2
	);

	return await page.evaluate( el => Number( el.value ), slider );
};

describe( 'Customize controls: Shape Size (Corner Styles)', () => {
	beforeAll( async () => {
		await visitAdminPage( 'customize.php' );
	} );

	describe( 'Shape Size (Corner Styles) section', () => {
		beforeAll( async () => {
			await page.evaluate( el => {
				el.click();
			}, await page.$( '#accordion-panel-material_design h3' ) );

			await page.waitFor( 500 );

			await page.evaluate( el => {
				el.click();
			}, await page.$( '#accordion-section-material_design_corner_styles h3' ) );
		} );

		it( 'should always display the `Global corner styles` setting control', async () => {
			expect(
				await isVisible(
					'#range-slider-control-material_design-global_radius'
				)
			).toBeTruthy();
		} );

		it( 'should hide all individual component controls', async () => {
			expect(
				await page.$(
					'#range-slider-control-material_design-button_radius'
				)
			).toBeNull();

			expect(
				await page.$(
					'#range-slider-control-material_design-text_field_radius'
				)
			).toBeNull();
		} );

		it( 'should expand all individual component controls when expand icon is clicked', async () => {
			await page.evaluate( el => {
				el.click();
			}, await page.$( '.range-slider-control-settings-expanded' ) );

			expect(
				await isVisible(
					'#range-slider-control-material_design-button_radius'
				)
			).toBeTruthy();

			expect(
				await isVisible(
					'#range-slider-control-material_design-image_list_radius'
				)
			).toBeTruthy();

			expect(
				await isVisible(
					'#range-slider-control-material_design-text_field_radius'
				)
			).toBeTruthy();
		} );
	} );

	describe( 'Global corner styles Control', () => {
		it( 'should update all component sliders on global slider change', async () => {
			const sliders = await page.$$(
				'.components-range-control__slider'
			);

			let radius = await moveRangeSlider( sliders[ 0 ], 0 );

			expect(
				await page.evaluate( el => {
					return Number( el.value );
				}, sliders[ 1 ] )
			).toStrictEqual( radius );

			expect(
				await page.evaluate( el => {
					return Number( el.value );
				}, sliders[ 5 ] )
			).toStrictEqual( radius );

			radius = await moveRangeSlider( sliders[ 0 ], 0.5 );

			expect(
				await page.evaluate( el => {
					return Number( el.value );
				}, sliders[ 1 ] )
			).toStrictEqual( radius );

			expect(
				await page.evaluate( el => {
					return Number( el.value );
				}, sliders[ 5 ] )
			).toStrictEqual( radius );
		} );

		it( 'should update an individual slider on change', async () => {
			const sliders = await page.$$(
				'.components-range-control__slider'
			);

			let globalRadius = await moveRangeSlider( sliders[ 0 ], 0.25 );
			const buttonRadius = await moveRangeSlider( sliders[ 1 ], 0.5 );
			const dataTableRadius = await moveRangeSlider( sliders[ 4 ], 0.95 );

			expect(
				await page.evaluate( el => {
					return Number( el.value );
				}, sliders[ 2 ] )
			).toStrictEqual( globalRadius );

			expect( buttonRadius ).toStrictEqual( 18 );
			expect( dataTableRadius ).toStrictEqual( 36 );

			// Moving the global slider now should not update the button or data table.
			globalRadius = await moveRangeSlider( sliders[ 0 ], 0.1 );

			expect(
				await page.evaluate( el => {
					return Number( el.value );
				}, sliders[ 2 ] )
			).toStrictEqual( globalRadius );

			expect(
				await page.evaluate( el => {
					return Number( el.value );
				}, sliders[ 1 ] )
			).toStrictEqual( buttonRadius );

			expect(
				await page.evaluate( el => {
					return Number( el.value );
				}, sliders[ 4 ] )
			).toStrictEqual( dataTableRadius );
		} );

		it( 'should reset an individual slider', async () => {
			const sliders = await page.$$(
				'.components-range-control__slider'
			);
			const linkToGlobalBtns = await page.$$(
				'.range-slider-control-body__item .components-button:not(.is-pressed)'
			);

			let globalRadius = await moveRangeSlider( sliders[ 0 ], 0.25 );
			const buttonRadius = await moveRangeSlider( sliders[ 1 ], 0.5 );

			expect(
				await page.evaluate( el => {
					return Number( el.value );
				}, sliders[ 1 ] )
			).toStrictEqual( buttonRadius );

			await page.evaluate( el => el.click(), linkToGlobalBtns[ 0 ] );

			expect(
				await page.evaluate( el => {
					return Number( el.value );
				}, sliders[ 1 ] )
			).toStrictEqual( globalRadius );

			// Moving the global slider now should update the button.
			globalRadius = await moveRangeSlider( sliders[ 0 ], 0.1 );

			expect(
				await page.evaluate( el => {
					return Number( el.value );
				}, sliders[ 1 ] )
			).toStrictEqual( globalRadius );
		} );

		it( 'should reset all sliders on global reset', async () => {
			const reset = await page.$( '.global-range-slider-reset' );

			await page.evaluate( el => el.click(), reset );
			await page.evaluate( el => {
				el.click();
			}, await page.$( '.range-slider-control-settings-expanded' ) );

			const sliders = await page.$$(
				'.components-range-control__slider'
			);
			const globalRadius = await moveRangeSlider( sliders[ 0 ], 0.25 );

			expect(
				await page.evaluate( el => {
					return Number( el.value );
				}, sliders[ 1 ] )
			).toStrictEqual( globalRadius );

			expect(
				await page.evaluate( el => {
					return Number( el.value );
				}, sliders[ 4 ] )
			).toStrictEqual( globalRadius );
		} );
	} );
} );
