import { render } from '@testing-library/react';

/**
 * Internal dependencies
 */
import { Check } from '../../../../../assets/src/wizard/components/svg/check';

/**
 * Render the component
 *
 * @return {Function} A functional component.
 */

const setup = () => {
	return render( <Check /> );
};

describe( 'Check', () => {
	it( 'should render svg', () => {
		const { container } = setup();

		expect( container.querySelectorAll( 'svg' ) ).toHaveLength( 1 );
	} );
} );
