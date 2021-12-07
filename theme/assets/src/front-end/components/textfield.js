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

import { MDCTextField } from '@material/textfield';

export const textFieldInit = () => {
	const textFieldElements = document.querySelectorAll(
		'.mdc-text-field:not(.comment-field)'
	);

	if ( ! textFieldElements ) {
		return;
	}

	for ( const textFieldElement of textFieldElements ) {
		const input = new MDCTextField( textFieldElement );

		// @ts-ignore
		if ( input.trailingIcon_ ) {
			// @ts-ignore
			input.trailingIcon_.root_.addEventListener( 'click', handleClick );
			// @ts-ignore
			input.trailingIcon_.root_.addEventListener(
				'keydown',
				handleKeydown
			);
			// @ts-ignore
			input.trailingIcon_.root_.addEventListener( 'keyup', handleKeyup );
		}
	}
};

/**
 * Submit form when clicking icon
 *
 * @param {*} event Triggered event
 */
const handleClick = event => {
	submitForm( event );
};

/**
 * Handle space and enter keys
 * Prevent space from scrolling page
 *
 * @param {*} event Triggered event
 */
const handleKeydown = event => {
	if ( 'Space' === event.code || 32 === event.keyCode ) {
		event.preventDefault();
	}

	if ( 'Enter' === event.code || 13 === event.keyCode ) {
		submitForm( event );
	}
};

/**
 * Trigger form with space key
 *
 * @param {*} event Triggered event
 */
const handleKeyup = event => {
	if ( 'Space' === event.code || 32 === event.keyCode ) {
		event.preventDefault();
		submitForm( event );
	}
};

/**
 * Submit form if available
 *
 * @param {*} event Previously triggered event
 */
const submitForm = event => {
	if ( 'button' !== event.currentTarget.getAttribute( 'role' ) ) {
		return;
	}

	const { currentTarget } = event;
	const form = currentTarget.closest( 'form' );

	if ( ! form ) {
		return;
	}

	form.submit();
};
