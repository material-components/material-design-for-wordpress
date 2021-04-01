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
 * WordPress dependencies
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Registers the blocks with the proper settings.
 *
 * @param {Object} blocks The blocks to register.
 */
export const registerBlocks = blocks => {
	blocks.keys().forEach( modulePath => {
		const { name, settings, metadata } = blocks( modulePath );
		registerBlockType( name, { ...settings, ...( metadata || {} ) } );
	} );
};

/**
 * Set focus to an element and move the cursor to end for content editable.
 *
 * @param {HTMLElement} element Element to set focus to.
 */
export const setFocusAndMoveCursorToEnd = element => {
	element.focus();

	if ( document && document.execCommand ) {
		// Select all the content in the element.
		document.execCommand( 'selectAll', false, null );

		// Collapse selection to the end.
		document.getSelection().collapseToEnd();
	}
};

/**
 * Material logo component.
 */
export const MaterialLogo = () => (
	<svg
		className="material-logo-svg"
		viewBox="0 0 96 96"
		xmlns="http://www.w3.org/2000/svg"
		width="20px"
		height="20px"
	>
		<defs></defs>
		<title>material_logo</title>
		<path
			className="cls-1"
			d="M48,0A48,48,0,1,0,96,48,48,48,0,0,0,48,0ZM18,22,46,78H18Zm2.47-4H75.53L48,73.06ZM78,22V78H50Zm4-1.9a43.92,43.92,0,0,1,0,55.8ZM75.9,14H20.1a43.92,43.92,0,0,1,55.8,0ZM14,20.1V75.9a43.92,43.92,0,0,1,0-55.8ZM20.1,82H75.9a43.92,43.92,0,0,1-55.8,0Z"
		></path>
	</svg>
);
