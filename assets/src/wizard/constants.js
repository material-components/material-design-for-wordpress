/**
 * App statuses
 */
export const STATUS = {
	IDLE: 'IDLE',
	PENDING: 'PENDING',
	SUCCESS: 'SUCCESS',
	ERROR: 'ERROR',
};

/**
 * Screens available inside the app
 */
export const STEPS = {
	WELCOME: 'WELCOME',
	ADDONS: 'ADDONS',
	WORK: 'WORK',
};

/**
 * Available actions
 */
export const ACTIONS = {
	SUBMIT_WIZARD: 'SUBMIT_WIZARD',
	NEXT_STEP: 'NEXT_STEP',
	PREVIOUS_STEP: 'PREVIOUS_STEP',
	WIZARD_ERROR: 'WIZARD_ERROR',
	TOGGLE_ADDON: 'TOGGLE_ADDON',
};

/**
 * Supported addons
 */
export const ADDONS = {
	THEME: 'THEME',
	DEMO: 'DEMO',
};
