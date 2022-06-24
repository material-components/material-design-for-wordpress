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
import { useContext, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import apiFetch from '@wordpress/api-fetch';

/**
 * Internal dependencies
 */
import TabContext from '../../context';
import Button from '../../../wizard/components/navigation/button';
import getConfig from '../../../admin/get-config';
import { ACTIONS } from '../../constants';

export const Updates = () => {
	const { dispatch } = useContext( TabContext );

	// Track update request status.
	const [ isUpdatingFonts, setIsUpdatingFonts ] = useState( false );
	const [ isUpdatingIcons, setIsUpdatingIcons ] = useState( false );

	/**
	 * Display error when found
	 *
	 * @param {Object} errorObject WP_Error
	 */
	const handleError = errorObject => {
		setIsUpdatingFonts( false );
		setIsUpdatingIcons( false );

		dispatch( { type: ACTIONS.ERROR, payload: errorObject } );
	};

	function updateFonts() {
		setIsUpdatingFonts( true );
		apiFetch( {
			path: getConfig( 'assetsRestPath' ) + 'retrieve-fonts/force',
			method: 'GET',
			headers: {
				'X-WP-Nonce': getConfig( 'nonce' ),
			},
		} )
			.then( () => setIsUpdatingFonts( false ) )
			.catch( handleError );
	}

	function updateIcons() {
		setIsUpdatingIcons( true );
		apiFetch( {
			path: getConfig( 'assetsRestPath' ) + 'retrieve-icons/force',
			method: 'GET',
			headers: {
				'X-WP-Nonce': getConfig( 'nonce' ),
			},
		} )
			.then( () => setIsUpdatingIcons( false ) )
			.catch( handleError );
	}

	return (
		<div className="material-gsm__content mdc-layout-grid__cell mdc-layout-grid__cell--span-9">
			<h2 className="material-gsm__content-title headline-medium">
				{ __( 'Font and Icons Updates', 'material-design' ) }
			</h2>

			<p className="material-gsm__content-actions material-gsm__content-options">
				<Button
					style="mdc-button-options mdc-button--raised"
					text={ __( 'Update Fonts', 'material-design' ) }
					onClick={ updateFonts }
					loading={ isUpdatingFonts }
				/>
			</p>

			<p className="material-gsm__content-actions material-gsm__content-options">
				<Button
					style="mdc-button-options mdc-button--raised"
					text={ __( 'Update Icons', 'material-design' ) }
					onClick={ updateIcons }
					loading={ isUpdatingIcons }
				/>
			</p>
		</div>
	);
};
