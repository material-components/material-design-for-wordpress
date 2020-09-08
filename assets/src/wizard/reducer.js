/**
 * Internal dependencies
 */
import { STEPS, STATUS, ACTIONS } from './constants';

/**
 * Actions to be taken during the app's life circle
 *
 * @param {*} state  Current state of the world
 * @param {*} action Action dispatched
 */

export const reducer = ( state, action ) => {
	const steps = Object.keys( STEPS );
	const { active, previous, addons } = state;
	const { type, payload } = action;

	if ( ACTIONS.NEXT_STEP === type ) {
		const stepIndex = steps.indexOf( active );

		if ( stepIndex + 1 === steps.length ) {
			return state;
		}

		return {
			...state,
			previous: [ active, ...previous ],
			active: steps[ stepIndex + 1 ],
			status: STATUS.IDLE,
		};
	}

	if ( ACTIONS.PREVIOUS_STEP === type ) {
		const stepIndex = steps.indexOf( active );
		let newState = { ...state };
		const newActive = steps[ stepIndex - 1 ];

		newState = {
			...state,
			previous: previous.filter( item => item !== newActive ),
			status: STATUS.IDLE,
		};

		newState.active = newActive;

		return newState;
	}

	if ( ACTIONS.TOGGLE_ADDON === type ) {
		if ( ! addons.includes( payload ) ) {
			return { ...state, addons: [ payload, ...addons ] };
		}

		return { ...state, addons: addons.filter( item => item !== payload ) };
	}

	if ( ACTIONS.SUBMIT_WIZARD === type ) {
		return { ...state, status: STATUS.PENDING };
	}

	if ( ACTIONS.WIZARD_ERROR === type ) {
		return { ...state, status: STATUS.ERROR, error: payload };
	}

	return state;
};
