/**
 * External dependencies
 */
import '@testing-library/jest-dom/extend-expect';
import { render, cleanup } from '@testing-library/react';

/**
 * Internal dependencies
 */
import Navigation from '../../../../../assets/src/getting-started/components/navigation';
import { TabProvider } from '../../../../../assets/src/getting-started/context';

const setup = () => {
	return render(
		<TabProvider>
			<Navigation />
		</TabProvider>
	);
};

describe( 'GSM: Navigation', () => {
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
