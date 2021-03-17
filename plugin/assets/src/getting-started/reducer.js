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
import { STATUS } from '../wizard/constants';
import { ACTIONS, TABS } from './constants';

/**
 * Actions to be taken during the app's life circle
 *
 * @param {*} state  Current state of the world
 * @param {*} action Action dispatched
 */
export const reducer = ( state, action ) => {
	const { type, payload } = action;
	const { activeTab, completed } = state;

	if ( ACTIONS.GOTO_STEP === type ) {
		return { ...state, activeTab: payload.value };
	}

	if ( ACTIONS.MARK_COMPLETE === type ) {
		return { ...state, completed: payload.value };
	}

	if ( ACTIONS.NEXT_STEP === type ) {
		const steps = Object.keys( TABS );
		const stepIndex = steps.indexOf( activeTab );

		if ( stepIndex + 1 === steps.length ) {
			return state;
		}

		return {
			...state,
			activeTab: steps[ stepIndex + 1 ],
			completed: [ activeTab, ...completed ],
			status: STATUS.IDLE,
		};
	}

	if ( ACTIONS.PREVIOUS_STEP === type ) {
		const steps = Object.keys( TABS );
		const stepIndex = steps.indexOf( activeTab );
		let newState = { ...state };
		const newActive = steps[ stepIndex - 1 ];

		newState = {
			...state,
			completed: completed.filter( item => item !== newActive ),
		};

		newState.activeTab = newActive;

		return newState;
	}

	if ( ACTIONS.INSTALL_THEME === type ) {
		return {
			...state,
			status: STATUS.PENDING,
			actionToInstall: ACTIONS.ACTIVATE_THEME,
		};
	}

	if ( ACTIONS.THEME_INSTALLED === type ) {
		return { ...state, themeStatus: 'ok' };
	}

	if ( ACTIONS.DEMO_INSTALLED === type ) {
		return { ...state, contentStatus: 'ok' };
	}

	if ( ACTIONS.ACTIVATE_THEME === type ) {
		return {
			...state,
			actionToInstall: ACTIONS.ACTIVATE_THEME,
			status: STATUS.PENDING,
		};
	}

	if ( ACTIONS.INSTALL_DEMO_CONTENT === type ) {
		return {
			...state,
			actionToInstall: ACTIONS.INSTALL_DEMO_CONTENT,
			status: STATUS.PENDING,
		};
	}

	if ( ACTIONS.SET_THEME_OK === type ) {
		return { ...state, themeStatus: 'ok' };
	}

	if ( ACTIONS.SET_DEMO_OK === type ) {
		return { ...state, contentStatus: 'ok' };
	}

	return state;
};
