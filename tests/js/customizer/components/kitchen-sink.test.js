/**
 * External dependencies
 */
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';

/**
 * Internal dependencies
 */
import KitchenSink from '../../../../assets/src/customizer/components/kitchen-sink';

/**
 * Render the component.
 *
 * @param {Object} props - Component props
 * @return {Function} A functional component.
 */
const setup = props => {
	return render( <KitchenSink { ...props } /> );
};

const baseProps = {
	primaryColor: '#000',
	bodyFontFamily: 'Roboto',
	headFontFamily: 'Roboto',
	iconCollection: 'two-tone',
	secondaryColor: '#000',
	primaryTextColor: '#000',
	secondaryTextColor: '#000',
	smallComponentRadius: 10,
	largeComponentRadius: 5,
	mediumComponentRadius: 2,
};

describe( 'Kitchen Sink', () => {
	beforeAll( () => {
		global.materialPluginPath = 'http://example.com/';
	} );

	it( 'should initialize the kitchen sink', () => {
		const wrapper = setup( baseProps );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'should appear properly in the DOM', () => {
		setup( baseProps );

		const container = document.body;
		const allButtons = container.querySelectorAll( '.mdc-button' );
		const allIconButtons = container.querySelectorAll( '.mdc-icon-button' );
		const allCards = container.querySelectorAll( '.mdc-card' );
		const allTables = container.querySelectorAll( '.mdc-data-table' );
		const allImageLists = container.querySelectorAll( '.mdc-image-list' );
		const allLists = container.querySelectorAll( '.mdc-list' );
		const allTabBars = container.querySelectorAll( '.mdc-tab-bar' );
		const allCheckboxes = container.querySelectorAll( '.mdc-checkbox' );
		const allChips = container.querySelectorAll( '.mdc-chip-set' );
		const allRadios = container.querySelectorAll( '.mdc-radio' );
		const allTextFields = container.querySelectorAll( '.mdc-text-field' );
		const allSwitches = container.querySelectorAll( '.mdc-switch' );

		expect( allButtons.length ).toBeGreaterThanOrEqual( 1 );
		expect( allIconButtons.length ).toBeGreaterThanOrEqual( 1 );
		expect( allCards.length ).toBeGreaterThanOrEqual( 1 );
		expect( allTables.length ).toBeGreaterThanOrEqual( 1 );
		expect( allImageLists.length ).toBeGreaterThanOrEqual( 1 );
		expect( allLists.length ).toBeGreaterThanOrEqual( 1 );
		expect( allTabBars.length ).toBeGreaterThanOrEqual( 1 );
		expect( allChips.length ).toBeGreaterThanOrEqual( 1 );
		expect( allCheckboxes.length ).toBeGreaterThanOrEqual( 1 );
		expect( allRadios.length ).toBeGreaterThanOrEqual( 1 );
		expect( allTextFields.length ).toBeGreaterThanOrEqual( 1 );
		expect( allSwitches.length ).toBeGreaterThanOrEqual( 1 );
		expect( screen.getByText( 'Material Components' ) ).toBeInTheDocument();
	} );

	it( 'should apply props as styles', () => {
		setup( baseProps );

		const container = document.body;
		const button1 = container.querySelector( '.mdc-button--unelevated' );
		const button2 = container.querySelector( '.mdc-button--outlined' );
		const button3 = container.querySelector( '.mdc-button--raised' );
		const card = container.querySelector( '.mdc-card' );
		const imageListImage = container.querySelectorAll(
			'.mdc-image-list__image'
		);

		imageListImage.forEach( img =>
			expect( img ).toHaveStyle(
				`border-radius: ${ baseProps.mediumComponentRadius }px`
			)
		);

		expect( button1 ).toHaveStyle(
			`border-radius: ${ baseProps.smallComponentRadius }px`
		);
		expect( button2 ).toHaveStyle(
			`border-radius: ${ baseProps.smallComponentRadius }px`
		);
		expect( button3 ).toHaveStyle(
			`border-radius: ${ baseProps.smallComponentRadius }px`
		);
		expect( card ).toHaveStyle(
			`border-radius: ${ baseProps.mediumComponentRadius }px`
		);
	} );
} );
