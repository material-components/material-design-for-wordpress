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
import { find } from 'lodash';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

const colorUtils = {
	round: function( e, t ) {
		t = +t || 0;
		var r = Math.pow( 10, t );
		return Math.round( e * r ) / r;
	},
	getAccessibilityValuesFromHex: function( e ) {
		var t = this,
			r = {
				WHITE: '#ffffff',
				BLACK: '#000000',
			},
			o = {},
			i = [
				{
					large: ! 1,
					textColor: r.WHITE,
					ratio: 4.5,
					titlePriority: 2,
				},
				{
					large: ! 0,
					textColor: r.WHITE,
					ratio: 3,
					titlePriority: 4,
				},
				{
					large: ! 1,
					textColor: r.BLACK,
					ratio: 4.5,
					titlePriority: 1,
				},
				{
					large: ! 0,
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
			_.each( i, function( r ) {
				var i = t.minAcceptableAlpha( e, r.textColor, r.ratio ),
					d = i ? Math.max( i, 0.87 ) : null;
				i &&
					( ! r.large &&
						r.titlePriority &&
						t.isTextLegibleOverBackground( r.textColor, e ) &&
						( ! c || r.titlePriority > m ) &&
						( ( c = r.textColor ), ( m = r.titlePriority ) ),
					r.titlePriority &&
						t.isTextLegibleOverBackground( r.textColor, e ) &&
						( ! n || r.titlePriority > s ) &&
						( ( n = r.textColor ),
						( s = r.titlePriority ),
						( a = d ),
						( l = t.getRgbaFromHexAndAlpha( r.textColor, d ) ) ),
					o.defaults || ( o.defaults = [] ),
					o.defaults.push( {
						recAlpha: d,
						minAlpha: i,
						criteria: r,
					} ) );
			} ),
			( o.criterias = {} ),
			_.each( o.defaults, function( e ) {
				( e.preferredTitleColor = n ),
					( e.preferredNormalColor = c ),
					( e.preferredTitleRecAlpha = a ),
					( e.preferredTitleRgba = l );
				var t = e.criteria.textColor == r.WHITE ? 'white' : 'black',
					i = e.criteria.large ? 'large' : 'normal';
				o.criterias[ t ] || ( o.criterias[ t ] = {} ),
					( o.criterias[ t ][ i ] = e );
			} ),
			( o.preferredTitleColor = n ),
			( o.preferredNormalColor = c ),
			( o.preferredTitleRecAlpha = a ),
			( o.preferredTitleRgba = l ),
			o
		);
	},
	getMinAndRecAlphasFromBgAndTextColors: function( e, t ) {
		var r =
				arguments.length <= 2 || void 0 === arguments[ 2 ]
					? 'large'
					: arguments[ 2 ],
			o = 'large' === r ? 3 : 4.5,
			i = this.minAcceptableAlpha( e, t, o );
		return {
			minAlpha: i,
			recAlpha: i ? Math.max( i, 0.87 ) : null,
		};
	},
	minAcceptableAlpha: function( e, t, r ) {
		var o = this.hex2Rgb( e ),
			i = this.hex2Rgb( t ),
			n = 0,
			c = 1,
			a = this.blendForegroundContrast( o, i, n );
		if ( a >= r ) return null;
		var l = this.blendForegroundContrast( o, i, c );
		if ( r > l ) return null;
		for ( var s = 0, m = 10, d = 0.01; m >= s && c - n > d;  ) {
			var h = ( n + c ) / 2,
				p = this.blendForegroundContrast( o, i, h );
			r > p ? ( n = h ) : ( c = h ), ++s;
		}
		return s > m ? null : c;
	},
	hex2Rgb: function( e ) {
		if ( ! e ) return null;
		var t = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
		e = e.replace( t, function( e, t, r, o ) {
			return t + t + r + r + o + o;
		} );
		var r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec( e );
		return r
			? {
					r: parseInt( r[ 1 ], 16 ),
					g: parseInt( r[ 2 ], 16 ),
					b: parseInt( r[ 3 ], 16 ),
			  }
			: null;
	},
	blendForegroundContrast: function( e, t, r ) {
		if ( 1 > r ) {
			var o = this.overlayOn( e, t, r );
			return this.opaqueContrast( o, e );
		}
		return this.opaqueContrast( e, t );
	},
	overlayOn: function( e, t, r ) {
		var o = {};
		return r >= 1
			? e
			: ( ( o.r = t.r * r + e.r * ( 1 - r ) ),
			  ( o.g = t.g * r + e.g * ( 1 - r ) ),
			  ( o.b = t.b * r + e.b * ( 1 - r ) ),
			  ( o.a = r + 1 * ( 1 - r ) ),
			  o );
	},
	opaqueContrast: function( e, t, r ) {
		var o = this.getLFromRgbColor( t ) + 0.05,
			i = this.getLFromRgbColor( e ) + 0.05,
			n = o / i;
		return i > o && ( n = 1 / n ), n;
	},
	isTextLegibleOverBackground: function( e, t ) {
		var r =
				arguments.length <= 2 || void 0 === arguments[ 2 ]
					? 14
					: arguments[ 2 ],
			o =
				arguments.length <= 3 || void 0 === arguments[ 3 ]
					? 300
					: arguments[ 3 ],
			i = this.getLFromHex( e ),
			n = this.getLFromHex( t ),
			c = ! 1;
		if ( i !== ! 1 && n !== ! 1 ) {
			var a = ( 14 == r && o >= 700 ) || r >= 18,
				l = ( Math.max( i, n ) + 0.05 ) / ( Math.min( i, n ) + 0.05 );
			c =
				l >= 3 && a
					? ! 0
					: l >= 3 && 4.5 > l && ! a
					? ! 1
					: l >= 4.5 && ! a
					? ! 0
					: ! 1;
		}
		return c;
	},
	getLFromHex: function( e ) {
		var t = this.hex2Rgb( e );
		return this.getLFromRgbColor( t );
	},
	getLFromRgbValue: function( e ) {
		var t = e / 255;
		return 0.03928 > t ? t / 12.92 : Math.pow( ( t + 0.055 ) / 1.055, 2.4 );
	},
	getLFromRgbColor: function( e ) {
		var t = {};
		return (
			( t.r = this.getLFromRgbValue( e.r ) ),
			( t.g = this.getLFromRgbValue( e.g ) ),
			( t.b = this.getLFromRgbValue( e.b ) ),
			0.2126 * t.r + 0.7152 * t.g + 0.0722 * t.b
		);
	},
	getRgbaFromHexAndAlpha: function( e, t ) {
		var r = this.hex2Rgb( e );
		return (
			( t = t ? t.toFixed( 2 ) : 1 ),
			'rgba(' + r.r + ', ' + r.g + ', ' + r.b + ', ' + t + ')'
		);
	},
	formatHex: function( e ) {
		return e ? ( '#' !== e[ 0 ] ? '#' + e : e ) : null;
	},
	rgb2Hex: function( e ) {
		var t =
			Math.round( e.b ) + 256 * Math.round( e.g ) + 65536 * Math.round( e.r );
		return '#' + ( '000000' + t.toString( 16 ) ).substr( -6 );
	},
	rgb2Hsv: function( e, t, r ) {
		var o = 0,
			i = 0,
			n = 0;
		if (
			( ( e = parseInt( ( '' + e ).replace( /\s/g, '' ), 10 ) ),
			( t = parseInt( ( '' + t ).replace( /\s/g, '' ), 10 ) ),
			( r = parseInt( ( '' + r ).replace( /\s/g, '' ), 10 ) ),
			! (
				null == e ||
				null == t ||
				null == r ||
				isNaN( e ) ||
				isNaN( t ) ||
				isNaN( r ) ||
				0 > e ||
				0 > t ||
				0 > r ||
				e > 255 ||
				t > 255 ||
				r > 255
			) )
		) {
			( e /= 255 ), ( t /= 255 ), ( r /= 255 );
			var c = Math.min( e, Math.min( t, r ) ),
				a = Math.max( e, Math.max( t, r ) );
			if ( c == a )
				return (
					( n = c ),
					{
						h: 0,
						s: 0,
						v: n,
					}
				);
			var l = e == c ? t - r : r == c ? e - t : r - e,
				s = e == c ? 3 : r == c ? 1 : 5;
			return (
				( o = 60 * ( s - l / ( a - c ) ) ),
				( i = ( a - c ) / a ),
				( n = a ),
				{
					h: o,
					s: i,
					v: n,
				}
			);
		}
	},
	distanceBetweenTwoPoints: function( e, t ) {
		var r = e.x,
			o = e.y,
			i = t.x,
			n = t.y;
		return Math.sqrt( Math.pow( r - i, 2 ) + Math.pow( o - n, 2 ) );
	},
	hsv2Rgb: function( e, t, r ) {
		var o = r * t,
			i = e / 60,
			n = o * ( 1 - Math.abs( ( i % 2 ) - 1 ) ),
			c = r - o,
			a = [];
		'undefined' == typeof e
			? ( a = [ 0, 0, 0 ] )
			: 1 > i
			? ( a = [ o, n, 0 ] )
			: 2 > i
			? ( a = [ n, o, 0 ] )
			: 3 > i
			? ( a = [ 0, o, n ] )
			: 4 > i
			? ( a = [ 0, n, o ] )
			: 5 > i
			? ( a = [ n, 0, o ] )
			: 6 >= i && ( a = [ o, 0, n ] );
		var l = 255 * ( a[ 0 ] + c ),
			s = 255 * ( a[ 1 ] + c ),
			m = 255 * ( a[ 2 ] + c );
		return {
			r: l,
			g: s,
			b: m,
		};
	},
	hex2Hsv: function( e ) {
		var t = this.hex2Rgb( e );
		return this.rgb2Hsv( t.r, t.g, t.b );
	},
	hsv2Hex: function( e, t, r ) {
		var o = this.hsv2Rgb( e, t, r );
		return this.rgb2Hex( {
			r: o.r,
			g: o.g,
			b: o.b,
		} );
	},
	rgba2rgb: function( e ) {
		var t = {
			r: e.r,
			g: e.g,
			b: e.b,
		};
		return e.a
			? ( ( t.r = Math.round( 255 * ( 1 - e.a ) + e.a * e.r ) ),
			  ( t.g = Math.round( 255 * ( 1 - e.a ) + e.a * e.g ) ),
			  ( t.b = Math.round( 255 * ( 1 - e.a ) + e.a * e.b ) ),
			  t )
			: e;
	},
	rgba2hex: function( e ) {
		var t = this.rgba2rgb( e );
		return this.rgb2Hex( t );
	},
	darkenHex: function( e, t ) {
		return this.rgb2Hex( this.darkenRgb( this.hex2Rgb( e ), t ) );
	},
	darkenRgb: function( e, t ) {
		var r = {},
			o = {
				r: 0,
				g: 0,
				b: 0,
			};
		for ( var i in o )
			r[ i ] = parseInt( ( o[ i ] - e[ i ] ) * t + e[ i ], 10 );
		return r;
	},
	lightenHex: function( e, t ) {
		return this.rgb2Hex( this.lightenRgb( this.hex2Rgb( e ), t ) );
	},
	lightenRgb: function( e, t ) {
		var r = {},
			o = {
				r: 255,
				g: 255,
				b: 255,
			};
		for ( var i in o )
			r[ i ] = parseInt( ( o[ i ] - e[ i ] ) * t + e[ i ], 10 );
		return r;
	},
	sanitizeStringWithHyphens: function( e ) {
		var t =
				arguments.length <= 1 || void 0 === arguments[ 1 ]
					? []
					: arguments[ 1 ],
			r = new RegExp( '[ ' + t + ']', 'g' );
		return e.replace( r, '-' );
	},
	sanitizeStringWithoutHyphens: function( e ) {
		return e.replace( /-/g, ' ' );
	},
	getDistanceFromLabColors: function( e, t ) {
		return DeltaE.getDeltaE00(
			{
				L: e[ 0 ],
				A: e[ 1 ],
				B: e[ 2 ],
			},
			{
				L: t[ 0 ],
				A: t[ 1 ],
				B: t[ 2 ],
			}
		);
	},
	getDistanceFromHexes: function( e, t ) {
		var r = chroma.hex( e ),
			o = chroma.hex( t );
		return this.getDistanceFromLabColors( r.lab(), o.lab() );
	},
	stopErrorFormMessage: function( e ) {
		e && e.$setValidity( 'form-error', ! 0 );
	},
	showErrorFormMessage: function( e ) {
		var t =
			arguments.length <= 1 || void 0 === arguments[ 1 ] ? ! 1 : arguments[ 1 ];
		e && ( e.$setValidity( 'form-error', ! 1 ), t && ( e.formErrorMsg = t ) );
	},
	hexValid: function( e ) {
		return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test( e );
	},
	getColorRangeFromHex: function( hex ) {
		hex = this.formatHex( hex );
		const range = {},
			dark = chroma( hex )
				.darken()
				.hex(),
			light = chroma( hex )
				.brighten()
				.hex();

		range.dark = {
			hex: dark,
			accessibility: this.getAccessibilityValuesFromHex( dark ),
		};

		range.light = {
			hex: light,
			accessibility: this.getAccessibilityValuesFromHex( light ),
		};

		return range;
	},
	generateColorFromHex: function( e ) {
		return {
			hex: e,
			accessibility: e ? this.getAccessibilityValuesFromHex( e ) : false,
			range: e ? this.getColorRangeFromHex( e ) : false,
		};
	},
	getCustomTextColorInfo: function( size, color, textColor ) {
		var t = this.getCustomTextAlphas( size, color, textColor );
		return (
			( t.minAlpha = t.minAlpha ? Math.round( 100 * t.minAlpha ) : null ),
			null === t.minAlpha ? null : 'min ' + t.minAlpha + '% opacity'
		);
	},
	getCustomTextAlphas: function( size, color, textColor ) {
		return this.getMinAndRecAlphasFromBgAndTextColors( color, textColor, size );
	},
	getColorAccessibility: ( color, name, textColor, textColorLabel ) => {
		const accessibility = {
			hex: color,
			type: name.replace( /Text on\s*|\s*Color/, '' ),
			variations: [
				{
					size: __( 'Large', 'material-design' ),
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
					size: __( 'Normal', 'material-design' ),
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
		! hex
			? []
			: hex
					.replace(
						/^#?([a-f\d])([a-f\d])([a-f\d])$/i,
						( m, r, g, b ) => '#' + r + r + g + g + b + b
					)
					.substring( 1 )
					.match( /.{2}/g )
					.map( x => parseInt( x, 16 ) ),
};

export default colorUtils;
