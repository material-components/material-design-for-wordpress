/**
 * Card Secondary Image Save component.
 *
 * @return {Function} Function returning the HTML markup for the component.
 */
const Save = ( { attributes: { content }, className } ) => (
	<div className={ className }>
		<div className="basic-card__secondary mdc-typography mdc-typography--body2">
			{ content }
		</div>
	</div>
);

export default Save;
