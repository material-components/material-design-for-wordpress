/**
 * External dependencies
 */
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';

/**
 * Internal dependencies
 */
import InspectorControlsContentPanel from '../../../../../../assets/src/block-editor/blocks/card/components/inspector-controls-content-panel';

/**
 * Render the component.
 *
 * @param {Object} props - Component props.
 * @return {Function} A functional component.
 */
const setup = props => {
	return render( <InspectorControlsContentPanel { ...props } /> );
};

const baseProps = {
	cardLayoutStyle: 'vertical',
	displayTitle: true,
	displaySecondaryText: true,
	displayImage: true,
	displaySupportingText: true,
	displayActions: true,
	displaySecondaryActionButton: true,
	isSingleCard: true,
	setter: jest.fn(),
	cardIndex: 0,
	isPanelInitialOpened: true,
};

describe( 'InspectorControlsContentPanel', () => {
	afterEach( () => {
		jest.clearAllMocks();
	} );

	it( 'matches snapshot', () => {
		const wrapper = setup( baseProps );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'matches snapshot when props get defaults', () => {
		const props = { ...baseProps };
		delete props.cardLayoutStyle;
		delete props.isPanelInitialOpened;
		const wrapper = setup( props );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'matches snapshot when it is not a single card', () => {
		const props = { ...baseProps };
		props.isSingleCard = false;
		const wrapper = setup( props );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'matches snapshot when the card layout style is horizontal', () => {
		const props = { ...baseProps };
		props.cardLayoutStyle = 'horizontal';
		const wrapper = setup( props );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'matches snapshot when the display title prop is unselected', () => {
		const props = { ...baseProps };
		props.displayTitle = false;
		const wrapper = setup( props );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'matches snapshot when the display actions prop is unselected', () => {
		const props = { ...baseProps };
		props.displayActions = false;
		const wrapper = setup( props );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'updates the display title and display secondary text when the display title prop when is changed', () => {
		const props = { ...baseProps };
		const { getByLabelText } = setup( props );

		fireEvent.click( getByLabelText( 'Show title' ) );

		expect( props.setter.mock.calls ).toMatchObject( [
			[ 'displayTitle', false, 0 ],
			[ 'displaySecondaryText', false, 0 ],
		] );
	} );

	it( "updates the display secondary text prop when it's changed", () => {
		const props = { ...baseProps };
		const { getByLabelText } = setup( props );

		fireEvent.click( getByLabelText( 'Show secondary text' ) );

		expect( props.setter ).toHaveBeenCalledWith(
			'displaySecondaryText',
			false,
			0
		);
	} );

	it( "updates the display image prop when it's changed", () => {
		const props = { ...baseProps };
		const { getByLabelText } = setup( props );

		fireEvent.click( getByLabelText( 'Show image' ) );

		expect( props.setter ).toHaveBeenCalledWith( 'displayImage', false, 0 );
	} );

	it( "updates the display supporting text prop when it's changed", () => {
		const props = { ...baseProps };
		const { getByLabelText } = setup( props );

		fireEvent.click( getByLabelText( 'Show supporting text' ) );

		expect( props.setter ).toHaveBeenCalledWith(
			'displaySupportingText',
			false,
			0
		);
	} );

	it( "updates the display actions prop when it's changed", () => {
		const props = { ...baseProps };
		const { getByLabelText } = setup( props );

		fireEvent.click( getByLabelText( 'Show actions' ) );

		expect( props.setter ).toHaveBeenCalledWith( 'displayActions', false, 0 );
	} );

	it( "updates the display secondary action button prop when it's changed", () => {
		const props = { ...baseProps };
		const { getByLabelText } = setup( props );

		fireEvent.click( getByLabelText( 'Show secondary action button' ) );

		expect( props.setter ).toHaveBeenCalledWith(
			'displaySecondaryActionButton',
			false,
			0
		);
	} );
} );
