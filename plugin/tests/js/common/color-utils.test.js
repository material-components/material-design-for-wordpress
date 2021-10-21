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
 * Internal dependencies
 * plugin/assets/src/common/color-utils.js
 */
import colorUtils from '../../../assets/src/common/color-utils';

describe( 'Color Utiles', () => {
	// keep
	it( 'test getColorAccessibility', () => {
		expect(
			colorUtils.getColorAccessibility(
				'#ffffff',
				'name',
				'#000000',
				'Black'
			)
		).toStrictEqual( {
			hex: '#ffffff',
			type: 'name',
			variations: [
				{
					colorHex: '#ffffff',
					result: 'min 42% opacity',
					size: 'Large',
					textColor: 'Black',
					textColorHex: '#000000',
				},
				{
					colorHex: '#ffffff',
					result: 'min 42% opacity',
					size: 'Normal',
					textColor: 'Black',
					textColorHex: '#000000',
				},
			],
		} );
	} );

	it( 'test getColorAccessibility_b_on_b', () => {
		expect(
			colorUtils.getColorAccessibility(
				'#000000',
				'Black',
				'#000000',
				'Black'
			)
		).toStrictEqual( {
			hex: '#000000',
			type: 'Black',
			variations: [
				{
					colorHex: '#000000',
					result: null,
					size: 'Large',
					textColor: 'Black',
					textColorHex: '#000000',
				},
				{
					colorHex: '#000000',
					result: null,
					size: 'Normal',
					textColor: 'Black',
					textColorHex: '#000000',
				},
			],
		} );
	} );

	it( 'hexToRgb', () => {
		expect( colorUtils.hexToRgbValues( '#ffffff' ) ).toStrictEqual( [
			255,
			255,
			255,
		] );
	} );
	it( 'hexToRgbJoin', () => {
		expect(
			colorUtils.hexToRgbValues( '#ffffff' ).join( ',' )
		).toStrictEqual( '255,255,255' );
	} );

	it( 'hex2Rgb', () => {
		expect( colorUtils.hex2Rgb( '#ffffff' ) ).toStrictEqual( {
			b: 255,
			g: 255,
			r: 255,
		} );
	} );

	it( 'mix', () => {
		expect( colorUtils.mix( '#ffffff', '#000000', 50 ) ).toStrictEqual(
			'#808080'
		);
	} );

	it( 'getColorRangeFromHex', () => {
		expect( colorUtils.getColorRangeFromHex( '#808080' ) ).toStrictEqual( {
			dark: { hex: '#666666' },
			light: { hex: '#999999' },
		} );
	} );

	it( 'getColorRangeFromHex_red', () => {
		expect( colorUtils.getColorRangeFromHex( '#ff0000' ) ).toStrictEqual( {
			dark: { hex: '#cc0000' },
			light: { hex: '#ff1919' },
		} );
	} );
} );
