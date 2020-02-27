export default function TabBar( { children } ) {
	return (
		<button className="mdc-button mdc-button--raised">
			<div className="mdc-button__ripple"></div>
			<span className="mdc-button__label">{ children }</span>
		</button>
	);
}
