/**
 * External dependencies
 */
import '@testing-library/jest-dom/extend-expect';
import { render, cleanup } from '@testing-library/react';

/**
 * Internal dependencies
 */
import Navigation from '../../../../../assets/src/wizard/components/navigation';
import { StepProvider } from '../../../../../assets/src/wizard/context';

const setup = () => {
	return render(
		<StepProvider>
			<Navigation />
		</StepProvider>
	);
};

describe( 'Wizard: Navigation', () => {
	beforeAll( () => {
		global.mtbWizard = {
			assetsPath: 'http://example.com/',
			placeholderSmall: 'http://example.com/image-small.png',
			placeholderImage: 'http://example.com/image.png',
		};
	} );

	afterEach( cleanup );

	it( 'matches snapshot', () => {
		const wrapper = setup();
		expect( wrapper ).toMatchSnapshot();
	} );
} );
