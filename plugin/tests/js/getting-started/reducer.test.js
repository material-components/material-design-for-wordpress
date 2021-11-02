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
import { reducer } from '../../../assets/src/getting-started/reducer';

const initialState = {
	activeTab: 'OVERVIEW',
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

		expect( result.activeTab ).toStrictEqual( 'UPDATES' );
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

	it( 'should go to specific step', () => {
		const action = {
			type: 'GOTO_STEP',
			payload: {
				value: 'LAYOUT',
			},
		};

		const result = reducer( initialState, action );

		expect( result.activeTab ).toStrictEqual( 'LAYOUT' );
	} );

	it( 'should install theme', () => {
		const action = {
			type: 'INSTALL_THEME',
		};

		const result = reducer( initialState, action );

		expect( result.status ).toStrictEqual( 'PENDING' );
		expect( result.actionToInstall ).toStrictEqual( 'ACTIVATE_THEME' );
	} );

	it( 'should activate theme', () => {
		const action = {
			type: 'ACTIVATE_THEME',
		};

		const result = reducer( initialState, action );

		expect( result.status ).toStrictEqual( 'PENDING' );
		expect( result.actionToInstall ).toStrictEqual( 'ACTIVATE_THEME' );
	} );

	it( 'should install demo content', () => {
		const action = {
			type: 'INSTALL_DEMO_CONTENT',
		};

		const result = reducer( initialState, action );

		expect( result.status ).toStrictEqual( 'PENDING' );
		expect( result.actionToInstall ).toStrictEqual(
			'INSTALL_DEMO_CONTENT'
		);
	} );

	it( 'should update theme status', () => {
		const action = {
			type: 'THEME_INSTALLED',
		};

		const result = reducer( initialState, action );

		expect( result.themeStatus ).toStrictEqual( 'ok' );
	} );

	it( 'should update demo status', () => {
		const action = {
			type: 'DEMO_INSTALLED',
		};

		const result = reducer( initialState, action );

		expect( result.contentStatus ).toStrictEqual( 'ok' );
	} );
} );
