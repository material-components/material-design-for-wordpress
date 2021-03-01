/**
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * WordPress dependencies
 */
import { useContext } from '@wordpress/element';

/**
 * Internal dependencies
 */
import StepContext from '../../context';
import { ACTIONS } from '../../constants';
import classNames from 'classnames';

/**
 * Addon selection switch
 *
 * @param {*} param Inherited props
 */
const Switch = ( { id, text, checked, disabled } ) => {
	const { dispatch } = useContext( StepContext );

	return (
		<>
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
						onChange={ () =>
							dispatch( { type: ACTIONS.TOGGLE_ADDON, payload: id } )
						}
						disabled={ disabled }
					/>
				</div>
			</div>
			{ text && (
				<label id={ `label-${ id }` } htmlFor={ id }>
					{ text }
				</label>
			) }
		</>
	);
};

export default Switch;
