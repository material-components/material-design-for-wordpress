/**
 * Sanitize control id.
 *
 * @param {string} id
 */
export const sanitizeControlId = id =>
	id.replace( /\]$/, '' ).replace( /\[|\]/g, '-' );
