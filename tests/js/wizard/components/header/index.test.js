import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';

/**
 * Internal dependencies
 */
import Header from '../../../../../assets/src/wizard/components/header';

/**
 * Render the component
 *
 * @return {Function} A functional component.
 */
const setup = () => {
	return render( <Header /> );
};

describe( 'Header', () => {
	it( 'should render title', () => {
		const { container } = setup();

		expect(
			container.querySelectorAll( '.mdc-typography--headline5' )
		).toHaveLength( 1 );
	} );

	it( 'should render title text', () => {
		const { container } = setup();

		expect(
			container.querySelector( '.mdc-typography--headline5' )
		).toHaveTextContent( 'Material Design for WordPress' );
	} );

	it( 'should render logo', () => {
		const { container } = setup();

		expect( container.querySelectorAll( 'svg' ) ).toHaveLength( 1 );
	} );
} );
