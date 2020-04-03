import { H3 } from '../styles';

const Switch = () => (
	<div>
		<H3>Switch</H3>
		<div className="mdc-switch">
			<div className="mdc-switch__track"></div>
			<div className="mdc-switch__thumb-underlay">
				<div className="mdc-switch__thumb"></div>
				<input
					type="checkbox"
					id="basic-switch"
					className="mdc-switch__native-control"
					role="switch"
					aria-checked="false"
				/>
			</div>
		</div>
		<label htmlFor="basic-switch">off/on</label>
	</div>
);

export default Switch;
