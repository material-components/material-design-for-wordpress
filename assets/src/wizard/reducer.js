/* global mtbWizard */
import { STEPS } from './steps';
import { ADDONS } from './addons';
import { handleThemeActivation, handleDemoImporter } from './utils';

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

	if ( 'NEXT_STEP' === type ) {
		const stepIndex = steps.indexOf( active );

		if ( stepIndex + 1 === steps.length ) {
			return state;
		}

		return {
			...state,
			previous: [ active, ...previous ],
			active: steps[ stepIndex + 1 ],
		};
	}

	if ( 'PREVIOUS_STEP' === type ) {
		const stepIndex = steps.indexOf( active );
		let newState = { ...state };
		const newActive = steps[ stepIndex - 1 ];

		newState = {
			...state,
			previous: previous.filter( item => item !== newActive ),
		};

		newState.active = newActive;

		return newState;
	}

	if ( 'TOGGLE_ADDON' === type ) {
		if ( ! addons.includes( payload ) ) {
			return { ...state, addons: [ payload, ...addons ] };
		}

		return { ...state, addons: addons.filter( item => item !== payload ) };
	}

	if ( 'SUBMIT_WIZARD' === type ) {
		if ( 0 === addons.length ) {
			window.location.replace( mtbWizard.settingsUrl );
		}

		if ( addons.includes( ADDONS.THEME ) ) {
			handleThemeActivation();
		}

		if ( addons.includes( ADDONS.DEMO ) ) {
			handleDemoImporter();
		}
	}

	return state;
};
