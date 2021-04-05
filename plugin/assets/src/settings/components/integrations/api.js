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
 * WordPress dependencies
 */
import { useState, useContext } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { TextControl } from '@wordpress/components';

/**
 * Internal dependencies
 */
import SettingsContext from '../../context';
import { ACTIONS, KEY_PLACEHOLDER } from '../../constants';
import Button from '../../../wizard/components/navigation/button';
import { setApiKey } from '../../utils';

const Api = () => {
	const { state, dispatch } = useContext( SettingsContext );
	const [ api, setApi ] = useState( null );
	const [ isLoading, setIsLoading ] = useState( false );
	const isApiOk = 'ok' === state.apiStatus;

	const dispatchError = error =>
		dispatch( {
			type: ACTIONS.ADD_ERROR,
			payload: { id: 'api_error', error },
		} );

	const removeApiKey = () => {
		setIsLoading( true );
		setApi( '' );

		setApiKey( api )
			.then( () => {
				setIsLoading( false );
				dispatch( { type: ACTIONS.REMOVE_API_KEY } );
			} )
			.catch( error => {
				dispatchError( error.message );
				console.error( error );
				setIsLoading( false );
			} );
	};

	const activateApiKey = () => {
		setIsLoading( true );

		setApiKey( api )
			.then( response => {
				setIsLoading( false );
				dispatch( {
					type: ACTIONS.ADD_API_KEY,
					payload: {
						lastUpdated: response.lastUpdated,
					},
				} );
				setApi( '' );
			} )
			.catch( error => {
				dispatchError( error.message );
				console.error( error );
				setIsLoading( false );
			} );
	};

	const handleSubmit = event => {
		if ( event.key && 'Enter' === event.key ) {
			activateApiKey();
		}
	};

	return (
		<div className="material-settings__api mdc-layout-grid">
			<div className="mdc-layout-grid__inner">
				{ ! isApiOk && (
					<TextControl
						className="material-settings__api-input mdc-layout-grid__cell"
						value={ api }
						placeholder={ __( 'Google API Key', 'material-design' ) }
						onChange={ value => {
							setApi( value );
						} }
						onKeyPress={ handleSubmit }
					/>
				) }

				{ isApiOk && (
					<TextControl
						className="material-settings__api-input material-settings__api-input--disabled mdc-layout-grid__cell"
						value={ KEY_PLACEHOLDER }
						disabled
					/>
				) }

				<div className="mdc-layout-grid__cell">
					{ ! isApiOk && (
						<Button
							style="mdc-button--raised"
							text={ __( 'Activate', 'material-design' ) }
							onClick={ activateApiKey }
							disabled={ ! api }
							loading={ isLoading }
						/>
					) }

					{ isApiOk && (
						<Button
							text={ __( 'Remove', 'material-design' ) }
							leadingIcon="delete"
							onClick={ removeApiKey }
							loading={ isLoading }
						/>
					) }
				</div>
			</div>
		</div>
	);
};

export default Api;
