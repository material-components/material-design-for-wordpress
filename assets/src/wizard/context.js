/**
 * Setups context to be used across the app
 *
 */
import React, { useReducer } from 'react';
import { reducer } from './reducer';
import { STEPS } from './steps';
import { ADDONS } from './addons';

const StepContext = React.createContext();

const { Provider } = StepContext;

/**
 * Default state of the world
 *
 */
const initialState = {
	addons: Object.keys( ADDONS ),
	active: STEPS.WELCOME,
	previous: [],
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
