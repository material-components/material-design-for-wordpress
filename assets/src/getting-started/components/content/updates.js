/*jshint esversion: 6 */

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
import { useContext, useEffect } from '@wordpress/element';

/**
 * WordPress dependencies
 */
import TabContext from '../../context';
import { __ } from '@wordpress/i18n';
import Button from '../../../wizard/components/navigation/button';
import apiFetch from '@wordpress/api-fetch';
import getConfig from '../../../block-editor/utils/get-config';
import { useState } from 'react';

export const Updates = () => {
	const { state } = useContext( TabContext );
	const { activeTab } = state;

	function setRequesting( b ) {
		return b;
	}

	const onFail = error => {
		console.error( error );
		setRequesting( false );
	};

	function updateFonts() {
		apiFetch( {
			path: materialDesignWizard.fontsRestPath,
			method: 'GET',
			headers: {
				'X-WP-Nonce': materialDesignWizard.nonce,
			},
		} ).catch( onFail );
	}

	function updateIcons() {
		apiFetch( {
			path: materialDesignWizard.iconsRestPath,
			method: 'GET',
			headers: {
				'X-WP-Nonce': materialDesignWizard.nonce,
			},
		} ).catch( onFail );
	}

	return (
		<div className="material-gsm__content mdc-layout-grid__cell mdc-layout-grid__cell--span-9">
			<h2 className="material-gsm__content-title mdc-typography--headline3">
				{ __( 'Font and Icons Updates', 'material-design' ) }
			</h2>

			<p>
				{ __(
					'You must have a Google Fonts API Key and it must be defined in your wp-config.php',
					'material-design'
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
