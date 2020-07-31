import { __ } from '@wordpress/i18n';

const Radios = () => (
	<div>
		<h4 className="mdc-typography--headline4" style={ { margin: 0 } }>
			{ __( 'Radio', 'material-theme-builder' ) }
		</h4>
		<p>
			{ __(
				'Radio buttons allow the user to select one option from a set. It is unavailable as a block in WordPress.',
				'material-theme-builder'
			) }
		</p>
		<a href="https://material.io/develop/web/components/input-controls/radio-buttons" target="_blank">
		    <span class="material-icons">open_in_new</span>
		</a>
		<br/>
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
