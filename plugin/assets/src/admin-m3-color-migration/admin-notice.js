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

const adminNotice = () => {
	const notice = document.querySelector( '#material-theme-m3-migration' );
	if ( ! notice ) {
		return;
	}
	/**
	 * Callback on click.
	 *
	 * @param {Event} e
	 */
	const materialClickCallback =
		/**
		 * @this {HTMLLinkElement}
		 */
		function ( e ) {
			e.preventDefault();
			/** @member this {HTMLElement} */
			const link = this.href;
			// @ts-ignore
			wp.ajax
				.post( 'material_m3_notice', {
					_wpnonce: window.material_m3_migration_notice.nonce,
				} )
				.done( function () {
					location.href = link;
					notice.remove();
				} );
		};
	const targets = notice.querySelectorAll(
		'.material-theme-m3-migration__primary'
	);
	for ( let i = 0; i < targets.length; i++ ) {
		targets[ i ].addEventListener( 'click', materialClickCallback );
	}
};

document.addEventListener( 'DOMContentLoaded', () =>
	setTimeout( adminNotice, 100 )
);
