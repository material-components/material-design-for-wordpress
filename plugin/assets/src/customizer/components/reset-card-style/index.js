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
 * WordPress Dependencies.
 */
import apiFetch from '@wordpress/api-fetch';
import getConfig from '../../../block-editor/utils/get-config';

let loader = null;

/**
 * Handle click event.
 *
 * @param {Event} event
 */
const handleClick = event => {
	const source = event.target;
	source.disabled = true;
	loader = document.createElement( 'span' );
	loader.classList.add( 'spinner', 'is-active' );
	source.parentNode.appendChild( loader );
	apiRequest();
};

/**
 * Set loading.
 *
 * @param {boolean} flag
 */
const setLoading = flag => {
	if ( flag ) {
		loader.classList.add( 'is-active' );
	} else {
		loader.classList.remove( 'is-active' );
	}
};

/**
 * Add click event handle on reset button.
 */
const handleGlobalStyleResetButtonClick = () => {
	const api = window.wp.customize;
	api.control( 'material_design[card_reset]', function( control ) {
		control.container
			.find( '.material-global-style-reset' )
			.on( 'click', function( event ) {
				handleClick( event );
			} );
	} );
};

/**
 * API request to reset global style attributes.
 */
const apiRequest = () => {
	const requestArgs = {
		path: `${ getConfig( 'resetCardStyleRest' ) }`,
		method: 'POST',
		headers: {
			'X-WP-Nonce': getConfig( 'nonce' ),
		},
	};
	const onFail = error => {
		console.error( error );
		setLoading( false );
	};

	apiFetch( requestArgs )
		.then( data => {
			if ( ! data?.pending ) {
				setLoading( false );
			} else {
				// Recursive call to check if the request is still pending.
				apiRequest();
			}
		} )
		.catch( onFail );
};

export default handleGlobalStyleResetButtonClick;
