/**
 * Copyright 2021 Google LLC
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

/**
 * External dependencies
 */
import { omit } from 'lodash';

/**
 * Internal dependencies
 */
import { ACTIONS } from './constants';

/**
 * Actions to be taken during the app's life circle
 *
 * @param {*} state  Current state of the world
 * @param {*} action Action dispatched
 */
export const reducer = ( state, action ) => {
	const { type, payload } = action;

	if ( ACTIONS.TOGGLE_UPDATES === type ) {
		const { updaters } = state;

		updaters[ payload.type ].autoUpdates = ! updaters[ payload.type ]
			.autoUpdates;

		return {
			...state,
			updaters,
		};
	}

	if ( ACTIONS.REMOVE_API_KEY === type ) {
		return {
			...state,
			apiStatus: 'install',
			errors: {},
		};
	}

	if ( ACTIONS.ADD_API_KEY === type ) {
		const newState = state;

		newState.updaters.FONTS.updateAvailable = false;
		newState.updaters.FONTS.lastUpdated = payload.lastUpdated;

		return {
			...newState,
			apiStatus: 'ok',
			errors: {},
		};
	}

	if ( ACTIONS.SET_UPDATED === type ) {
		const newState = state;

		newState.updaters[ payload.type ].updateAvailable = false;
		newState.updaters[ payload.type ].lastUpdated = payload.lastUpdated;

		return {
			...newState,
			errors: {},
		};
	}

	if ( ACTIONS.ADD_ERROR === type ) {
		return {
			...state,
			errors: {
				...state.errors,
				...{ [ payload.id ]: [ payload.error ] },
			},
		};
	}

	if ( ACTIONS.REMOVE_ERROR === type ) {
		return {
			...state,
			errors: omit( state.errors, payload.id ),
		};
	}

	if ( ACTIONS.CLEAR_ERRORS === type ) {
		return {
			...state,
			errors: {},
		};
	}

	return state;
};
