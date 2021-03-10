/**
 * External dependencies
 */
import classNames from 'classnames';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

const Switch = ( { checked, id, onChange } ) => {
	return (
		<div className="material-settings__switch">
			<div
				className={ classNames( 'mdc-switch material-wizard-switch', {
					'mdc-switch--checked': checked,
				} ) }
			>
				<div className="mdc-switch__track"></div>
				<div className="mdc-switch__thumb-underlay">
					<div className="mdc-switch__thumb"></div>
					<input
						type="checkbox"
						id={ id }
						className="mdc-switch__native-control"
						role="switch"
						aria-checked={ checked }
						onChange={ onChange }
					/>
				</div>
			</div>
			<label id={ `label-${ id }` } htmlFor={ id }>
				{ __( 'Auto-updates enabled', 'material-design' ) }
			</label>
		</div>
	);
};

export default Switch;
