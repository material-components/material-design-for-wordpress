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
import getConfig from '../../admin/get-config';

/**
 * Update fonts.
 */
export const updateFonts = () => {
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
export const updateIcons = () => {
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

export const isCoreUpdate = type => [ 'PLUGIN', 'THEME' ].includes( type );

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
 * @param {string}  type          Item to toggle updates
 * @param {boolean} currentStatus Current status of the toggle.
 * @return {Promise} Request response
 */
export const toggleAutoUpdate = ( type, currentStatus ) => {
	return new Promise( ( resolve, reject ) => {
		if ( isCoreUpdate( type ) ) {
			// eslint-disable-next-line no-undef
			const body = new FormData();
			body.append( 'action', 'toggle-auto-updates' );
			body.append( '_ajax_nonce', getConfig( 'autoUpdateNonce' ) );
			body.append( 'state', currentStatus ? 'disable' : 'enable' );
			body.append( 'type', type.toLowerCase() );
			body.append(
				'asset',
				getConfig( `${ type.toLowerCase() }AssetName` )
			);

			apiFetch( {
				url: getConfig( 'autoUpdateUrl' ),
				method: 'POST',
				body,
			} )
				.then( resolve )
				.catch( reject );

			return;
		}

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
