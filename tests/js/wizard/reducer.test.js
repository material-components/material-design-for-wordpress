import '@testing-library/jest-dom/extend-expect';

/**
 * Internal dependencies
 */
import { reducer } from '../../../assets/src/wizard/reducer';

const initialState = {
	addons: [ 'THEME', 'DEMO' ],
	active: 'WELCOME',
	previous: [],
	status: 'IDLE',
};

describe( 'Reducer', () => {
	it( 'should return default state', () => {
		const action = {
			type: null,
			payload: null,
		};

		const result = reducer( initialState, action );

		expect( result ).toStrictEqual( initialState );
	} );

	it( 'should change active step', () => {
		const action = {
			type: 'NEXT_STEP',
			payload: null,
		};

		const result = reducer( initialState, action );

		expect( result.active ).toStrictEqual( 'ADDONS' );
	} );

	it( 'should go back one step', () => {
		const action = {
			type: 'PREVIOUS_STEP',
			payload: null,
		};

		const state = {
			...initialState,
			active: 'ADDONS',
		};

		const result = reducer( state, action );

		expect( result.active ).toStrictEqual( 'WELCOME' );
	} );

	it( 'should add previous step', () => {
		const action = {
			type: 'NEXT_STEP',
			payload: null,
		};

		const result = reducer( initialState, action );

		expect( result.previous ).toHaveLength( 1 );
	} );

	it( 'should remove previous step', () => {
		const action = {
			type: 'PREVIOUS_STEP',
			payload: null,
		};

		const state = {
			...initialState,
			active: 'WORK',
			previous: [ 'WELCOME', 'ADDONS' ],
		};

		const result = reducer( state, action );

		expect( result.previous ).toHaveLength( 1 );
	} );

	it( 'should add addon to array', () => {
		const action = {
			type: 'TOGGLE_ADDON',
			payload: 'DEMO',
		};

		const state = {
			...initialState,
			addons: [],
		};

		const result = reducer( state, action );

		expect( result.addons ).toHaveLength( 1 );
	} );

	it( 'should remove addon', () => {
		const action = {
			type: 'TOGGLE_ADDON',
			payload: 'DEMO',
		};

		const result = reducer( initialState, action );

		expect( result.addons ).toHaveLength( 1 );
	} );

	it( 'should be pending status', () => {
		const action = {
			type: 'SUBMIT_WIZARD',
			payload: null,
		};

		const result = reducer( initialState, action );

		expect( result.status ).toStrictEqual( 'PENDING' );
	} );
} );
