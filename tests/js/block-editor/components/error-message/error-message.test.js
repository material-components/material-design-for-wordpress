/**
 * External dependencies
 */
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';

/**
 * Internal dependencies
 */
import ErrorMessage from '../../../../../assets/src/block-editor/components/error-message/error-message';

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
	it( 'matches snapshot when there is no error message or type provided', () => {
		const props = {
			error: {},
		};
		const wrapper = setup( props );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'matches snapshot when there is a general error type', () => {
		const props = {
			error: {
				type: 'general',
				message: 'Test general message',
			},
		};
		const wrapper = setup( props );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'matches snapshot when there is an API error type', () => {
		const props = {
			error: {
				type: 'api',
				message: 'Test api message',
			},
		};
		const wrapper = setup( props );
		expect( wrapper ).toMatchSnapshot();
	} );
} );
