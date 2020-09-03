/**
 * External dependencies
 */
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';

/**
 * Internal dependencies
 */
import { withGlobalBlockDefault } from '../../../../assets/src/block-editor/components/with-global-default';

const TestComponent = withGlobalBlockDefault( () => {
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

describe( 'withGlobalBlockDefault', () => {
	beforeAll( () => {
		global.mtb = {
			defaults: {
				blocks: {
					'material/button': {
						cornerRadius: 8,
					},
					'material/card': {
						cornerRadius: 16,
					},
				},
			},
		};
	} );

	it( 'sets attribute value to global default: matches snapshot', () => {
		const props = { ...baseProps };
		expect( setup( props ) ).toMatchSnapshot();
	} );

	it( 'should not set attribute value to global default if the value is already set: matches snapshot', () => {
		const props = { ...baseProps };
		props.attributes.cornerRadius = 4;
		expect( setup( props ) ).toMatchSnapshot();
	} );
} );
