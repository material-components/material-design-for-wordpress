import { RippleColor, H3 } from '../styles';

const Buttons = ( { radius, iconStyle, primaryColor } ) => (
	<div>
		<H3 style={ { margin: 0 } }>Button</H3>
		<p>This component can be created as a block in WordPress.</p>
		<button className="mdc-button">
			<div
				className="mdc-button__ripple"
				style={ { borderRadius: radius } }
			></div>
			<span className="mdc-button__label">Text Button</span>
		</button>
		<button
			className="mdc-button mdc-button--outlined"
			style={ { borderRadius: radius } }
		>
			<RippleColor primaryColor={ primaryColor }>
				<div
					className="mdc-button__ripple"
					style={ { borderRadius: radius } }
				></div>
			</RippleColor>
			<span className="mdc-button__label">Outlined Button</span>
		</button>
		<button
			className="mdc-button mdc-button--raised"
			style={ { borderRadius: radius } }
		>
			<div className="mdc-button__ripple"></div>
			<span className="mdc-button__label">Raised Button</span>
		</button>
		<button
			className="mdc-button mdc-button--unelevated"
			style={ { borderRadius: radius } }
		>
			<div className="mdc-button__ripple"></div>
			<span className="mdc-button__label">Unelevated Button</span>
		</button>
		<button className="mdc-icon-button" style={ { marginTop: '55px' } }>
			<i className={ `${ iconStyle } mdc-icon-button__icon` }>account_circle</i>
		</button>
	</div>
);

export default Buttons;
