import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import { shallow } from 'enzyme';

import Item from '../../../../../assets/src/customizer/components/google-fonts-control/item';

/**
 * Render the component
 *
 * @param {Object} props - Component props
 * @return {Function} A functional component.
 */
const setup = props => {
	return render( <Item { ...props } /> );
};

/**
 * Render the component
 *
 * @param {Object} props - Component props
 * @return {Function} A functional component.
 */
const setupShallow = props => {
	return shallow( <Item { ...props } /> );
};

const baseProps = {
	label: 'Test item',
	id: 'headline1',
	size: {
		label: 'Size',
		value: 96,
		min: 2,
		max: 96,
		default: 96,
	},
	weight: {
		value: 500,
		label: 'Weight',
		choices: [
			{ label: 'Light', value: 100 },
			{ label: 'Normal', value: 400 },
			{ label: 'Medium', value: 500 },
		],
	},
};

describe( 'GoogleFontsControl/Item', () => {
	beforeEach( () => {
		jest.clearAllMocks();
	} );

	it( 'mateches snapshot', () => {
		const wrapper = setup( baseProps );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'should call onChange size prop', () => {
		const onChangeMock = jest.fn();
		const event = {
			preventDefault() {},
			target: { value: 12 },
		};
		const wrapper = setupShallow( { ...baseProps, onChange: onChangeMock } );
		wrapper.find( 'input' ).simulate( 'change', event );

		expect( onChangeMock ).toHaveBeenCalledWith( {
			id: baseProps.id,
			weightValue: baseProps.weight.value,
			sizeValue: 12,
		} );
	} );

	it( 'should call onChange weight prop', () => {
		const onChangeMock = jest.fn();
		const value = 100;
		const wrapper = setupShallow( { ...baseProps, onChange: onChangeMock } );
		wrapper
			.find( '.components-range-control__select' )
			.simulate( 'change', value );

		expect( onChangeMock ).toHaveBeenCalledWith( {
			id: baseProps.id,
			weightValue: 100,
			sizeValue: baseProps.size.value,
		} );
	} );

	it( 'should display default values', () => {
		const props = {
			...baseProps,
			size: {
				label: 'Size',
				min: 2,
				max: 96,
				default: 96,
			},
			weight: {
				label: 'Weight',
				default: 400,
				choices: [
					{ label: 'Light', value: 100 },
					{ label: 'Normal', value: 400 },
					{ label: 'Medium', value: 500 },
				],
			},
		};

		const wrapper = setupShallow( props );
		expect( wrapper.find( 'input' ).props().value ).toStrictEqual( 96 );
		expect(
			wrapper.find( '.components-range-control__select' ).props().value
		).toStrictEqual( 400 );
	} );
} );
