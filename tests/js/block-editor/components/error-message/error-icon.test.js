/**
 * External dependencies
 */
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';

/**
 * Internal dependencies
 */
import ErrorIcon from '../../../../../assets/src/block-editor/components/error-message/error-icon';

describe( 'ErrorIcon', () => {
	it( 'matches snapshot', () => {
		const wrapper = render( <ErrorIcon /> );
		expect( wrapper ).toMatchSnapshot();
	} );
} );
