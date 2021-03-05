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

	console.log( action );

	if ( ACTIONS.TOGGLE_UPDATES === type ) {
		const updates = { ...state.updates };

		updates[ payload.update ] = ! updates[ payload.update ];

		return {
			...state,
			updates,
		};
	}

	return state;
};
