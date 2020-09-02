/**
 * External dependencies
 */
import '@testing-library/jest-dom/extend-expect';
import { render, cleanup } from '@testing-library/react';

/**
 * Internal dependencies
 */
import { Layout } from '../../../../assets/src/getting-started/components/content/layout';
import { TabProvider } from '../../../../assets/src/getting-started/context';

const setup = () => {
	return render(
		<TabProvider>
			<Layout />
		</TabProvider>
	);
};

describe( 'GSM: Layout', () => {
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
