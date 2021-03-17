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
 * External dependencies
 */
import { useEffect, useState } from '@wordpress/element';

/**
 * WordPress dependencies
 */
import { SelectControl } from '@wordpress/components';

/**
 * Internal dependencies
 */
import { STYLES } from './styles';

const Item = props => {
	const { label, size, weight, id, onChange } = props;
	const [ choices, setChoices ] = useState( [] );

	useEffect( () => {
		const newChoices = [];

		if ( 0 < weight.choices.length ) {
			weight.choices.forEach( choice => {
				newChoices.push( {
					label: STYLES[ choice ],
					value: choice,
				} );
			} );
		}

		setChoices( newChoices );
	}, [ weight.choices ] );

	return (
		<div className="google-fonts-control-child">
			<span className="customize-control-title google-fonts-control-title__child">
				{ label }
			</span>

			<div className="google-fonts-control__values">
				<div className="components-base-control">
					<div className="components-base-control__field">
						<label
							className="components-base-control__label"
							htmlFor={ `inspector-number-control-${ id }` }
							id={ `inspector-number-label-${ id }` }
						>
							{ size.label }
						</label>
						<input
							id={ `inspector-number-control-${ id }` }
							className="components-google-fonts-control__number"
							type="number"
							value={ size.value || size.default }
							min={ size.min }
							max={ size.max }
							onChange={ event => {
								const sizeValue = event.target.value;

								onChange( {
									id,
									sizeValue,
									weightValue: weight.value,
								} );
							} }
						/>
					</div>
				</div>

				<SelectControl
					className="components-google-fonts-control__select"
					value={ weight.value || weight.default }
					label={ weight.label }
					options={ choices }
					onChange={ value =>
						onChange( { id, sizeValue: size.value, weightValue: value } )
					}
				/>
			</div>
		</div>
	);
};

export default Item;
