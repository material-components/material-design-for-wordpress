/**
 * Icon Buton with a clickable link
 *
 * @param {Object} props - Component props.
 * @param {string} props.href - Link for button.
 *
 * @return {Function} A functional component.
 */
const IconButtonLink = ( { href } ) => (
	<form target="_blank">
		<button className="mdc-icon-button material-icons" formAction={ href }>
			open_in_new
		</button>
	</form>
);

export default IconButtonLink;
