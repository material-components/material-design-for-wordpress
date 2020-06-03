import { render } from '@testing-library/react';

/**
 * Internal dependencies
 */
import { Logo } from '../../../../../assets/src/wizard/components/svg/logo';

/**
 * Render the component
 *
 * @param {Object} props - Component props
 * @return {Function} A functional component.
 */

const setup = () => {
	return render( <Logo /> );
};

describe( 'Logo', () => {
	it( 'should render svg', () => {
		const { container } = setup();

		expect( container.querySelectorAll( 'svg' ) ).toHaveLength( 1 );
	} );
} );
