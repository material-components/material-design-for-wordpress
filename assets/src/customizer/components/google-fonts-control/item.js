import { useState, useEffect } from '@wordpress/element';
import { SelectControl } from '@wordpress/components';

// @todo replace input with NumberControl once it's functional

const Item = props => {
	const { label, size, weight, id, onChange } = props;
	const [ sizeValue, setSizeValue ] = useState( size.default );
	const [ weightValue, setWeightValue ] = useState( weight.default );

	useEffect( () => {
		onChange( { id, sizeValue, weightValue } );
	}, [ sizeValue, weightValue ] );

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
							className="components-range-control__number"
							type="number"
							value={ sizeValue }
							min={ size.min }
							max={ size.max }
							onChange={ event => {
								setSizeValue( event.currentTarget.value );
							} }
						/>
					</div>
				</div>

				<SelectControl
					value={ weightValue }
					label={ weight.label }
					options={ weight.choices }
					onChange={ value => {
						setWeightValue( value );
					} }
				/>
			</div>
		</div>
	);
};

export default Item;
