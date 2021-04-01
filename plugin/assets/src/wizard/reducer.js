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
