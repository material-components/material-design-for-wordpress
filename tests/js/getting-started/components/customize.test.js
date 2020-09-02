/**
 * External dependencies
 */
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';

/**
 * Internal dependencies
 */
import { Customize } from '../../../../assets/src/getting-started/components/content/customize';
import { TabProvider } from '../../../../assets/src/getting-started/context';

const setup = () => {
	return render(
		<TabProvider>
			<Customize />
		</TabProvider>
	);
};

describe( 'GSM: Customize', () => {
	it( 'matches snapshot', () => {
		const wrapper = setup();
		expect( wrapper ).toMatchSnapshot();
	} );
} );
