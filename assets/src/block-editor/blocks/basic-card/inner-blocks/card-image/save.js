/**
 * Card Image Save component.
 *
 * @return {Function} Function returning the HTML markup for the component.
 */
const Save = ( { attributes: { imageSourceUrl }, className } ) => {
	return (
		<div className={ className }>
			{ imageSourceUrl && (
				<div
					className="mdc-card__media basic-card__media mdc-card__media--16-9"
					style={ { backgroundImage: `url(${ imageSourceUrl })` } }
				></div>
			) }
		</div>
	);
};

export default Save;
