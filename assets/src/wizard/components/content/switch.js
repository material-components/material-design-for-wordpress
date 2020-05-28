import React, { Fragment, useEffect } from 'react';
import { MDCSwitch } from '@material/switch';

const Switch = ( { id, text } ) => {
	useEffect( () => {
		new MDCSwitch(
			document.querySelector( `.material-wizard-switch__${ id }` )
		);
	}, [] );

	return (
		<Fragment>
			<div
				className={ `mdc-switch material-wizard-switch material-wizard-switch__${ id }` }
			>
				<div className="mdc-switch__track"></div>
				<div className="mdc-switch__thumb-underlay">
					<div className="mdc-switch__thumb"></div>
					<input
						type="checkbox"
						id={ id }
						className="mdc-switch__native-control"
						role="switch"
						aria-checked="false"
					/>
				</div>
			</div>
			{ text && (
				<label id={ `label-${ id }` } htmlFor={ id }>
					{ text }
				</label>
			) }
		</Fragment>
	);
};

export default Switch;
