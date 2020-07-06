/* global requestAnimationFrame, mtb */

export const THEME_COLOR_CONTROLS = [
	'background_color',
	'background_text_color',
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
 * Get the slug for a control.
 *
 * @param {string} name name of the control
 */
export const getSlug = name =>
	THEME_COLOR_CONTROLS.includes( name ) ? 'material' : mtb.slug;

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
	return name.replace( /^material_/, '' ).replace( mtb.slug, '' );
};

/**
 * Get the control name with prefix.
 *
 * @param {string} name name of the control
 */
export const getControlName = name => {
	name = removeOptionPrefix( name );
	return THEME_COLOR_CONTROLS.includes( name )
		? `${ getSlug( name ) }_${ name }`
		: `${ getSlug( name ) }[${ name }]`;
};

/**
 * Sanitize control id.
 *
 * @param {string} id
 */
export const sanitizeControlId = id =>
	id.replace( /\]$/, '' ).replace( /\[|\]/g, '-' );
