/**
 * Setups context to be used across the app
 *
 */
import { useReducer, createContext } from '@wordpress/element';
import { reducer } from './reducer';
import { TABS } from './constants';

const TabContext = createContext();

const { Provider } = TabContext;

const tabs = Object.keys( TABS );

/**
 * Default state of the world
 *
 */
const initialState = {
	activeTab: tabs[ 0 ],
	previous: [],
	tabs,
};

/**
 * Creates a wrapper in order to use our custom reducer
 *
 * @param {*} param Children to render
 */
export const TabProvider = ( { children } ) => {
	const [ state, dispatch ] = useReducer( reducer, initialState );

	return <Provider value={ { state, dispatch } }>{ children }</Provider>;
};

export default TabContext;
