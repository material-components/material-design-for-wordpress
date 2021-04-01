/**
 * WordPress dependencies
 */
import { useReducer, createContext } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { STATUS } from '../wizard/constants';
import { UPDATERS } from './constants';
import { reducer } from './reducer';
import getConfig from '../admin/get-config';

/**
 * Setups context to be used across the app
 */
const SettingsContext = createContext();

const { Provider } = SettingsContext;

const initialState = {
	status: STATUS.IDLE,
	apiStatus: getConfig( 'apiStatus' ),
	updates: {},
	availableUpdates: Object.keys( UPDATERS ),
	updaters: UPDATERS,
	error: {},
};

initialState.updates[ UPDATERS.FONTS.type ] = true;
initialState.updates[ UPDATERS.ICONS.type ] = false;

/**
 * Creates a wrapper in order to use our custom reducer
 *
 * @param {*} param Children to render
 */
export const SettingsProvider = ( { children } ) => {
	const [ state, dispatch ] = useReducer( reducer, initialState );

	return <Provider value={ { state, dispatch } }>{ children }</Provider>;
};

export default SettingsContext;
