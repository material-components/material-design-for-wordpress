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

/* global jQuery */

/**
 * Internal dependencies
 */
import getConfig from '../block-editor/utils/get-config';

const $ = jQuery;
const api = wp.customize;
let notificationCount = false;

/**
 * Show or hide the material components notification.
 *
 * @param {Function} loadMaterialLibrary
 */
export const showHideNotification = ( loadMaterialLibrary = null ) => {
	const code = 'material_design_components';
	const materialLibrary = $( '#mcb-material-library-preview' );

	if (
		false !== notificationCount &&
		2 > notificationCount &&
		! materialLibrary.is( ':visible' ) &&
		api.panel( getConfig( 'slug' ) ).expanded()
	) {
		api.notifications.add(
			new api.Notification( code, {
				message: getConfig( 'l10n' ).componentsNotice,
				type: 'warning',
				dismissible: true,
				render() {
					const li = api.Notification.prototype.render.call( this ),
						link = li.find( 'a' );

					link.on( 'click', event => {
						event.preventDefault();
						if ( 'function' === typeof loadMaterialLibrary ) {
							loadMaterialLibrary.call();
						}

						api.notifications.remove( code );
					} );

					// Handle dismissal of notice.
					li.find( '.notice-dismiss' ).on( 'click', () => {
						const request = wp.ajax.post(
							'material_design_notification_dismiss',
							{
								nonce: getConfig( 'notifyNonce' ),
							}
						);

						request.done( response => {
							if ( response && response.count ) {
								notificationCount = response.count;
							}
						} );
					} );

					return li;
				},
			} )
		);
	} else {
		api.notifications.remove( code );
	}
};

/**
 * Init notifications by binding to events.
 */
export const init = () => {
	// Bind for previewer events.
	api.previewer.bind( 'materialDesign', settings => {
		notificationCount = settings.notificationCount;
		showHideNotification();
	} );

	api.panel( getConfig( 'slug' ) ).expanded.bind( expanded => {
		if ( ! expanded ) {
			const code = 'material_design_components';
			api.notifications.remove( code );
		}
	} );
};
