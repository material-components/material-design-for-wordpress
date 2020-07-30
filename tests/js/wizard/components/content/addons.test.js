/**
 * External dependencies
 */
import '@testing-library/jest-dom/extend-expect';
import { render, cleanup } from '@testing-library/react';

/**
 * Internal dependencies
 */
import Addons from '../../../../../assets/src/wizard/components/content/addons';
import { StepProvider } from '../../../../../assets/src/wizard/context';

const setup = () => {
	return render(
		<StepProvider>
			<Addons />
		</StepProvider>
	);
};

describe( 'Wizard: Addons', () => {
	beforeAll( () => {
		global.mtbWizard = {
			assetsPath: 'http://example.com/',
			placeholderSmall: 'http://example.com/image-small.png',
			placeholderImage: 'http://example.com/image.png',
		};

		global.mtbOnboarding = {
			themeStatus: 'ok',
		};
	} );

	afterEach( cleanup );

	it( 'matches snapshot', () => {
		const wrapper = setup();
		expect( wrapper ).toMatchSnapshot();
	} );
} );
