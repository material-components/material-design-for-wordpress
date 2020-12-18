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
