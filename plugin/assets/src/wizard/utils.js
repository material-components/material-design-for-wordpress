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
import apiFetch from '@wordpress/api-fetch';

/**
 * Internal dependencies
 */
import getConfig from '../admin/get-config';

/**
 * Functions that don't change the state of the world
 */

/**
 * Install theme if necessary
 * Activate theme
 *
 */
export const handleThemeActivation = () => {
	const action = getConfig( 'themeStatus' );
	if ( 'ok' === action ) {
		return new Promise( resolve => {
			return resolve( 'ok' );
		} );
	}

	return new Promise( ( resolve, reject ) => {
		apiFetch( {
			path: `${ getConfig( 'restPath' ) }${ action }-theme`,
			method: 'POST',
			headers: {
				'X-WP-Nonce': getConfig( 'nonce' ),
			},
		} )
			.then( data => {
				if ( data.code ) {
					return reject( data );
				}

				if ( 'install' === action ) {
					apiFetch( {
						path: `${ getConfig( 'restPath' ) }activate-theme`,
						method: 'POST',
						headers: {
							'X-WP-Nonce': getConfig( 'nonce' ),
						},
					} )
						.then( resolve )
						.catch( error => reject( error ) );
				} else {
					resolve( data );
				}
			} )
			.catch( error => reject( error ) );
	} );
};

/**
 * Import demo content
 *
 */
export const handleDemoImporter = () => {
	return new Promise( ( resolve, reject ) => {
		apiFetch( {
			path: `${ getConfig( 'restPath' ) }install-content`,
			method: 'POST',
			headers: {
				'X-WP-Nonce': getConfig( 'nonce' ),
			},
		} )
			.then( response => {
				if ( response.code ) {
					reject( response );
				} else {
					resolve( response );
				}
			} )
			.catch( error => reject( error ) );
	} );
};
