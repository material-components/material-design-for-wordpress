/**
 * External dependencies
 */
import { mount } from 'enzyme';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';

/**
 * Internal dependencies
 */
import Switch from '../../../../../assets/src/wizard/components/content/switch';
import { StepProvider } from '../../../../../assets/src/wizard/context';

const setup = props => {
	return render(
		<StepProvider>
			<Switch { ...props } />
		</StepProvider>
	);
};

const baseProps = {
	id: 'material-wizard__switch',
	text: 'Close',
	checked: true,
	disabled: false,
	onChange: jest.fn(),
};

describe( 'Wizard: Switch', () => {
	const wrapper = mount(
		<StepProvider>
			<Switch { ...baseProps } />
		</StepProvider>
	);

	beforeEach( () => {
		baseProps.onChange.mockClear();
	} );

	it( 'matches snapshot', () => {
		const { container } = setup( baseProps );
		expect( container ).toMatchSnapshot();
	} );

	it( 'should be checked', () => {
		const isChecked = wrapper.find( '.mdc-switch__native-control' );

		expect( isChecked.props() ).toHaveProperty( 'aria-checked', true );
	} );
} );
