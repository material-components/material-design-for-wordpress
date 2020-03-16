/**
 * External dependencies
 */
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';

/**
 * Internal dependencies
 */
import RangeSliderControl from '../../../../assets/src/customizer/components/range-slider-control';

/**
 * Render the component.
 *
 * @param {Object} props - Component props
 * @return {Function} A functional component.
 */
const setup = props => {
	return render( <RangeSliderControl { ...props } /> );
};

const baseProps = {
	id: 'mtb-small_component_radius',
	label: 'Small Component Radius',
	description: 'This is a test description',
	value: 10,
	min: 0,
	max: 36,
	step: 1,
	onChange: () => null,
};

describe( 'RangeSliderControl', () => {
	it( 'matches snapshot', () => {
		const wrapper = setup( baseProps );
		expect( wrapper ).toMatchSnapshot();
	} );
} );
