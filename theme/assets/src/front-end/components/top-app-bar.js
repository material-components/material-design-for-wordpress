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

import { MDCTopAppBar } from '@material/top-app-bar';
import search from './search';

export const topAppBarInit = () => {
	const topAppBarElement = document.querySelector( '.mdc-top-app-bar' );

	if ( ! topAppBarElement ) {
		return;
	}

	new search( topAppBarElement );

	setTopAppBarPosition();
	return new MDCTopAppBar( topAppBarElement );
};

/**
 * Set top app bar top position when WP admin bar is rendered.
 */
const setTopAppBarPosition = () => {
	const topAppBarElement = document.querySelector(
		'.admin-bar .mdc-top-app-bar'
	);

	if ( ! topAppBarElement ) {
		return;
	}

	const observer = new MutationObserver( mutations => {
		mutations.forEach( () => {
			let top = parseInt( topAppBarElement.style.top, 10 );
			if ( top >= -128 ) {
				top += 32; // WP admin bar height is 32px.
			}
			observer.disconnect();
			topAppBarElement.style.top = `${ top }px`;
			observe();
		} );
	} );

	const observe = () => {
		observer.observe( topAppBarElement, {
			attributes: true,
			attributeFilter: [ 'style' ],
		} );
	};
	observe();
};
