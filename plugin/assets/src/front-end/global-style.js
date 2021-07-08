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

/* global materialDesign */

const getOutlineClassHandler = ( style, classSelector, outlinedClass ) => {
	return () => {
		// eslint-disable-next-line camelcase
		if ( style === 'inherit' || ! style ) {
			return;
		}
		const list = document.querySelectorAll( classSelector );
		list.forEach( item => {
			const hasOutlined = item.classList.contains( outlinedClass );
			if ( style === 'outlined' && ! hasOutlined ) {
				item.classList.add( outlinedClass );
			} else if ( style !== 'outlined' && hasOutlined ) {
				item.classList.remove( outlinedClass );
			}
		} );
	};
};

const initCardGlobalStyle = () => {
	getOutlineClassHandler(
		// eslint-disable-next-line camelcase
		materialDesign?.globalStyle?.card_style,
		'.mdc-card',
		'mdc-card--outlined'
	)();
};

const initTextFieldGlobalStyle = () => {
	getOutlineClassHandler(
		// eslint-disable-next-line camelcase
		materialDesign?.globalStyle?.text_field_style,
		'.mdc-text-field',
		'mdc-text-field--outlined'
	)();
};

export const initGlobalStyle = () => {
	initCardGlobalStyle();
	initTextFieldGlobalStyle();
};
