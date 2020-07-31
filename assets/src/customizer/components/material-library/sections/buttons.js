import { __ } from '@wordpress/i18n';
import { RippleColor } from '../styles';

const Buttons = ( { radius, iconStyle, primaryColor } ) => (
<div>
    <h4 className="mdc-typography--headline4" style={ { margin: 0 } }>
        { __( 'Button', 'material-theme-builder' ) }
    </h4>
	<form target="_blank">
		<button 
			className="mdc-icon-button material-icons" 
			formaction="https://material.io/components/buttons">
			open_in_new
		</button>
	</form>
	<p>
        { __( 'Buttons allow users to take actions, and make choices, with a single tap.', 'material-theme-builder' ) }
    </p>
    <div className="mdc-button-wrap">
        <button className="mdc-button">
				<div
					className="mdc-button__ripple"
					style={ { borderRadius: `${ radius }px` } }
				></div>
				<span className="mdc-button__label">
					{ __( 'Text Button', 'material-theme-builder' ) }
				</span>
			</button>
			<button
				className="mdc-button mdc-button--outlined"
				style={ { borderRadius: `${ radius }px` } }
			>
				<RippleColor primaryColor={ primaryColor }>
					<div
						className="mdc-button__ripple"
						style={ { borderRadius: `${ radius }px` } }
					></div>
				</RippleColor>
				<span className="mdc-button__label">
					{ __( 'Outlined Button', 'material-theme-builder' ) }
				</span>
			</button>
			<button
				className="mdc-button mdc-button--raised"
				style={ { borderRadius: `${ radius }px` } }
			>
				<div className="mdc-button__ripple"></div>
				<span className="mdc-button__label">
					{ __( 'Raised Button', 'material-theme-builder' ) }
				</span>
			</button>
			<button
				className="mdc-button mdc-button--unelevated"
				style={ { borderRadius: `${ radius }px` } }
			>
				<div className="mdc-button__ripple"></div>
				<span className="mdc-button__label">
					{ __( 'Unelevated Button', 'material-theme-builder' ) }
				</span>
			</button>
			<button className="mdc-icon-button" style={ { marginTop: '55px' } }>
				<i className={ `${ iconStyle } mdc-icon-button__icon` }>
					account_circle
				</i>
			</button>
		</div>
	</div>
);

export default Buttons;
