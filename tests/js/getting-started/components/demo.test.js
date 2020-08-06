/**
 * External dependencies
 */
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';

/**
 * Internal dependencies
 */
import { Demo } from '../../../../assets/src/getting-started/components/content/demo';
import { TabProvider } from '../../../../assets/src/getting-started/context';

const setup = () => {
	return render(
		<TabProvider>
			<Demo />
		</TabProvider>
	);
};

describe( 'GSM: Demo', () => {
	it( 'matches snapshot', () => {
		const wrapper = setup();
		expect( wrapper ).toMatchSnapshot();
	} );
} );
