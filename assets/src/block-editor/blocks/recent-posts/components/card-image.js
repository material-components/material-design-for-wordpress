const CardImage = ( { imageSourceUrl, type } ) => (
	<div
		className={ `mdc-card__media mdc-card__media--${ type } single-post-card__media` }
		style={ { backgroundImage: `url(${ imageSourceUrl })` } }
	/>
);

export default CardImage;
