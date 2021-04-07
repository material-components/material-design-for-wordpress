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
		};
	}

	if ( ACTIONS.ADD_API_KEY === type ) {
		return {
			...state,
			apiStatus: 'ok',
		};
	}

	if ( ACTIONS.SET_UPDATED === type ) {
		const newState = state;

		newState.updaters[ payload.type ].updateAvailable = false;
		newState.updaters[ payload.type ].lastUpdated = payload.lastUpdated;

		return {
			...newState,
		};
	}

	return state;
};
