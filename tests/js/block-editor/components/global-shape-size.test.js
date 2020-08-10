/**
 * External dependencies
 */
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';

/**
 * Internal dependencies
 */
import GlobalShapeSize from '../../../../assets/src/block-editor/components/global-shape-size';

/**
 * Render the component.
 *
 * @param {Object} props - Component props.
 * @return {Function} A functional component.
 */
const setup = props => {
	return render( <GlobalShapeSize { ...props } /> );
};

const baseProps = {
	value: 10,
	onChange: jest.fn(),
	min: 0,
	max: 20,
	blockName: 'material/button',
};

describe( 'GlobalShapeSize', () => {
	beforeEach( () => {
		jest.resetAllMocks();
	} );

	it( 'should match snapshots', () => {
		const props = { ...baseProps };
		expect( setup( props ) ).toMatchSnapshot();

		props.value = 4;
		expect( setup( props ) ).toMatchSnapshot();
	} );
} );
