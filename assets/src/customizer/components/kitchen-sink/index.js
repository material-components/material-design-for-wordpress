const KitchenSink = ( {
	style,
	primaryColor,
	bodyFontFamily,
	headFontFamily,
	iconCollection,
	secondaryColor,
	primaryTextColor,
	secondaryTextColor,
	smallComponentRadius,
	largeComponentRadius,
	mediumComponentRadius,
} ) => (
	<div id="kitchen-sink-preview">
		<h1 style={ { fontFamily: headFontFamily } }>Kitchen Sink</h1>
		<section>
			<h2 style={ { fontFamily: headFontFamily } }>Blocks</h2>
			<hr />
			<h3 style={ { fontFamily: headFontFamily } }>Button</h3>
			<button className="mdc-button" style={ { color: primaryColor } }>
				<div className="mdc-button__ripple"></div>
				<span className="mdc-button__label">Text Button</span>
			</button>
			<button
				className="mdc-button mdc-button--outlined"
				style={ {
					color: primaryColor,
					borderColor: primaryColor,
					borderRadius: smallComponentRadius,
				} }
			>
				<div
					className="mdc-button__ripple"
					style={ {
						backgroundColor: primaryColor,
						borderRadius: smallComponentRadius,
					} }
				></div>
				<span className="mdc-button__label">Outlined Button</span>
			</button>
			<button
				className="mdc-button mdc-button--raised"
				style={ {
					backgroundColor: primaryColor,
					color: primaryTextColor,
					borderRadius: smallComponentRadius,
				} }
			>
				<div className="mdc-button__ripple"></div>
				<span className="mdc-button__label">Raised Button</span>
			</button>
			<button
				className="mdc-button mdc-button--unelevated"
				style={ {
					backgroundColor: primaryColor,
					color: primaryTextColor,
					borderRadius: smallComponentRadius,
				} }
			>
				<div className="mdc-button__ripple"></div>
				<span className="mdc-button__label">Unelevated Button</span>
			</button>
			<button className="mdc-icon-button" style={ { color: primaryColor } }>
				<i className="material-icons mdc-icon-button__icon">
					add_shopping_cart
				</i>
			</button>
		</section>
	</div>
);

export default KitchenSink;
