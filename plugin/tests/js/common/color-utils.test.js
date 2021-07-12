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
	it( 'test round', () => {
		expect( colorUtils.round( 10.01233644 ) ).toBe( 10 );
		expect( colorUtils.round( 10.99933644 ) ).toBe( 11 );
	} );

	it( 'test getAccessibilityValuesFromHex', () => {
		expect(
			colorUtils.getAccessibilityValuesFromHex( '#ffffff' )
		).toStrictEqual( {
			criterias: {
				black: {
					large: {
						criteria: {
							large: true,
							ratio: 3,
							textColor: '#000000',
							titlePriority: 3,
						},
						minAlpha: 0.421875,
						preferredNormalColor: '#000000',
						preferredTitleColor: '#000000',
						preferredTitleRecAlpha: 0.87,
						preferredTitleRgba: 'rgba(0, 0, 0, 0.87)',
						recAlpha: 0.87,
					},
					normal: {
						criteria: {
							large: false,
							ratio: 4.5,
							textColor: '#000000',
							titlePriority: 1,
						},
						minAlpha: 0.5390625,
						preferredNormalColor: '#000000',
						preferredTitleColor: '#000000',
						preferredTitleRecAlpha: 0.87,
						preferredTitleRgba: 'rgba(0, 0, 0, 0.87)',
						recAlpha: 0.87,
					},
				},
			},
			defaults: [
				{
					criteria: {
						large: false,
						ratio: 4.5,
						textColor: '#000000',
						titlePriority: 1,
					},
					minAlpha: 0.5390625,
					preferredNormalColor: '#000000',
					preferredTitleColor: '#000000',
					preferredTitleRecAlpha: 0.87,
					preferredTitleRgba: 'rgba(0, 0, 0, 0.87)',
					recAlpha: 0.87,
				},
				{
					criteria: {
						large: true,
						ratio: 3,
						textColor: '#000000',
						titlePriority: 3,
					},
					minAlpha: 0.421875,
					preferredNormalColor: '#000000',
					preferredTitleColor: '#000000',
					preferredTitleRecAlpha: 0.87,
					preferredTitleRgba: 'rgba(0, 0, 0, 0.87)',
					recAlpha: 0.87,
				},
			],
			preferredNormalColor: '#000000',
			preferredTitleColor: '#000000',
			preferredTitleRecAlpha: 0.87,
			preferredTitleRgba: 'rgba(0, 0, 0, 0.87)',
		} );
	} );

	it( 'test getMinAndRecAlphasFromBgAndTextColors', () => {
		expect(
			colorUtils.getMinAndRecAlphasFromBgAndTextColors( '#ffffff', '#000000' )
		).toStrictEqual( { minAlpha: 0.421875, recAlpha: 0.87 } );
	} );

	it( 'test getMinAndRecAlphasFromBgAndTextColors_yellow', () => {
		expect(
			colorUtils.getMinAndRecAlphasFromBgAndTextColors( '#ffffff', '#ffff00' )
		).toStrictEqual( { minAlpha: null, recAlpha: null } );
	} );

	it( 'test getMinAndRecAlphasFromBgAndTextColors_gray', () => {
		expect(
			colorUtils.getMinAndRecAlphasFromBgAndTextColors( '#ffffff', '#868686' )
		).toStrictEqual( { minAlpha: 0.8828125, recAlpha: 0.8828125 } );
	} );

	it( 'test getMinAndRecAlphasFromBgAndTextColors_large', () => {
		expect(
			colorUtils.getMinAndRecAlphasFromBgAndTextColors(
				'#ffffff',
				'#939292',
				'large'
			)
		).toStrictEqual( { minAlpha: 0.9765625, recAlpha: 0.9765625 } );
	} );

	it( 'test minAcceptableAlpha_3', () => {
		expect(
			colorUtils.minAcceptableAlpha( '#ffffff', '#939292', 3 )
		).toStrictEqual( 0.9765625 );
	} );

	it( 'test minAcceptableAlpha_4.5', () => {
		expect(
			colorUtils.minAcceptableAlpha( '#ffffff', '#939292', 4.5 )
		).toBeNull();
	} );

	it( 'test hex2Rgb', () => {
		expect( colorUtils.hex2Rgb( '#ffffff' ) ).toStrictEqual( {
			b: 255,
			g: 255,
			r: 255,
		} );
	} );

	it( 'test hex2Rgb_grey', () => {
		expect( colorUtils.hex2Rgb( '#a1a1a1' ) ).toStrictEqual( {
			b: 161,
			g: 161,
			r: 161,
		} );
	} );
	it( 'test opaqueContrast', () => {
		expect(
			colorUtils.opaqueContrast(
				{ b: 0, g: 0, r: 0 },
				{ b: 255, g: 255, r: 255 }
			)
		).toStrictEqual( 21 );
	} );
	it( 'test opaqueContrast_low', () => {
		expect(
			colorUtils.opaqueContrast( { r: 0, g: 0, b: 0 }, { r: 10, g: 10, b: 10 } )
		).toStrictEqual( 1.0607053967097675 );
	} );

	it( 'test blendForegroundContrast', () => {
		expect(
			colorUtils.blendForegroundContrast( '#ffffff', '#000000', 0.8 )
		).toStrictEqual( NaN );
	} );

	it( 'test isTextLegibleOverBackground_wb', () => {
		expect(
			colorUtils.isTextLegibleOverBackground( '#ffffff', '#000000' )
		).toStrictEqual( true );
	} );

	it( 'test isTextLegibleOverBackground_wg', () => {
		expect(
			colorUtils.isTextLegibleOverBackground( '#ffffff', '#8e8e8e' )
		).toStrictEqual( false );
	} );

	it( 'test getRgbaFromHexAndAlpha', () => {
		expect( colorUtils.getRgbaFromHexAndAlpha( '#ffffff', 1 ) ).toStrictEqual(
			'rgba(255, 255, 255, 1.00)'
		);
	} );

	it( 'test formatHex', () => {
		expect( colorUtils.formatHex( '#ffffff' ) ).toStrictEqual( '#ffffff' );
	} );
	it( 'test formatHex no #', () => {
		expect( colorUtils.formatHex( 'ffffff' ) ).toStrictEqual( '#ffffff' );
	} );

	it( 'test rgb2Hex', () => {
		expect( colorUtils.rgb2Hex( { r: 0, g: 0, b: 0 } ) ).toStrictEqual(
			'#000000'
		);
	} );

	it( 'test rgb2Hsv', () => {
		expect( colorUtils.rgb2Hsv( 0, 0, 0 ) ).toStrictEqual( {
			h: 0,
			s: 0,
			v: 0,
		} );
	} );

	it( 'test hsv2Rgb', () => {
		expect( colorUtils.hsv2Rgb( 0, 0, 0 ) ).toStrictEqual( {
			r: 0,
			g: 0,
			b: 0,
		} );
	} );

	it( 'test hex2Hsv', () => {
		expect( colorUtils.hex2Hsv( '#ffffff' ) ).toStrictEqual( {
			h: 120,
			s: 0.996078431372549,
			v: 1,
		} );
	} );
	it( 'test hsv2Hex', () => {
		expect( colorUtils.hsv2Hex( 0, 0, 0 ) ).toStrictEqual( '#000000' );
	} );

	it( 'test getLFromHex', () => {
		expect( colorUtils.getLFromHex( '#8e8e8e' ) ).toStrictEqual(
			0.2704977910130658
		);
	} );
	it( 'test rgba2rgb', () => {
		expect(
			colorUtils.rgba2rgb( { b: 100, g: 100, r: 100, a: 1 } )
		).toStrictEqual( { b: 100, g: 100, r: 100 } );
	} );
	it( 'test getLFromRgbValue', () => {
		expect( colorUtils.getLFromRgbValue( 100 ) ).toStrictEqual(
			0.12743768043564743
		);
	} );

	it( 'test rgba2hex', () => {
		expect(
			colorUtils.rgba2hex( { b: 100, g: 100, r: 100, a: 1 } )
		).toStrictEqual( '#646464' );
	} );

	it( 'test darkenHex', () => {
		expect( colorUtils.darkenHex( '#a1a1a1', 20 ) ).toStrictEqual( '#fefef3' );
	} );

	// it( 'test darkenRgb', () => {
	// 	expect(
	// 		colorUtils.darkenRgb( { b: 161, g: 161, r: 161 }, 20 )
	// 	).toStrictEqual( 'ooo' );
	// } );

	it( 'test lightenHex', () => {
		expect( colorUtils.lightenHex( '#a1a1a1', 20 ) ).toStrictEqual( '#0100f9' );
	} );

	// it( 'test lightenRgb', () => {
	// 	expect(
	// 		colorUtils.lightenRgb( { b: 161, g: 161, r: 161 }, 20 )
	// 	).toStrictEqual( 'ooo' );
	// } );

	it( 'test getColorRangeFromHex', () => {
		expect( colorUtils.getColorRangeFromHex( '#a1a1a1' ) ).toStrictEqual( {
			dark: {
				accessibility: {
					criterias: {
						black: {
							large: {
								criteria: {
									large: true,
									ratio: 3,
									textColor: '#000000',
									titlePriority: 3,
								},
								minAlpha: 0.6328125,
								preferredNormalColor: '#ffffff',
								preferredTitleColor: '#ffffff',
								preferredTitleRecAlpha: 0.87,
								preferredTitleRgba: 'rgba(255, 255, 255, 0.87)',
								recAlpha: 0.87,
							},
						},
						white: {
							large: {
								criteria: {
									large: true,
									ratio: 3,
									textColor: '#ffffff',
									titlePriority: 4,
								},
								minAlpha: 0.6484375,
								preferredNormalColor: '#ffffff',
								preferredTitleColor: '#ffffff',
								preferredTitleRecAlpha: 0.87,
								preferredTitleRgba: 'rgba(255, 255, 255, 0.87)',
								recAlpha: 0.87,
							},
							normal: {
								criteria: {
									large: false,
									ratio: 4.5,
									textColor: '#ffffff',
									titlePriority: 2,
								},
								minAlpha: 0.9609375,
								preferredNormalColor: '#ffffff',
								preferredTitleColor: '#ffffff',
								preferredTitleRecAlpha: 0.87,
								preferredTitleRgba: 'rgba(255, 255, 255, 0.87)',
								recAlpha: 0.9609375,
							},
						},
					},
					defaults: [
						{
							criteria: {
								large: false,
								ratio: 4.5,
								textColor: '#ffffff',
								titlePriority: 2,
							},
							minAlpha: 0.9609375,
							preferredNormalColor: '#ffffff',
							preferredTitleColor: '#ffffff',
							preferredTitleRecAlpha: 0.87,
							preferredTitleRgba: 'rgba(255, 255, 255, 0.87)',
							recAlpha: 0.9609375,
						},
						{
							criteria: {
								large: true,
								ratio: 3,
								textColor: '#ffffff',
								titlePriority: 4,
							},
							minAlpha: 0.6484375,
							preferredNormalColor: '#ffffff',
							preferredTitleColor: '#ffffff',
							preferredTitleRecAlpha: 0.87,
							preferredTitleRgba: 'rgba(255, 255, 255, 0.87)',
							recAlpha: 0.87,
						},
						{
							criteria: {
								large: true,
								ratio: 3,
								textColor: '#000000',
								titlePriority: 3,
							},
							minAlpha: 0.6328125,
							preferredNormalColor: '#ffffff',
							preferredTitleColor: '#ffffff',
							preferredTitleRecAlpha: 0.87,
							preferredTitleRgba: 'rgba(255, 255, 255, 0.87)',
							recAlpha: 0.87,
						},
					],
					preferredNormalColor: '#ffffff',
					preferredTitleColor: '#ffffff',
					preferredTitleRecAlpha: 0.87,
					preferredTitleRgba: 'rgba(255, 255, 255, 0.87)',
				},
				hex: '#737373',
			},
			light: {
				accessibility: {
					criterias: {
						black: {
							large: {
								criteria: {
									large: true,
									ratio: 3,
									textColor: '#000000',
									titlePriority: 3,
								},
								minAlpha: 0.4453125,
								preferredNormalColor: '#000000',
								preferredTitleColor: '#000000',
								preferredTitleRecAlpha: 0.87,
								preferredTitleRgba: 'rgba(0, 0, 0, 0.87)',
								recAlpha: 0.87,
							},
							normal: {
								criteria: {
									large: false,
									ratio: 4.5,
									textColor: '#000000',
									titlePriority: 1,
								},
								minAlpha: 0.5703125,
								preferredNormalColor: '#000000',
								preferredTitleColor: '#000000',
								preferredTitleRecAlpha: 0.87,
								preferredTitleRgba: 'rgba(0, 0, 0, 0.87)',
								recAlpha: 0.87,
							},
						},
					},
					defaults: [
						{
							criteria: {
								large: false,
								ratio: 4.5,
								textColor: '#000000',
								titlePriority: 1,
							},
							minAlpha: 0.5703125,
							preferredNormalColor: '#000000',
							preferredTitleColor: '#000000',
							preferredTitleRecAlpha: 0.87,
							preferredTitleRgba: 'rgba(0, 0, 0, 0.87)',
							recAlpha: 0.87,
						},
						{
							criteria: {
								large: true,
								ratio: 3,
								textColor: '#000000',
								titlePriority: 3,
							},
							minAlpha: 0.4453125,
							preferredNormalColor: '#000000',
							preferredTitleColor: '#000000',
							preferredTitleRecAlpha: 0.87,
							preferredTitleRgba: 'rgba(0, 0, 0, 0.87)',
							recAlpha: 0.87,
						},
					],
					preferredNormalColor: '#000000',
					preferredTitleColor: '#000000',
					preferredTitleRecAlpha: 0.87,
					preferredTitleRgba: 'rgba(0, 0, 0, 0.87)',
				},
				hex: '#d2d2d2',
			},
		} );
	} );
	it( 'test getLFromRgbColor', () => {
		expect(
			colorUtils.getLFromRgbColor( { b: 100, g: 100, r: 100 } )
		).toStrictEqual( 0.12743768043564743 );
	} );
	it( 'test generateColorFromHex', () => {
		expect( colorUtils.generateColorFromHex( '#a1a1a1' ) ).toStrictEqual( {
			accessibility: {
				criterias: {
					black: {
						large: {
							criteria: {
								large: true,
								ratio: 3,
								textColor: '#000000',
								titlePriority: 3,
							},
							minAlpha: 0.4921875,
							preferredNormalColor: '#000000',
							preferredTitleColor: '#000000',
							preferredTitleRecAlpha: 0.87,
							preferredTitleRgba: 'rgba(0, 0, 0, 0.87)',
							recAlpha: 0.87,
						},
						normal: {
							criteria: {
								large: false,
								ratio: 4.5,
								textColor: '#000000',
								titlePriority: 1,
							},
							minAlpha: 0.65625,
							preferredNormalColor: '#000000',
							preferredTitleColor: '#000000',
							preferredTitleRecAlpha: 0.87,
							preferredTitleRgba: 'rgba(0, 0, 0, 0.87)',
							recAlpha: 0.87,
						},
					},
				},
				defaults: [
					{
						criteria: {
							large: false,
							ratio: 4.5,
							textColor: '#000000',
							titlePriority: 1,
						},
						minAlpha: 0.65625,
						preferredNormalColor: '#000000',
						preferredTitleColor: '#000000',
						preferredTitleRecAlpha: 0.87,
						preferredTitleRgba: 'rgba(0, 0, 0, 0.87)',
						recAlpha: 0.87,
					},
					{
						criteria: {
							large: true,
							ratio: 3,
							textColor: '#000000',
							titlePriority: 3,
						},
						minAlpha: 0.4921875,
						preferredNormalColor: '#000000',
						preferredTitleColor: '#000000',
						preferredTitleRecAlpha: 0.87,
						preferredTitleRgba: 'rgba(0, 0, 0, 0.87)',
						recAlpha: 0.87,
					},
				],
				preferredNormalColor: '#000000',
				preferredTitleColor: '#000000',
				preferredTitleRecAlpha: 0.87,
				preferredTitleRgba: 'rgba(0, 0, 0, 0.87)',
			},
			hex: '#a1a1a1',
			range: {
				dark: {
					accessibility: {
						criterias: {
							black: {
								large: {
									criteria: {
										large: true,
										ratio: 3,
										textColor: '#000000',
										titlePriority: 3,
									},
									minAlpha: 0.6328125,
									preferredNormalColor: '#ffffff',
									preferredTitleColor: '#ffffff',
									preferredTitleRecAlpha: 0.87,
									preferredTitleRgba: 'rgba(255, 255, 255, 0.87)',
									recAlpha: 0.87,
								},
							},
							white: {
								large: {
									criteria: {
										large: true,
										ratio: 3,
										textColor: '#ffffff',
										titlePriority: 4,
									},
									minAlpha: 0.6484375,
									preferredNormalColor: '#ffffff',
									preferredTitleColor: '#ffffff',
									preferredTitleRecAlpha: 0.87,
									preferredTitleRgba: 'rgba(255, 255, 255, 0.87)',
									recAlpha: 0.87,
								},
								normal: {
									criteria: {
										large: false,
										ratio: 4.5,
										textColor: '#ffffff',
										titlePriority: 2,
									},
									minAlpha: 0.9609375,
									preferredNormalColor: '#ffffff',
									preferredTitleColor: '#ffffff',
									preferredTitleRecAlpha: 0.87,
									preferredTitleRgba: 'rgba(255, 255, 255, 0.87)',
									recAlpha: 0.9609375,
								},
							},
						},
						defaults: [
							{
								criteria: {
									large: false,
									ratio: 4.5,
									textColor: '#ffffff',
									titlePriority: 2,
								},
								minAlpha: 0.9609375,
								preferredNormalColor: '#ffffff',
								preferredTitleColor: '#ffffff',
								preferredTitleRecAlpha: 0.87,
								preferredTitleRgba: 'rgba(255, 255, 255, 0.87)',
								recAlpha: 0.9609375,
							},
							{
								criteria: {
									large: true,
									ratio: 3,
									textColor: '#ffffff',
									titlePriority: 4,
								},
								minAlpha: 0.6484375,
								preferredNormalColor: '#ffffff',
								preferredTitleColor: '#ffffff',
								preferredTitleRecAlpha: 0.87,
								preferredTitleRgba: 'rgba(255, 255, 255, 0.87)',
								recAlpha: 0.87,
							},
							{
								criteria: {
									large: true,
									ratio: 3,
									textColor: '#000000',
									titlePriority: 3,
								},
								minAlpha: 0.6328125,
								preferredNormalColor: '#ffffff',
								preferredTitleColor: '#ffffff',
								preferredTitleRecAlpha: 0.87,
								preferredTitleRgba: 'rgba(255, 255, 255, 0.87)',
								recAlpha: 0.87,
							},
						],
						preferredNormalColor: '#ffffff',
						preferredTitleColor: '#ffffff',
						preferredTitleRecAlpha: 0.87,
						preferredTitleRgba: 'rgba(255, 255, 255, 0.87)',
					},
					hex: '#737373',
				},
				light: {
					accessibility: {
						criterias: {
							black: {
								large: {
									criteria: {
										large: true,
										ratio: 3,
										textColor: '#000000',
										titlePriority: 3,
									},
									minAlpha: 0.4453125,
									preferredNormalColor: '#000000',
									preferredTitleColor: '#000000',
									preferredTitleRecAlpha: 0.87,
									preferredTitleRgba: 'rgba(0, 0, 0, 0.87)',
									recAlpha: 0.87,
								},
								normal: {
									criteria: {
										large: false,
										ratio: 4.5,
										textColor: '#000000',
										titlePriority: 1,
									},
									minAlpha: 0.5703125,
									preferredNormalColor: '#000000',
									preferredTitleColor: '#000000',
									preferredTitleRecAlpha: 0.87,
									preferredTitleRgba: 'rgba(0, 0, 0, 0.87)',
									recAlpha: 0.87,
								},
							},
						},
						defaults: [
							{
								criteria: {
									large: false,
									ratio: 4.5,
									textColor: '#000000',
									titlePriority: 1,
								},
								minAlpha: 0.5703125,
								preferredNormalColor: '#000000',
								preferredTitleColor: '#000000',
								preferredTitleRecAlpha: 0.87,
								preferredTitleRgba: 'rgba(0, 0, 0, 0.87)',
								recAlpha: 0.87,
							},
							{
								criteria: {
									large: true,
									ratio: 3,
									textColor: '#000000',
									titlePriority: 3,
								},
								minAlpha: 0.4453125,
								preferredNormalColor: '#000000',
								preferredTitleColor: '#000000',
								preferredTitleRecAlpha: 0.87,
								preferredTitleRgba: 'rgba(0, 0, 0, 0.87)',
								recAlpha: 0.87,
							},
						],
						preferredNormalColor: '#000000',
						preferredTitleColor: '#000000',
						preferredTitleRecAlpha: 0.87,
						preferredTitleRgba: 'rgba(0, 0, 0, 0.87)',
					},
					hex: '#d2d2d2',
				},
			},
		} );
	} );

	it( 'test getLuminance_black', () => {
		expect( colorUtils.getLuminance( 0, 0, 0 ) ).toBe( 0 );
	} );

	it( 'test getLuminance_white', () => {
		expect( colorUtils.getLuminance( 255, 255, 255 ) ).toBe( 1 );
	} );
	it( 'test getContrastRatio', () => {
		expect( colorUtils.getContrastRatio( '#ffffff', '#000000' ) ).toBe( 21 );
	} );
	it( 'test getContrastRatio_2.84', () => {
		expect( colorUtils.getContrastRatio( '#ffffff', '#999999' ) ).toBe(
			2.849027755287037
		);
	} );

	it( 'test contrastRatio', () => {
		expect( colorUtils.contrastRatio( 1, 0 ) ).toBe( 21 );
	} );

	it( 'hexToRgb', () => {
		expect( colorUtils.hexToRgb( '#ffffff' ) ).toStrictEqual( [
			255,
			255,
			255,
		] );
	} );
} );
