/**
 * External dependencies
 */
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';

/**
 * Internal dependencies
 */
import Tab from '../../../../../assets/src/getting-started/components/navigation/tab';
import { TabProvider } from '../../../../../assets/src/getting-started/context';

const setup = () => {
	return render(
		<TabProvider>
			<Tab />
		</TabProvider>
	);
};

describe( 'GSM: Tab', () => {
	it( 'matches snapshot', () => {
		const wrapper = setup();
		expect( wrapper ).toMatchSnapshot();
	} );
} );
