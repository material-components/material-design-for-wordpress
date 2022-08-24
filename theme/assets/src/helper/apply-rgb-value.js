/*
 *  Copyright 2022 Google LLC
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *        http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

import {
	blueFromArgb,
	greenFromArgb,
	redFromArgb,
} from '@material/material-color-utilities';

/**
 * @typedef {Object} Option
 * @property {boolean?}     dark   Dark mode.
 * @property {HTMLElement?} target HTML target element.
 */

/** @typedef {import('@material/material-color-utilities').Theme} Theme Theme. */

/**
 * Apply RGB variable to given element.
 *
 * @param {Theme}  theme   generated from material library.
 * @param {Option} options theme options
 */
export const applyRgbValue = ( theme, options ) => {
	let _temp;
	const target =
		( options === null || options === void 0 ? void 0 : options.target ) ||
		document.body;
	const isDark =
		( _temp =
			options === null || options === void 0 ? void 0 : options.dark ) !==
			null && _temp !== void 0
			? _temp
			: false;
	const scheme = isDark ? theme.schemes.dark : theme.schemes.light;
	for ( const [ key, value ] of Object.entries( scheme.toJSON() ) ) {
		const token = key.replace( /([a-z])([A-Z])/g, '$1-$2' ).toLowerCase();
		const color = `${ redFromArgb( value ) },${ greenFromArgb(
			value
		) },${ blueFromArgb( value ) }`;
		target.style.setProperty( `--md-sys-color-${ token }-rgb`, color );
	}
};
