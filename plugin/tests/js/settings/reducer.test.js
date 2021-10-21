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
import { reducer } from '../../../assets/src/settings/reducer';

const initialState = {
	status: 'idle',
	apiStatus: 'ok',
	updaters: {
		FONTS: {
			title: 'Google Fonts',
			type: 'FONTS',
			lastUpdated: Date.now(),
			needsKey: true,
			updateAvailable: true,
			autoUpdates: true,
		},
	},
	errors: {},
};

describe( 'Settings: Reducer', () => {
	it( 'should return default state', () => {
		const action = {
			type: null,
			payload: null,
		};

		const result = reducer( initialState, action );

		expect( result ).toStrictEqual( initialState );
	} );

	it( 'should toggle auto updates', () => {
		const action = {
			type: 'TOGGLE_UPDATES',
			payload: { type: 'FONTS' },
		};

		const result = reducer( initialState, action );

		expect( result.updaters.FONTS.autoUpdates ).toStrictEqual( false );
	} );

	it( 'should remove API key', () => {
		const action = {
			type: 'REMOVE_API_KEY',
		};

		const result = reducer( initialState, action );

		expect( result.apiStatus ).toStrictEqual( 'install' );
	} );

	it( 'should add API key', () => {
		const lastUpdated = Date.now();

		const action = {
			type: 'ADD_API_KEY',
			payload: { lastUpdated },
		};

		const result = reducer( initialState, action );

		expect( result.apiStatus ).toStrictEqual( 'ok' );
		expect( result.updaters.FONTS.updateAvailable ).toStrictEqual( false );
		expect( result.updaters.FONTS.lastUpdated ).toStrictEqual(
			lastUpdated
		);
	} );

	it( 'should set last updated', () => {
		const lastUpdated = Date.now();

		const action = {
			type: 'SET_UPDATED',
			payload: {
				lastUpdated,
				type: 'FONTS',
			},
		};

		const result = reducer( initialState, action );

		expect( result.updaters.FONTS.updateAvailable ).toStrictEqual( false );
		expect( result.updaters.FONTS.lastUpdated ).toStrictEqual(
			lastUpdated
		);
	} );

	it( 'should add error', () => {
		const action = {
			type: 'ADD_ERROR',
			payload: {
				id: 'api_error',
				error: {
					message: 'example error',
				},
			},
		};

		const result = reducer( initialState, action );

		expect( result.errors ).toHaveProperty( 'api_error' );
	} );

	it( 'should remove error', () => {
		const state = {
			status: 'idle',
			apiStatus: 'ok',
			updaters: {
				FONTS: {
					title: 'Google Fonts',
					type: 'FONTS',
					lastUpdated: Date.now(),
					needsKey: true,
					updateAvailable: true,
					autoUpdates: true,
				},
			},
			errors: {
				api_error: {
					message: 'Test Error',
				},
			},
		};

		const action = {
			type: 'REMOVE_ERROR',
			payload: { id: 'api_error' },
		};

		const result = reducer( state, action );

		expect( result.errors ).not.toHaveProperty( 'api_error' );
	} );

	it( 'should remove all errors', () => {
		const state = {
			status: 'idle',
			apiStatus: 'ok',
			updaters: {
				FONTS: {
					title: 'Google Fonts',
					type: 'FONTS',
					lastUpdated: Date.now(),
					needsKey: true,
					updateAvailable: true,
					autoUpdates: true,
				},
			},
			errors: {
				api_error: {
					message: 'Test Error',
				},
			},
		};

		const action = {
			type: 'CLEAR_ERRORS',
			payload: { id: 'api_error' },
		};

		const result = reducer( state, action );

		expect( result.errors ).toStrictEqual( {} );
	} );
} );
