/**
 * External dependencies
 */
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';

/**
 * Internal dependencies
 */
import RecaptchaInspectorControlsPanel from '../../../../../../assets/src/block-editor/blocks/contact-form/components/recaptcha-inspector-controls-panel';

/**
 * Render the component.
 *
 * @param {Object} props - Component props.
 * @return {Function} A functional component.
 */
const setup = props => {
	return render( <RecaptchaInspectorControlsPanel { ...props } /> );
};

const baseProps = {};

describe( 'RecaptchaInspectorControlsPanel', () => {
	beforeAll( () => {
		global.mtb = {
			recaptcha_site_key: 'test-key',
			recaptcha_client_secret: 'test-secret',
		};
	} );

	afterEach( () => {
		jest.clearAllMocks();
	} );

	it( 'matches snapshot', () => {
		const wrapper = setup( baseProps );
		expect( wrapper ).toMatchSnapshot();
	} );
} );
