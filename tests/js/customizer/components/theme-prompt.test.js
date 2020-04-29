/**
 * External dependencies
 */
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';

/**
 * Internal dependencies
 */
import ThemePrompt from '../../../../assets/src/customizer/components/theme-prompt';

/**
 * Render the component.
 *
 * @param {Object} props - Component props
 * @return {Function} A functional component.
 */
const setup = props => {
	return render( <ThemePrompt { ...props } /> );
};

const baseProps = { status: 'install' };

describe( 'ThemePrompt', () => {
	it( 'should render the prompt and ask to install', () => {
		setup( baseProps );
		expect( screen.getAllByText( 'Install Material Theme' )[0] ).toBeInTheDocument();
	} );

	it( 'should render the prompt and ask to activate', () => {
		setup( { status: 'activate' } );
		expect( screen.getAllByText( 'Activate Material Theme' )[0] ).toBeInTheDocument();
	} );

	it( 'should not render the prompt if the status is "ok"', () => {
		setup( { status: 'ok' } );

		expect( screen.queryByText( 'Install Material Theme' ) ).toBeNull();
		expect( screen.queryByText( 'Activate Material Theme' ) ).toBeNull();
	} );
} );
