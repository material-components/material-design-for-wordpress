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
