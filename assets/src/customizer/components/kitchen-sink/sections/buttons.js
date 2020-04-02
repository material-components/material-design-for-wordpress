import { RippleColor, H3 } from '../styles';

const Buttons = ( {
	primaryColor,
	iconCollection,
	secondaryColor,
	primaryTextColor,
	secondaryTextColor,
	smallComponentRadius,
} ) => (
	<div>
		<H3>Button</H3>
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
			<RippleColor
				primaryColor={ primaryColor }
				secondaryColor={ secondaryColor }
				primaryTextColor={ primaryTextColor }
				secondaryTextColor={ secondaryTextColor }
			>
				<div
					className="mdc-button__ripple"
					style={ { borderRadius: smallComponentRadius } }
				></div>
			</RippleColor>
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
			<i className={ `${ iconCollection } mdc-icon-button__icon` }>
				add_shopping_cart
			</i>
		</button>
	</div>
);

export default Buttons;
