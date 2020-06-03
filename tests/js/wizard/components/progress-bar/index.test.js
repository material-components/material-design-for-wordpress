/**
 * External dependencies
 */
import '@testing-library/jest-dom/extend-expect';
import { render, cleanup } from '@testing-library/react';

/**
 * Internal dependencies
 */
import ProgressBar from '../../../../../assets/src/wizard/components/progress-bar';
import { StepProvider } from '../../../../../assets/src/wizard/context';

describe( 'Wizard: ProgressBar', () => {
	afterEach( cleanup );

	it( 'matches snapshot', () => {
		const wrapper = render(
			<StepProvider>
				<ProgressBar />
			</StepProvider>
		);
		expect( wrapper ).toMatchSnapshot();
	} );
} );
