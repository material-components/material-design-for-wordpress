/*
{
	bodyFontFamily,
	headFontFamily,
	iconCollection,
	largeComponentRadius,
	mediumComponentRadius,
	primaryColor,
	primaryTextColor,
	secondaryColor,
	secondaryTextColor,
	smallComponentRadius,
	style,
}
*/

const KitchenSink = props => (
	<div>
		<h1>Kitchen Sink</h1>
		<ul>
			{ Object.keys( props ).map( prop => (
				<li key={ prop }>
					{ prop }: { props[ prop ] }
				</li>
			) ) }
		</ul>

		<button className="mdc-button">
			<div className="mdc-button__ripple"></div>
			<span className="mdc-button__label">Button</span>
		</button>

		<label htmlFor="wtf" className="mdc-text-field">
			<div className="mdc-text-field__ripple"></div>
			<input
				className="mdc-text-field__input"
				type="text"
				aria-labelledby="my-label-id"
			/>
			<span className="mdc-floating-label" id="my-label-id">
				Hint text
			</span>
			<div className="mdc-line-ripple"></div>
		</label>
	</div>
);

export default KitchenSink;
