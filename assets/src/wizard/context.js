import React, { useReducer } from 'react';
import { reducer } from './reducer';
import { STEPS } from './steps';
import { ADDONS } from './addons';

const StepContext = React.createContext();

const { Provider } = StepContext;

const initialState = {
	addons: Object.keys( ADDONS ),
	active: STEPS.WELCOME,
	previous: [],
};

export const StepProvider = ( { children } ) => {
	const [ state, dispatch ] = useReducer( reducer, initialState );

	return <Provider value={ { state, dispatch } }>{ children }</Provider>;
};

export default StepContext;
