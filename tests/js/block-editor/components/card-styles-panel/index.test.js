/**
 * External dependencies
 */
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';

/**
 * Internal dependencies
 */
import CardStylesPanel from '../../../../../assets/src/block-editor/components/card-styles-panel';

/**
 * Render the component.
 *
 * @param {Object} props - Component props.
 * @return {Function} A functional component.
 */
const setup = props => {
	return render( <CardStylesPanel { ...props } /> );
};

const baseProps = {
	style: 'masonry',
	columns: 4,
	allowIndividualStyleOverride: false,
	showAllowIndividualStyleOverride: false,
	showColumns: true,
	minColumns: 2,
	maxColumns: 4,
	contentLayout: 'text-over-media',
	showContentLayout: true,
	gutter: 16,
	showGutter: true,
	cornerRadius: 4,
	showCornerRadius: false,
	minRoundedCornersRadius: 0,
	maxRoundedCornersRadius: 24,
	outlined: true,
	showOutlined: true,
	setter: jest.fn(),
};

describe( 'CardStylesPanel', () => {
	afterEach( () => {
		jest.clearAllMocks();
	} );

	it( 'matches snapshot', () => {
		const wrapper = setup( baseProps );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'matches snapshot when overrides are enabled', () => {
		const props = { ...baseProps };
		baseProps.showAllowIndividualStyleOverride = true;
		baseProps.allowIndividualStyleOverride = true;
		const wrapper = setup( props );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'updates correct device gutter on gutter change', () => {
		const props = { ...baseProps };
		const { container, getByText } = setup( props );
		const button = getByText( /computer/i );

		fireEvent.click( button );
		fireEvent.change(
			container.querySelectorAll( '.components-range-control__number' )[ 0 ],
			{
				target: { value: 12 },
			}
		);

		// TODO: This might not be the correct test.
		expect( props.setter.mock.calls[ 0 ][ 0 ] ).toStrictEqual( 'gutter' );
	} );
} );
