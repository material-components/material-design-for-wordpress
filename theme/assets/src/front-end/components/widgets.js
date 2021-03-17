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
 * File swidgets.js.
 *
 * Enables keyboard navigation for default widgets.
 */
export const widgetsInit = () => {
	const widgets = document.querySelectorAll( '.widget' );

	if ( ! widgets ) {
		return;
	}

	widgets.forEach( widget => {
		const firstElement = widget.querySelector( '.mdc-list-item' );

		if ( ! firstElement ) {
			return;
		}

		firstElement.setAttribute( 'tabindex', 0 );

		if ( widget.classList.contains( 'widget_recent_comments' ) ) {
			return;
		}

		const items = widget.querySelectorAll( '.mdc-list-item' );

		if ( ! items ) {
			return;
		}

		items.forEach( item => {
			const link = item.querySelector( 'a' );

			if ( ! link ) {
				return;
			}

			item.addEventListener( 'click', event => {
				if ( 'A' === event.target.tagName ) {
					return event;
				}

				link.click();
			} );

			item.addEventListener( 'keydown', event => {
				link.setAttribute( 'tabindex', '-1' );

				if ( 'Space' === event.code || 'Enter' === event.code ) {
					link.click();
				}
			} );
		} );
	} );
};
