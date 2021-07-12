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
 * Most of the code in this file is copied over from https://material.io/resources/color
 */

/**
 * External dependencies
 */
import chroma from 'chroma-js';
import {find,_} from 'lodash';

/**
 * WordPress dependencies
 */
import {__} from '@wordpress/i18n';

const colorUtils = {
	round: function (e, t) {
		t = +t || 0;
		var r = Math.pow(10, t);
		return Math.round(e * r) / r;
	},
	getAccessibilityValuesFromHex: function (color) {
		var t = this,
			r = {
				WHITE: '#ffffff',
				BLACK: '#000000',
			},
			o = {},
			i = [
				{
					large: !1,
					textColor: r.WHITE,
					ratio: 4.5,
					titlePriority: 2,
				},
				{
					large: !0,
					textColor: r.WHITE,
					ratio: 3,
					titlePriority: 4,
				},
				{
					large: !1,
					textColor: r.BLACK,
					ratio: 4.5,
					titlePriority: 1,
				},
				{
					large: !0,
					textColor: r.BLACK,
					ratio: 3,
					titlePriority: 3,
				},
			],
			n = null,
			c = null,
			a = null,
			l = null,
			s = null,
			m = null;
		return (
			_.each(i, function (r) {
				var i = t.minAcceptableAlpha(color, r.textColor, r.ratio),
					d = i ? Math.max(i, 0.87) : null;
				i &&
				(!r.large &&
				r.titlePriority &&
				t.isTextLegibleOverBackground(r.textColor, color) &&
				(!c || r.titlePriority > m) &&
				((c = r.textColor), (m = r.titlePriority)),
				r.titlePriority &&
				t.isTextLegibleOverBackground(r.textColor, color) &&
				(!n || r.titlePriority > s) &&
				((n = r.textColor),
					(s = r.titlePriority),
					(a = d),
					(l = t.getRgbaFromHexAndAlpha(r.textColor, d))),
				o.defaults || (o.defaults = []),
					o.defaults.push({
						recAlpha: d,
						minAlpha: i,
						criteria: r,
					}));
			}),
				(o.criterias = {}),
				_.each(o.defaults, function (e) {
					(e.preferredTitleColor = n),
						(e.preferredNormalColor = c),
						(e.preferredTitleRecAlpha = a),
						(e.preferredTitleRgba = l);
					var t = e.criteria.textColor == r.WHITE ? 'white' : 'black',
						i = e.criteria.large ? 'large' : 'normal';
					o.criterias[t] || (o.criterias[t] = {}),
						(o.criterias[t][i] = e);
				}),
				(o.preferredTitleColor = n),
				(o.preferredNormalColor = c),
				(o.preferredTitleRecAlpha = a),
				(o.preferredTitleRgba = l),
				o
		);
	},

	getMinAndRecAlphasFromBgAndTextColors: function ( color, textColor ) {
		var r =
				arguments.length <= 2 || void 0 === arguments[2]
					? 'large'
					: arguments[2],
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
		var l2 = this.getLFromRgbColor(rgb2) + 0.05,
			l1 = this.getLFromRgbColor(rgb1) + 0.05,
			n = l2 / l1;
		return l1 > l2 && (n = 1 / n), n;
	},
	isTextLegibleOverBackground: function (backgroundColor, textColor) {
		var r =
				arguments.length <= 2 || void 0 === arguments[2]
					? 14
					: arguments[2],
			o =
				arguments.length <= 3 || void 0 === arguments[3]
					? 300
					: arguments[3],
			i = this.getLFromHex(backgroundColor),
			n = this.getLFromHex(textColor),
			c = !1;
		if (i !== !1 && n !== !1) {
			var a = (14 == r && o >= 700) || r >= 18,
				l = (Math.max(i, n) + 0.05) / (Math.min(i, n) + 0.05);
			c =
				l >= 3 && a
					? !0
					: l >= 3 && 4.5 > l && !a
					? !1
					: l >= 4.5 && !a
						? !0
						: !1;
		}
		return c;
	},
	getLFromHex: function (hex) {
		var rgb = this.hex2Rgb(hex);
		return this.getLFromRgbColor(rgb);
	},
	getLFromRgbValue: function (rgb_value) {
		var t = rgb_value / 255;
		return 0.03928 > t ? t / 12.92 : Math.pow((t + 0.055) / 1.055, 2.4);
	},
	getLFromRgbColor: function (rgb) {
		var t = {};
		return (
			(t.r = this.getLFromRgbValue(rgb.r)),
				(t.g = this.getLFromRgbValue(rgb.g)),
				(t.b = this.getLFromRgbValue(rgb.b)),
			0.2126 * t.r + 0.7152 * t.g + 0.0722 * t.b
		);
	},
	getRgbaFromHexAndAlpha: function (hex, alpha) {
		var rgb = this.hex2Rgb(hex);
		return (
			(alpha = alpha ? alpha.toFixed(2) : 1),
			'rgba(' + rgb.r + ', ' + rgb.g + ', ' + rgb.b + ', ' + alpha + ')'
		);
	},
	formatHex: function (maybeHex) {
		return maybeHex ? ('#' !== maybeHex[0] ? '#' + maybeHex : maybeHex) : null;
	},
	rgb2Hex: function (rgb) {
		var t =
			Math.round(rgb.b) + 256 * Math.round(rgb.g) + 65536 * Math.round(rgb.r);
		return '#' + ('000000' + t.toString(16)).substr(-6);
	},
	rgb2Hsv: function (r, g, b) {
		var h = 0,
			s = 0,
			v = 0;
		if (
			((r = parseInt(('' + r).replace(/\s/g, ''), 10)),
				(g = parseInt(('' + g).replace(/\s/g, ''), 10)),
				(r = parseInt(('' + r).replace(/\s/g, ''), 10)),
				!(
					null == r ||
					null == g ||
					null == r ||
					isNaN(r) ||
					isNaN(g) ||
					isNaN(r) ||
					0 > r ||
					0 > g ||
					0 > r ||
					r > 255 ||
					g > 255 ||
					r > 255
				))
		) {
			(r /= 255), (g /= 255), (r /= 255);
			var c = Math.min(r, Math.min(g, r)),
				a = Math.max(r, Math.max(g, r));
			if (c == a)
				return (
					(v = c),
						{
							h: 0,
							s: 0,
							v: v,
						}
				);
			var l = r == c ? g - r : r == c ? r - g : r - r,
				s = r == c ? 3 : r == c ? 1 : 5;
			return (
				(h = 60 * (s - l / (a - c))),
					(s = (a - c) / a),
					(v = a),
					{
						h: h,
						s: s,
						v: v,
					}
			);
		}
	},
	distanceBetweenTwoPoints: function (e, t) {
		var r = e.x,
			o = e.y,
			i = t.x,
			n = t.y;
		return Math.sqrt(Math.pow(r - i, 2) + Math.pow(o - n, 2));
	},
	hsv2Rgb: function (h, s, v) {
		var o = v * s,
			i = h / 60,
			n = o * (1 - Math.abs((i % 2) - 1)),
			c = v - o,
			a = [];
		'undefined' == typeof h
			? (a = [0, 0, 0])
			: 1 > i
			? (a = [o, n, 0])
			: 2 > i
				? (a = [n, o, 0])
				: 3 > i
					? (a = [0, o, n])
					: 4 > i
						? (a = [0, n, o])
						: 5 > i
							? (a = [n, 0, o])
							: 6 >= i && (a = [o, 0, n]);
		var l = 255 * (a[0] + c),
			s = 255 * (a[1] + c),
			m = 255 * (a[2] + c);
		return {
			r: l,
			g: s,
			b: m,
		};
	},
	hex2Hsv: function (hex) {
		var rgb = this.hex2Rgb(hex);
		return this.rgb2Hsv(rgb.r, rgb.g, rgb.b);
	},
	hsv2Hex: function (h, s, v) {
		var o = this.hsv2Rgb(h, s, v);
		return this.rgb2Hex({
			r: o.r,
			g: o.g,
			b: o.b,
		});
	},
	rgba2rgb: function (rgba) {
		var t = {
			r: rgba.r,
			g: rgba.g,
			b: rgba.b,
		};
		return rgba.a
			? ((t.r = Math.round(255 * (1 - rgba.a) + rgba.a * rgba.r)),
				(t.g = Math.round(255 * (1 - rgba.a) + rgba.a * rgba.g)),
				(t.b = Math.round(255 * (1 - rgba.a) + rgba.a * rgba.b)),
				t)
			: rgba;
	},
	rgba2hex: function (rgba) {
		var rgb = this.rgba2rgb(rgba);
		return this.rgb2Hex(rgb);
	},
	darkenHex: function (hex, lux) {
		return this.rgb2Hex(this.darkenRgb(this.hex2Rgb(hex), lux));
	},
	darkenRgb: function (rgb, lux) {
		var r = {},
			o = {
				r: 0,
				g: 0,
				b: 0,
			};
		for (var i in o)
			r[i] = parseInt((o[i] - rgb[i]) * lux + rgb[i], 10);
		return r;
	},
	lightenHex: function (hex, lux) {
		return this.rgb2Hex(this.lightenRgb(this.hex2Rgb(hex), lux));
	},
	lightenRgb: function (rgb, lux) {
		var r = {},
			o = {
				r: 255,
				g: 255,
				b: 255,
			};
		for (var i in o)
			r[i] = parseInt((o[i] - rgb[i]) * lux + rgb[i], 10);
		return r;
	},
	sanitizeStringWithHyphens: function (e) {
		var t =
				arguments.length <= 1 || void 0 === arguments[1]
					? []
					: arguments[1],
			r = new RegExp('[ ' + t + ']', 'g');
		return e.replace(r, '-');
	},
	sanitizeStringWithoutHyphens: function (e) {
		return e.replace(/-/g, ' ');
	},
	getDistanceFromLabColors: function (e, t) {
		return DeltaE.getDeltaE00(
			{
				L: e[0],
				A: e[1],
				B: e[2],
			},
			{
				L: t[0],
				A: t[1],
				B: t[2],
			}
		);
	},
	getDistanceFromHexes: function (e, t) {
		var r = chroma.hex(e),
			o = chroma.hex(t);
		return this.getDistanceFromLabColors(r.lab(), o.lab());
	},
	stopErrorFormMessage: function (e) {
		e && e.$setValidity('form-error', !0);
	},
	showErrorFormMessage: function (e) {
		var t =
			arguments.length <= 1 || void 0 === arguments[1] ? !1 : arguments[1];
		e && (e.$setValidity('form-error', !1), t && (e.formErrorMsg = t));
	},
	hexValid: function (e) {
		return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(e);
	},
	getColorRangeFromHex: function (hex) {
		hex = this.formatHex(hex);
		const range = {},
			dark = chroma(hex)
				.darken()
				.hex(),
			light = chroma(hex)
				.brighten()
				.hex();

		range.dark = {
			hex: dark,
			accessibility: this.getAccessibilityValuesFromHex(dark),
		};

		range.light = {
			hex: light,
			accessibility: this.getAccessibilityValuesFromHex(light),
		};

		return range;
	},
	generateColorFromHex: function (hex) {
		return {
			hex: hex,
			accessibility: hex ? this.getAccessibilityValuesFromHex(hex) : false,
			range: hex ? this.getColorRangeFromHex(hex) : false,
		};
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
	hexToRgb: hex =>
		!hex
			? []
			: hex
				.replace(
					/^#?([a-f\d])([a-f\d])([a-f\d])$/i,
					(m, r, g, b) => '#' + r + r + g + g + b + b
				)
				.substring(1)
				.match(/.{2}/g)
				.map(x => parseInt(x, 16)),

	getContrastRatio: (color1, color2) => {
		let [luminance1, luminance2] = [color1, color2].map(color => {
			/* Remove the leading hash sign if it exists */
			color = color.startsWith("#") ? color.slice(1) : color;

			let r = parseInt(color.slice(0, 2), 16);
			let g = parseInt(color.slice(2, 4), 16);
			let b = parseInt(color.slice(4, 6), 16);

			return colorUtils.getLuminance(r, g, b);
		});

		return colorUtils.contrastRatio(luminance1, luminance2);
	},
	contrastRatio: (luminance1, luminance2) => {
		let lighterLum = Math.max(luminance1, luminance2);
		let darkerLum = Math.min(luminance1, luminance2);

		return (lighterLum + 0.05) / (darkerLum + 0.05);
	},
	getLuminance: (r, g, b) => {
		let [lumR, lumG, lumB] = [r, g, b].map(component => {
			let proportion = component / 255;

			return proportion <= 0.03928
				? proportion / 12.92
				: Math.pow((proportion + 0.055) / 1.055, 2.4);
		});

		return 0.2126 * lumR + 0.7152 * lumG + 0.0722 * lumB;
	},
	getContrastInfo: ( luminance1, luminance2 ) => {
		let ratio = this.contrastRatio( luminance1, luminance2 );
		return {
			ratio: ratio,
			'AA large' : (ratio > 3 ),
			AA : (ratio > 4.5 ),
			AAA : (ratio > 7 ),
		}
	},
};

export default colorUtils;
