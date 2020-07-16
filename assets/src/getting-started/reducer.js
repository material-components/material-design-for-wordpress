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
		return { ...state, status: STATUS.PENDING };
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

	if ( ACTIONS.ERROR === type ) {
		return { ...state, status: STATUS.ERROR, error: payload };
	}

	return state;
};
