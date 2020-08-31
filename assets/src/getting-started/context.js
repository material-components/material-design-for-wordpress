/**
 * WordPress dependencies
 */
import { useReducer, createContext } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { STATUS } from '../wizard/constants';
import { reducer } from './reducer';
import { TABS } from './constants';

/**
 * Setups context to be used across the app
 */
const TabContext = createContext();

const { Provider } = TabContext;

const tabs = Object.keys( TABS );

/**
 * Default state of the world
 *
 */
const initialState = {
	activeTab: 'THEME',
	completed: [ 'WIZARD' ],
	status: STATUS.IDLE,
	actionToInstall: null,
	error: {},
	themeStatus: 'install',
	contentStatus: 'install',
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
