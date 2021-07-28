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

/* istanbul ignore file */
/* eslint-disable */

/**
 * Utils for color and accessibility.
 *
 * Some of the code in this file is copied over from https://material.io/resources/color
 * The rest are wrappers around https://github.com/bgrins/TinyColor
 */

/**
 * External dependencies
 */
import tinycolor from 'tinycolor2';

/**
 * WordPress dependencies
 */
import {__} from '@wordpress/i18n';

const colorUtils = {
	getColorAccessibility: (color, name, textColor, textColorLabel) => {
		const accessibility = {
			hex: color,
			type: name.replace(/Text on\s*|\s*Color/, ''),
			variations: [
				{
					size: __('Large', 'material-design'),
					colorHex: color,
					textColor: textColorLabel,
					textColorHex: textColor,
					result: colorUtils.getCustomTextColorInfo(
						'large',
						color,
						textColor
					),
				},
				{
					size: __('Normal', 'material-design'),
					colorHex: color,
					textColor: textColorLabel,
					textColorHex: textColor,
					result: colorUtils.getCustomTextColorInfo(
						'large',
						color,
						textColor
					),
				},
			],
		};

		return accessibility;
	},
	getCustomTextColorInfo: function (size, color, textColor) {
		var t = this.getCustomTextAlphas(size, color, textColor);
		return (
			(t.minAlpha = t.minAlpha ? Math.round(100 * t.minAlpha) : null),
				null === t.minAlpha ? null : 'min ' + t.minAlpha + '% opacity'
		);
	},

	getCustomTextAlphas: function (size, color, textColor) {
		return this.getMinAndRecAlphasFromBgAndTextColors(color, textColor, size);
	},
	getMinAndRecAlphasFromBgAndTextColors: function ( color, textColor ) {
		var r =	arguments.length <= 2 || void 0 === arguments[2] ? 'large' : arguments[2],
			o = 'large' === r ? 3 : 4.5,
			i = this.minAcceptableAlpha(color, textColor, o);
		return {
			minAlpha: i,
			recAlpha: i ? Math.max(i, 0.87) : null,
		};
	},
	minAcceptableAlpha: function (color, textColor, r) {
		var o = this.hex2Rgb(color),
			i = this.hex2Rgb(textColor),
			n = 0,
			c = 1,
			a = this.blendForegroundContrast(o, i, n);
		if (a >= r) return null;
		var l = this.blendForegroundContrast(o, i, c);
		if (r > l) return null;
		for (var s = 0, m = 10, d = 0.01; m >= s && c - n > d;) {
			var h = (n + c) / 2,
				p = this.blendForegroundContrast(o, i, h);
			r > p ? (n = h) : (c = h), ++s;
		}
		return s > m ? null : c;
	},
	blendForegroundContrast: function (foregroundColor, backgroundColor, ratio) {
		if (1 > ratio) {
			var rgba = this.overlayOn(foregroundColor, backgroundColor, ratio);
			return this.opaqueContrast(rgba, foregroundColor);
		}
		return this.opaqueContrast(foregroundColor, backgroundColor);
	},
	overlayOn: function (foregroundColor, backgroundColor, ratio) {
		var rgba = {};
		return ratio >= 1
			? foregroundColor
			: ((rgba.r = backgroundColor.r * ratio + foregroundColor.r * (1 - ratio)),
				(rgba.g = backgroundColor.g * ratio + foregroundColor.g * (1 - ratio)),
				(rgba.b = backgroundColor.b * ratio + foregroundColor.b * (1 - ratio)),
				(rgba.a = ratio + 1 * (1 - ratio)),
				rgba);
	},
	opaqueContrast: function (rgb1, rgb2) {
		var l2 = tinycolor(rgb2).getLuminance() + 0.05,
			l1 = tinycolor(rgb1).getLuminance() + 0.05,
			n = l2 / l1;
		return l1 > l2 && (n = 1 / n), n;
	},


	hex2Rgb: function (color) {
		if (!color) return null;
		var t = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
		color = color.replace(t, function (e, t, r, o) {
			return t + t + r + r + o + o;
		});
		var r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color);
		return r
			? {
				r: parseInt(r[1], 16),
				g: parseInt(r[2], 16),
				b: parseInt(r[3], 16),
			}
			: null;
	},


	hexToRgbValues: function (hex) {
		let rgb = tinycolor(hex).toRgb()
		return [rgb.r, rgb.r, rgb.b]
	},


	hexToRgbString: function (hex) {
		return tinycolor(hex).toRgbString()
	},

	mix: function ( color1, color2, amount = 50 ) {
		return tinycolor.mix(color1, color2, amount = 50).toHexString()
	},
	getColorRangeFromHex: function( hex ) {
		const range = {},
			dark = tinycolor( hex )
				.darken(10)
				.toHexString(),
			light = tinycolor( hex )
				.brighten(10)
				.toHexString();

		range.dark = {
			hex: dark,
		};

		range.light = {
			hex: light,
		};

		return range;
	},

};

export default colorUtils;
