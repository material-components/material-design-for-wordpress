/**
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import '@testing-library/jest-dom/extend-expect';

/**
 * Internal dependencies
 */
import { reducer } from '../../../assets/src/wizard/reducer';

const initialState = {
	addons: [ 'THEME', 'OVERVIEW' ],
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
			payload: 'OVERVIEW',
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
			payload: 'OVERVIEW',
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
