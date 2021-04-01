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

/* global requestAnimationFrame */

/**
 * Internal dependencies
 */
import getConfig from '../block-editor/utils/get-config';

export const THEME_COLOR_CONTROLS = [
	'custom_background_color',
	'on_background_color',
	'header_color',
	'on_header_color',
	'footer_color',
	'on_footer_color',
];

/**
 * Collapse a DOM node by animating it's height to 0.
 *
 * @param {Node} element
 */
export const collapseSection = element => {
	// Get the height of the element's inner content, regardless of its actual size.
	const sectionHeight = element.scrollHeight;

	// Temporarily disable all css transitions.
	const elementTransition = element.style.transition;
	element.style.transition = '';

	// On the next frame (as soon as the previous style change has taken effect),
	// explicitly set the element's height to its current pixel height, so we
	// aren't transitioning out of 'auto'.
	requestAnimationFrame( () => {
		element.style.height = sectionHeight + 'px';
		element.style.transition = elementTransition;

		// On the next frame (as soon as the previous style change has taken effect),
		// have the element transition to height: 0.
		requestAnimationFrame( () => {
			element.style.height = 0 + 'px';
		} );
	} );
	// Mark the section as "currently collapsed".
	element.setAttribute( 'data-collapsed', 'true' );
};

/**
 * Expand a DOM node by animating it's height to full.
 *
 * @param {Node} element
 */
export const expandSection = element => {
	// Get the height of the element's inner content, regardless of its actual size.
	const sectionHeight = element.scrollHeight + 2;

	const removeEvent = () => {
		element.style.height = 'auto';

		// Remove this event listener so it only gets triggered once.
		element.removeEventListener( 'transitionend', removeEvent );
	};

	// Have the element transition to the height of its inner content.
	element.style.height = sectionHeight + 'px';

	// When the next css transition finishes (which should be the one we just triggered).
	element.addEventListener( 'transitionend', removeEvent );

	// Mark the section as "currently not collapsed".
	element.setAttribute( 'data-collapsed', 'false' );
};

/**
 * Remove the option prefix from a control name.
 *
 * @param {string} name name of the control
 */
export const removeOptionPrefix = name => {
	const match = name.match( /\[([^\]]+)\]/ );
	if ( match ) {
		return match[ 1 ];
	}
	return name.replace( getConfig( 'slug' ), '' );
};

/**
 * Get the control name with prefix.
 *
 * @param {string} name name of the control
 */
export const getControlName = name => {
	name = removeOptionPrefix( name );
	return THEME_COLOR_CONTROLS.includes( name )
		? name
		: `${ getConfig( 'slug' ) }[${ name }]`;
};

/**
 * Sanitize control id.
 *
 * @param {string} id
 */
export const sanitizeControlId = id =>
	id.replace( /\]$/, '' ).replace( /\[|\]/g, '-' );
