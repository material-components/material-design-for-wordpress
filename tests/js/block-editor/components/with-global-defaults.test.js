/**
 * External dependencies
 */
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';

/**
 * Internal dependencies
 */
import { withGlobalDefaults } from '../../../../assets/src/block-editor/components/with-global-defaults';

const TestComponent = withGlobalDefaults( () => {
	return <div>Test Component</div>;
} );

/**
 * Render the component.
 *
 * @param {Object} props - Component props.
 * @return {Function} A functional component.
 */
const setup = props => {
	return render( <TestComponent { ...props } /> );
};

const baseProps = {
	setAttributes: jest.fn(),
	attributes: {},
	name: 'material/button',
};

describe( 'withGlobalDefaults', () => {
	beforeAll( () => {
		global.mtbBlockDefaults = {
			'material/button': {
				cornerRadius: 8,
			},
			'material/card': {
				cornerRadius: 16,
			},
		};
	} );

	beforeEach( () => {
		jest.resetAllMocks();
	} );

	it( 'sets attribute value to global default', () => {
		let props = { ...baseProps };
		setup( props );

		expect( props.setAttributes ).toHaveBeenCalledWith( {
			cornerRadius: 8,
		} );

		props = { ...baseProps };
		props.name = 'material/card';
		setup( props );

		expect( props.setAttributes ).toHaveBeenCalledWith( {
			cornerRadius: 16,
		} );
	} );

	it( 'should not set attribute value to global default if the value is already set', () => {
		let props = { ...baseProps };
		props.attributes.cornerRadius = 4;
		setup( props );

		expect( props.setAttributes ).toHaveBeenCalledTimes( 0 );

		props = { ...baseProps };
		props.attributes.cornerRadius = 0;
		setup( props );

		expect( props.setAttributes ).toHaveBeenCalledTimes( 0 );
	} );
} );
