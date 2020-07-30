/**
 * External dependencies
 */
import '@testing-library/jest-dom/extend-expect';
import { render, cleanup } from '@testing-library/react';

/**
 * Internal dependencies
 */
import GettingStarted from '../../../assets/src/getting-started/components/index';
import { TabProvider } from '../../../assets/src/getting-started/context';

const setup = () => {
	return render(
		<TabProvider>
			<GettingStarted />
		</TabProvider>
	);
};

describe( 'GSM: Getting Started', () => {
	beforeAll( () => {
		global.mtbGsm = {
			themeStatus: 'ok',
			contentStatus: 'ok',
		};
	} );

	afterEach( cleanup );

	it( 'matches snapshot', () => {
		const wrapper = setup();
		expect( wrapper ).toMatchSnapshot();
	} );
} );
