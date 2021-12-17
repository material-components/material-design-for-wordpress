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
 * File navigation.js.
 *
 * Handles toggling the navigation menu for small screens and enables TAB key
 * navigation support for dropdown menus.
 */
( function () {
	const container = document.getElementById( 'site-navigation' );
	if ( ! container ) {
		return;
	}

	const button = container.getElementsByTagName( 'button' )[ 0 ];
	if ( 'undefined' === typeof button ) {
		return;
	}

	const menu = container.getElementsByTagName( 'ul' )[ 0 ];

	// Hide menu toggle button if menu is empty and return early.
	if ( 'undefined' === typeof menu ) {
		button.style.display = 'none';
		return;
	}

	menu.setAttribute( 'aria-expanded', 'false' );
	if ( -1 === menu.className.indexOf( 'nav-menu' ) ) {
		menu.className += ' nav-menu';
	}

	button.onclick = function () {
		if ( -1 !== container.className.indexOf( 'toggled' ) ) {
			container.className = container.className.replace( ' toggled', '' );
			button.setAttribute( 'aria-expanded', 'false' );
			menu.setAttribute( 'aria-expanded', 'false' );
		} else {
			container.className += ' toggled';
			button.setAttribute( 'aria-expanded', 'true' );
			menu.setAttribute( 'aria-expanded', 'true' );
		}
	};

	// Get all the link elements within the menu.
	const links = menu.getElementsByTagName( 'a' );

	// Each time a menu link is focused or blurred, toggle focus.
	for ( let i = 0; i < links.length; i++ ) {
		links[ i ].addEventListener( 'focus', toggleFocus, true );
		links[ i ].addEventListener( 'blur', toggleFocus, true );
	}

	/**
	 * Sets or removes .focus class on an element.
	 */
	function toggleFocus() {
		/** @type {HTMLElement} */
		let self = this;

		// Move up through the ancestors of the current link until we hit .nav-menu.
		while ( -1 === self.className.indexOf( 'nav-menu' ) ) {
			// On li elements toggle the class .focus.
			if ( 'li' === self.tagName.toLowerCase() ) {
				if ( -1 !== self.className.indexOf( 'focus' ) ) {
					self.className = self.className.replace( ' focus', '' );
				} else {
					self.className += ' focus';
				}
			}

			self = self.parentElement;
		}
	}

	/**
	 * Toggles `focus` class to allow submenu access on tablets.
	 */
	( function ( navContainer ) {
		let i;
		const parentLink = navContainer.querySelectorAll(
			'.menu-item-has-children > a, .page_item_has_children > a'
		);

		if ( 'ontouchstart' in window ) {
			const touchStartFn = function ( e ) {
				/** @type {HTMLElement} */
				const menuItem = this.parentNode;

				if (
					! menuItem.classList.contains( 'focus' ) &&
					menuItem.parentNode
				) {
					e.preventDefault();
					for (
						i = 0;
						i < menuItem.parentNode.children.length;
						++i
					) {
						if ( menuItem === menuItem.parentNode.children[ i ] ) {
							continue;
						}
						menuItem.parentNode.children[ i ].classList.remove(
							'focus'
						);
					}
					menuItem.classList.add( 'focus' );
				} else {
					menuItem.classList.remove( 'focus' );
				}
			};

			for ( i = 0; i < parentLink.length; ++i ) {
				parentLink[ i ].addEventListener(
					'touchstart',
					touchStartFn,
					false
				);
			}
		}
	} )( container );
} )();
