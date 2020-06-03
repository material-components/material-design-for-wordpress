/**
 * External dependencies
 */
import React, { Fragment, useContext } from 'react';
import StepContext from '../../context';
import classNames from 'classnames';

/**
 * Addon selection switch
 *
 * @param {*} param Inherited props
 */
const Switch = ( { id, text, checked, disabled } ) => {
	const { dispatch } = useContext( StepContext );

	return (
		<Fragment>
			<div
				className={ classNames(
					'mdc-switch material-wizard-switch',
					`material-wizard-switch__${ id }`,
					{
						'mdc-switch--checked': checked,
						'mdc-switch--disabled': disabled,
					}
				) }
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
						onChange={ () => dispatch( { type: 'TOGGLE_ADDON', payload: id } ) }
						disabled={ disabled }
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
