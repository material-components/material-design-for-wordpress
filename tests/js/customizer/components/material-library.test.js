/**
 * External dependencies
 */
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';

/**
 * Internal dependencies
 */
import MaterialLibrary from '../../../../assets/src/customizer/components/material-library';

/**
 * Render the component.
 *
 * @param {Object} props - Component props
 * @return {Function} A functional component.
 */
const setup = props => {
	return render( <MaterialLibrary { ...props } /> );
};

const baseProps = {
	bodyFontFamily: 'Roboto',
	headFontFamily: 'Roboto',
	iconCollection: 'two-tone',
	primaryColor: '#000',
	secondaryColor: '#000',
	primaryTextColor: '#000',
	secondaryTextColor: '#000',
	surfaceColor: '#fff',
	surfaceTextColor: '#000',
	backgroundColor: '#fff',
	backgroundTextColor: '#000',
	buttonRadius: 4,
	cardRadius: 6,
	chipRadius: 8,
	dataTableRadius: 10,
	imageListRadius: 12,
	navDrawerRadius: 20,
	textFieldRadius: 16,
};

describe( 'Material Library', () => {
	beforeAll( () => {
		global.mtb = {
			images: [
				'https://images.unsplash.com/photo-1531306760863-7fb02a41db12',
				'https://images.unsplash.com/photo-1531307119710-accdb402fe03',
				'https://images.unsplash.com/photo-1558905585-24d5d344c91d',
				'https://images.unsplash.com/photo-1558905586-b023029262f1',
			],
		};
	} );

	it( 'should initialize the material library', () => {
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
				`border-radius: ${ baseProps.imageListRadius }px`
			)
		);

		expect( button1 ).toHaveStyle(
			`border-radius: ${ baseProps.buttonRadius }px`
		);
		expect( button2 ).toHaveStyle(
			`border-radius: ${ baseProps.buttonRadius }px`
		);
		expect( button3 ).toHaveStyle(
			`border-radius: ${ baseProps.buttonRadius }px`
		);
		expect( card ).toHaveStyle( `border-radius: ${ baseProps.cardRadius }px` );
	} );
} );
