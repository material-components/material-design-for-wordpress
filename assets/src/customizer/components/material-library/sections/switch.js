/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import IconButtonLink from '../common/icon-button-link';

const Switch = () => (
	<div>
		<h4 className="mdc-typography--headline4" style={ { margin: 0 } }>
			{ __( 'Switches', 'material-theme-builder' ) }
		</h4>
		<IconButtonLink href="https://material.io/develop/web/components/input-controls/switches"></IconButtonLink>
		<p>
			{ __(
				'Switches toggle the state of a single item on or off.',
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
