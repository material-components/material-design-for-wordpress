/**
 * External dependencies
 */
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';

/**
 * Internal dependencies
 */
import ErrorMessage from '../../../../../assets/src/block-editor/components/error-message/index';

/**
 * Render the component.
 *
 * @param {Object} props - Component props.
 * @return {Function} A functional component.
 */
const setup = props => {
	return render( <ErrorMessage { ...props } /> );
};

describe( 'ErrorMessage', () => {
	it( 'matches snapshot when there is an error message', () => {
		const props = {
			className: 'test-class',
			error: {
				type: 'general',
				message: 'Test general message',
			},
		};
		const wrapper = setup( props );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'matches snapshot when there is an error message and onRetry callback is provided', () => {
		const props = {
			className: 'test-class',
			error: {
				type: 'general',
				message: 'Test general message',
			},
			onRetry: () => jest.fn(),
		};
		const wrapper = setup( props );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'matches snapshot when there is an error message and onRetry callback is provided and it is loading', () => {
		const props = {
			className: 'test-class',
			error: {
				type: 'general',
				message: 'Test general message',
			},
			onRetry: () => jest.fn(),
			isLoading: true,
		};
		const wrapper = setup( props );
		expect( wrapper ).toMatchSnapshot();
	} );
} );
