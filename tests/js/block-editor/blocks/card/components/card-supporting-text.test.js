/**
 * External dependencies
 */
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import { shallow } from 'enzyme';

/**
 * Internal dependencies
 */
import CardSupportingText from '../../../../../../assets/src/block-editor/blocks/card/components/card-supporting-text';

/**
 * Render the component.
 *
 * @param {Object} props - Component props.
 * @return {Function} A functional component.
 */
const setup = props => {
	return render( <CardSupportingText { ...props } /> );
};

const baseProps = {
	supportingText: 'Test supporting text',
	contentLayout: 'text-under-media',
	cardIndex: 0,
	setter: jest.fn(),
	isEditMode: false,
};

describe( 'CardSupportingText', () => {
	it( 'matches snapshot when the edit mode is disabled', () => {
		const wrapper = setup( baseProps );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'matches snapshot when the edit mode is enabled', () => {
		const props = { ...baseProps };
		props.isEditMode = true;
		const wrapper = setup( props );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( "updates the supporting text prop when it's changed", () => {
		const props = { ...baseProps };
		props.isEditMode = true;
		const wrapper = shallow( <CardSupportingText { ...props } /> );

		const mockEvent = { target: { value: 'This is a new supporting text just for test' } };
		wrapper
			.find( '.mtb-card__supporting-text' )
			.simulate( 'change', mockEvent );
		expect( props.setter ).toHaveBeenCalledWith(
			'supportingText',
			mockEvent,
			0
		);
	} );
} );
