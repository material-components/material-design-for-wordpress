import React, { Fragment, useContext } from 'react';
import StepContext from '../../context';

const Switch = ( { id, text, checked } ) => {
	const { toggleAddon } = useContext( StepContext );

	return (
		<Fragment>
			<div
				className={ `mdc-switch material-wizard-switch material-wizard-switch__${ id } ${ checked &&
					'mdc-switch--checked' }` }
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
						onChange={ () => toggleAddon( id ) }
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
