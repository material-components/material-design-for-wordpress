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
import { useContext, useEffect, useState } from '@wordpress/element';

/**
 * WordPress dependencies
 */
import TabContext from '../../context';
import { __, sprintf } from '@wordpress/i18n';
import Button from '../../../wizard/components/navigation/button';
import apiFetch from '@wordpress/api-fetch';
import getConfig from '../../../admin/get-config';
import handleError from 'index';

export const Updates = ( text, domain ) => {
	const { state } = useContext( TabContext );
	const { activeTab } = state;

	function setRequesting( b ) {
		return b;
	}

	const onFail = error => {
		const notification = new wp.customize.Notification(
			'asset_update_failure',
			{
				message: 'Assets update failure.',
			}
		);
		setting.notifications.add( 'asset_update_failure', notification );

		setRequesting( false );
	};

	function updateFonts() {
		apiFetch( {
			path: getConfig( 'restPath' ) + 'retrieve-fonts',
			method: 'GET',
			headers: {
				'X-WP-Nonce': getConfig( 'nonce' ),
			},
		} ).catch( handleError );
	}

	function updateIcons() {
		apiFetch( {
			path: getConfig( 'restPath' ) + 'retrieve-icons',
			method: 'GET',
			headers: {
				'X-WP-Nonce': getConfig( 'nonce' ),
			},
		} ).catch( handleError );
	}

	return (
		<div className="material-gsm__content mdc-layout-grid__cell mdc-layout-grid__cell--span-9">
			<h2 className="material-gsm__content-title mdc-typography--headline3">
				{ __( 'Font and Icons Updates', 'material-design' ) }
			</h2>

			<p>
				{ __(
					'You must have a Google Fonts API Key and it must be defined',
					'material-design'
				) }
			</p>
			<p>
				{ sprintf(
					__(
						'This can be done by adding the following to your %s file: %s',
						'material-design'
					),
					'<pre>wp-config.php</pre>',
					"<pre>define( 'GOOGLE_FONTS_API_KEY', 'your_google_fonts_api_key' );</pre>"
				) }
			</p>

			<p className="material-gsm__content-actions material-gsm__content-options">
				<Button
					style="mdc-button-options mdc-button--raised"
					text={ __( 'Update Fonts', 'material-design' ) }
					onClick={ updateFonts }
				/>
			</p>

			<p className="material-gsm__content-actions material-gsm__content-options">
				<Button
					style="mdc-button-options mdc-button--raised"
					text={ __( 'Update Icons', 'material-design' ) }
					onClick={ updateIcons }
				/>
			</p>
		</div>
	);
};
