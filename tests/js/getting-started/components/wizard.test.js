/**
 * External dependencies
 */
import '@testing-library/jest-dom/extend-expect';
import { render, cleanup } from '@testing-library/react';

/**
 * Internal dependencies
 */
import { Wizard } from '../../../../assets/src/getting-started/components/content/wizard';
import { TabProvider } from '../../../../assets/src/getting-started/context';

const setup = () => {
	return render(
		<TabProvider>
			<Wizard />
		</TabProvider>
	);
};

describe( 'GSM: Wizard', () => {
	beforeAll( () => {
		global.mtbGsm = {
			wizardUrl: 'http://example.com',
		};
	} );

	afterEach( cleanup );

	it( 'matches snapshot', () => {
		const wrapper = setup();
		expect( wrapper ).toMatchSnapshot();
	} );
} );
