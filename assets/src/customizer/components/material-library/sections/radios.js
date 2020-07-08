import { __ } from '@wordpress/i18n';

const Radios = () => (
	<div>
		<h4 className="mdc-typography--headline4" style={ { margin: 0 } }>
			{ __( 'Radio', 'material-theme-builder' ) }
		</h4>
		<p>
			{ __(
				'This is an example of how this component appears in the theme. It is unavailable as a block in WordPress.',
				'material-theme-builder'
			) }
		</p>
		<div className="mdc-radio">
			<input
				className="mdc-radio__native-control"
				type="radio"
				name="radios"
				defaultChecked
			/>
			<div className="mdc-radio__background">
				<div className="mdc-radio__outer-circle"></div>
				<div className="mdc-radio__inner-circle"></div>
			</div>
			<div className="mdc-radio__ripple"></div>
		</div>
		<div className="mdc-radio">
			<input className="mdc-radio__native-control" type="radio" name="radios" />
			<div className="mdc-radio__background">
				<div className="mdc-radio__outer-circle"></div>
				<div className="mdc-radio__inner-circle"></div>
			</div>
			<div className="mdc-radio__ripple"></div>
		</div>
	</div>
);

export default Radios;
