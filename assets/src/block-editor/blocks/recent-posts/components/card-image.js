/**
 * Card Image component.
 *
 * @param {Object} props - Props.
 * @param {string} props.imageSourceUrl - Image source URL.
 * @param {string} props.type - Media type ('16-9' or 'square').
 *
 * @return {Function} Function returning the HTML markup for the component.
 */
const CardImage = ( { imageSourceUrl, type } ) => (
	<div
		className={ `mdc-card__media mdc-card__media--${ type } single-post-card__media }` }
		style={ { backgroundImage: `url(${ imageSourceUrl })` } }
	/>
);

export default CardImage;
