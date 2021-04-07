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
 * External dependencies
 */
import apiFetch from '@wordpress/api-fetch';

/**
 * Internal dependencies
 */
import { UPDATERS } from './constants';
import getConfig from '../admin/get-config';

/**
 * Handles each kind of update
 *
 * @param {*} type Item to update
 */
export const update = type => {
	if ( type === UPDATERS.FONTS.type ) {
		return updateFonts();
	}

	if ( type === UPDATERS.ICONS.type ) {
		return updateIcons();
	}
};

/**
 * Update fonts.
 */
const updateFonts = () => {
	return new Promise( ( resolve, reject ) => {
		apiFetch( {
			path: getConfig( 'assetsRestPath' ) + 'retrieve-fonts/force',
			method: 'GET',
			headers: {
				'X-WP-Nonce': getConfig( 'nonce' ),
			},
		} )
			.then( resolve )
			.catch( reject );
	} );
};

/**
 * Update icons.
 */
const updateIcons = () => {
	return new Promise( ( resolve, reject ) => {
		apiFetch( {
			path: getConfig( 'assetsRestPath' ) + 'retrieve-icons/force',
			method: 'GET',
			headers: {
				'X-WP-Nonce': getConfig( 'nonce' ),
			},
		} )
			.then( resolve )
			.catch( reject );
	} );
};

/**
 * Save API Key in database
 *
 * @param {string} key API
 * @return {Promise} Request response
 */
export const setApiKey = key => {
	return new Promise( ( resolve, reject ) => {
		apiFetch( {
			path: getConfig( 'assetsRestPath' ) + 'register-api-key',
			method: 'POST',
			data: { key },
			headers: {
				'X-WP-Nonce': getConfig( 'nonce' ),
			},
		} )
			.then( resolve )
			.catch( reject );
	} );
};

/**
 * Turn auto updates on/off
 *
 * @param {string} type Item to toggle updates
 * @return {Promise} Request response
 */
export const toggleAutoUpdate = type => {
	return new Promise( ( resolve, reject ) => {
		apiFetch( {
			path: getConfig( 'assetsRestPath' ) + 'toggle-auto-updates',
			method: 'POST',
			data: { type },
			headers: {
				'X-WP-Nonce': getConfig( 'nonce' ),
			},
		} )
			.then( resolve )
			.catch( reject );
	} );
};
