import '@testing-library/jest-dom/extend-expect';

/**
 * Internal dependencies
 */
import { reducer } from '../../../assets/src/getting-started/reducer';

const initialState = {
	activeTab: 'THEME',
	completed: [ 'WIZARD' ],
	status: 'IDLE',
	actionToInstall: null,
	error: {},
	themeStatus: 'ok',
	contentStatus: 'ok',
	tabs: [
		{
			WIZARD: 'Example tab',
		},
	],
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

		expect( result.activeTab ).toStrictEqual( 'DEMO' );
	} );

	it( 'should go back one step', () => {
		const action = {
			type: 'PREVIOUS_STEP',
			payload: null,
		};

		const state = {
			...initialState,
			activeTab: 'WIZARD',
		};

		const result = reducer( state, action );

		expect( result.activeTab ).toStrictEqual( 'WIZARD' );
	} );

	it( 'should add previous step to completed', () => {
		const action = {
			type: 'NEXT_STEP',
			payload: null,
		};

		const result = reducer( initialState, action );

		expect( result.completed ).toHaveLength( 2 );
	} );
} );
