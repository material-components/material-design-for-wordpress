import { H3 } from '../styles';

const Radios = () => (
	<div>
		<H3>Radio</H3>
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
