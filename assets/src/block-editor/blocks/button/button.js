export default function Button( { to, children } ) {
	return (
		<a href={ to } className="mdc-button mdc-button--raised">
			<div className="mdc-button__ripple"></div>
			<span className="mdc-button__label">{ children }</span>
		</a>
	);
}
