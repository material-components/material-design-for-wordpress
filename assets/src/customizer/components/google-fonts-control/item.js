import { SelectControl } from '@wordpress/components';

// @todo replace input with NumberControl once it's functional

const Item = props => {
	const { label, size, weight, id } = props;

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
						/>
					</div>
				</div>

				<SelectControl label={ weight.label } options={ weight.choices } />
			</div>
		</div>
	);
};

export default Item;
