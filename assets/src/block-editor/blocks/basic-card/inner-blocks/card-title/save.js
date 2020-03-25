/**
 * Card Title Save component.
 *
 * @return {Function} Function returning the HTML markup for the component.
 */
const Save = ( { attributes: { title, subTitle }, className } ) => (
	<div className={ className }>
		<div className="basic-post-card__primary">
			<h2 className="basic-card__title mdc-typography mdc-typography--headline6">
				{ title }
			</h2>
			<h3 className="basic-card__subtitle mdc-typography mdc-typography--subtitle2">
				{ subTitle }
			</h3>
		</div>
	</div>
);

export default Save;
