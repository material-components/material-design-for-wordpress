import { __ } from '@wordpress/i18n';
import { H3 } from '../styles';

const Switch = () => (
	<div>
		<H3>{ __( 'Switch', 'material-theme-builder' ) }</H3>
		<p>
			{ __(
				'This is an example of how this component appears in the theme. It is unavailable as a block in WordPress.',
				'material-theme-builder'
			) }
		</p>
		<div className="mdc-switch" style={ { marginTop: '2px' } }>
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
	</div>
);

export default Switch;
