/* global mtbGsm */
/**
 * Setups context to be used across the app
 *
 */
import { useReducer, createContext } from '@wordpress/element';
import { STATUS } from '../wizard/constants';
import { reducer } from './reducer';
import { TABS } from './constants';

const TabContext = createContext();

const { Provider } = TabContext;

const tabs = Object.keys( TABS );

// Assume wizard already ran when activating plugin
let initialTab = tabs[ 1 ];
const completedTabs = [ tabs[ 0 ] ];

// Change initial tab if content and theme are already installed.
if ( 'ok' === mtbGsm.themeStatus ) {
	initialTab = tabs[ 2 ];
	completedTabs.push( tabs[ 1 ] );
}

if ( 'ok' === mtbGsm.contentStatus ) {
	initialTab = tabs[ 3 ];
	completedTabs.push( tabs[ 2 ] );
}

/**
 * Default state of the world
 *
 */
const initialState = {
	activeTab: initialTab,
	completed: completedTabs,
	status: STATUS.IDLE,
	actionToInstall: null,
	error: {},
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
