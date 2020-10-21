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

/* eslint-disable jsx-a11y/anchor-is-valid */

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';

/**
 * Internal dependencies
 */
import getConfig from '../../../block-editor/utils/get-config';

const ThemePrompt = ( { status } ) => {
	const [ dismissed, setDismissed ] = useState( status === 'ok' );
	const [ requesting, setRequesting ] = useState( false );

	const title = __( 'Material Design Theme', 'material-design' );

	const message =
		status === 'install'
			? __(
					'Install and activate the Material Design theme for full site customization.',
					'material-design'
			  )
			: __(
					'Activate the Material Design theme for full site customization.',
					'material-design'
			  );

	const cta =
		status === 'install'
			? __( 'Install', 'material-design' )
			: __( 'Activate', 'material-design' );

	const dismiss = () => {
		setDismissed( true );
		window.localStorage.setItem( 'themeInstallerDismissed', '1' );
	};

	if ( dismissed || status === 'ok' ) {
		return null;
	}

	const apiRequest = event => {
		event.preventDefault();

		setRequesting( true );
		const requestArgs = {
			path: `${ getConfig( 'restPath' ) }${ status }-theme`,
			method: 'POST',
			headers: {
				'X-WP-Nonce': getConfig( 'themeNonce' ),
			},
		};
		const onFail = error => {
			console.error( error );
			setRequesting( false );
		};

		apiFetch( requestArgs )
			.then( () => {
				if ( 'install' === status ) {
					requestArgs.path = `${ getConfig( 'restPath' ) }activate-theme`;

					apiFetch( requestArgs )
						.then( () => window.location.reload() )
						.catch( onFail );
				} else {
					window.location.reload();
				}
			} )
			.catch( onFail );
	};

	return (
		<>
			<button
				type="button"
				className="customize-help-toggle dashicons dashicons-dismiss"
				aria-expanded="false"
				onClick={ dismiss }
			>
				<span className="screen-reader-text">
					{ __( 'Dismiss', 'material-design' ) }
				</span>
			</button>
			<div className="accordion-section-title theme-installer-panel">
				<h3>{ title }</h3>
				<p className="customize-action">{ message }</p>
				<button
					className="button"
					onClick={ apiRequest }
					disabled={ requesting }
				>
					{ cta }
					{ requesting && <span className="spinner is-active"></span> }
				</button>
			</div>
			<ul className="accordion-sub-container control-panel-content"></ul>
		</>
	);
};

export default ThemePrompt;
