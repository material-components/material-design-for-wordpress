/**
 * WordPress dependencies
 */
import { createContext, useReducer } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { reducer } from './reducer';
import { STEPS, STATUS, ADDONS } from './constants';

/**
 * Setups context to be used across the app
 */
const StepContext = createContext();

const { Provider } = StepContext;

/**
 * Default state of the world
 *
 */
const initialState = {
	addons: Object.keys( ADDONS ),
	active: STEPS.WELCOME,
	previous: [],
	status: STATUS.IDLE,
	error: {},
};

/**
 * Creates a wrapper in order to use our custom reducer
 *
 * @param {*} param Children to render
 */
export const StepProvider = ( { children } ) => {
	const [ state, dispatch ] = useReducer( reducer, initialState );

	return <Provider value={ { state, dispatch } }>{ children }</Provider>;
};

export default StepContext;
