/**
 * Copyright 2020 Google LLC
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
	activeTab: 'CUSTOMIZE',
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
