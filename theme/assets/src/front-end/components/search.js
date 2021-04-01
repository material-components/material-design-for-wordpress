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

import { MDCRipple } from '@material/ripple';

/**
 * Shows / Hides search box at the top of the page
 */
class Search {
	/**
	 * Store elements
	 *
	 * @param {*} element
	 */
	constructor( element ) {
		if ( ! element ) {
			return;
		}

		this.element = element;
		this.trigger = element.querySelector( '.search__button' );
		this.backTrigger = element.querySelector( '.button__back' );
		this.showSearch = this.showSearch.bind( this );
		this.hideSearch = this.hideSearch.bind( this );
		this.closeRipple = false;

		this.attachEvents();
	}

	/**
	 * Add events to trigger and hide search
	 */
	attachEvents() {
		if ( ! this.trigger ) {
			return;
		}

		this.trigger.addEventListener( 'click', this.showSearch );

		document.addEventListener( 'keydown', event => {
			this.keepFocusInSearch( event );
			this.closeOnEscape( event );
		} );

		if ( ! this.backTrigger ) {
			return;
		}

		this.backTrigger.addEventListener( 'click', this.hideSearch );
	}

	/**
	 * Show search
	 */
	showSearch() {
		const input = this.element.querySelector( '.mdc-text-field__input' );

		this.element.classList.add( '-with-search' );

		if ( ! input ) {
			return;
		}

		input.focus();

		if ( ! this.closeRipple ) {
			this.closeRipple = new MDCRipple( this.backTrigger );
			this.closeRipple.unbounded = true;
		}
	}

	/**
	 * Hide search
	 */
	hideSearch() {
		this.element.classList.remove( '-with-search' );
		this.trigger.focus();
	}

	/**
	 * Loop focus when search form is active
	 *
	 * @param {*} event Triggered event
	 */
	keepFocusInSearch( event ) {
		if ( ! this.element.classList.contains( '-with-search' ) ) {
			return;
		}

		const searchContainer = this.element.querySelector(
			'.top-app-bar__search'
		);
		const selectors = 'input, a, button';
		const elements = [ ...searchContainer.querySelectorAll( selectors ) ];

		if ( ! elements ) {
			return;
		}

		const firstElement = elements[ 0 ];
		const lastElement = elements[ elements.length - 1 ];
		const { activeElement } = document;
		const { shiftKey, key } = event;
		const isTabbing = 'Tab' === key;

		if ( ! shiftKey && isTabbing && lastElement === activeElement ) {
			event.preventDefault();
			firstElement.focus();
		}

		if ( shiftKey && isTabbing && firstElement === activeElement ) {
			event.preventDefault();
			lastElement.focus();
		}
	}

	/**
	 * Close form when pressing Esc
	 *
	 * @param {*} event Triggered event
	 */
	closeOnEscape( event ) {
		if ( ! this.element.classList.contains( '-with-search' ) ) {
			return;
		}

		if ( 'Escape' !== event.key ) {
			return;
		}

		this.element.classList.remove( '-with-search' );
		this.trigger.focus();
	}
}

export default Search;
