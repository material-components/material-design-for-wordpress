import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';

/**
 * Internal dependencies
 */
import { Loader } from '../../../../../assets/src/wizard/components/navigation/loader';

describe( 'Wizard: Loader', () => {
	it( 'matches snapshot', () => {
		const { container } = render( <Loader /> );

		expect( container ).toMatchSnapshot();
	} );
} );
