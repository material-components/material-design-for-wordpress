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

/**
 * External dependencies
 */
import { MDCList } from '@material/list';
import { MDCRipple } from '@material/ripple';
import { MDCTabBar } from '@material/tab-bar';

export const initButtons = () => {
	const buttons = document.querySelectorAll( '.mdc-button' );
	const iconButtons = document.querySelectorAll( '.mdc-icon-button' );

	buttons.forEach( button => new MDCRipple( button ) );
	iconButtons.forEach( button => ( new MDCRipple( button ).unbounded = true ) );
};

export const initLists = () => {
	const lists = document.querySelectorAll( '.mdc-list:not(.mdc-drawer__list)' );

	lists.forEach( list => {
		const mdcList = new MDCList( list );
		mdcList.listElements.forEach( listItemEl => new MDCRipple( listItemEl ) );
	} );
};

export const initTabBar = () => {
	const tabBars = document.querySelectorAll( '.mdc-tab-bar-container' );

	tabBars.forEach( tabBarContainer => {
		const tabBar = new MDCTabBar(
			tabBarContainer.querySelector( '.mdc-tab-bar' )
		);

		const contentElements = tabBarContainer.querySelectorAll(
			'.mdc-tab-content'
		);

		tabBar.listen( 'MDCTabBar:activated', event => {
			tabBarContainer
				.querySelector( '.mdc-tab-content--active' )
				.classList.remove( 'mdc-tab-content--active' );

			contentElements[ event.detail.index ].classList.add(
				'mdc-tab-content--active'
			);
		} );
	} );
};
