/**
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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
	updaters: UPDATERS,
	errors: {},
};

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
