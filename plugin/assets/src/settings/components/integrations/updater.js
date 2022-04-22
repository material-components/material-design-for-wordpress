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
import classNames from 'classnames';
import _uniqueId from 'lodash/uniqueId';

/**
 * WordPress dependencies
 */
import { __, sprintf } from '@wordpress/i18n';
import { useState, useContext } from '@wordpress/element';
import { dateI18n } from '@wordpress/date';

/**
 * Internal dependencies
 */
import { ACTIONS } from '../../constants';
import SettingsContext from '../../context';
import Switch from './switch';
import Button from '../../../wizard/components/navigation/button';
import { update, toggleAutoUpdate } from '../../utils';

/**
 * @param {Object}  props
 * @param {string}  props.title
 * @param {string}  props.lastUpdated
 * @param {string}  props.needsKey
 * @param {boolean} props.checked
 * @param {string}  props.type
 * @param {boolean} props.displayUpdatedOn
 * @param {string}  props.versionAvailable
 * @param {string}  props.apiStatus
 * @param {boolean} props.updateAvailable
 *
 * @return {JSX.Element} JSX.
 */
const Updater = ( {
	title,
	lastUpdated,
	needsKey,
	checked,
	type,
	displayUpdatedOn,
	versionAvailable,
	apiStatus,
	updateAvailable,
} ) => {
	const [ id ] = useState( _uniqueId( 'updater-' ) );
	const { dispatch } = useContext( SettingsContext );
	const isDisabled = needsKey && 'ok' !== apiStatus;
	const updatedDate = lastUpdated
		? dateI18n( 'M j, Y, h:i A', lastUpdated )
		: __( 'never', 'material-design' );
	const [ isUpdating, setIsUpdating ] = useState( false );
	const shouldUpdate = ! isDisabled && updateAvailable;
	const shouldNotUpdate = ! isDisabled && ! updateAvailable;

	const handleUpdate = response => {
		setIsUpdating( true );
		if ( ! type ) {
			return;
		}

		update( type )
			.then( () => {
				setIsUpdating( false );
				dispatch( {
					type: ACTIONS.SET_UPDATED,
					payload: {
						type,
						lastUpdated: response.lastUpdated,
					},
				} );
			} )
			.catch( error => {
				dispatch( {
					type: ACTIONS.ADD_ERROR,
					payload: {
						id: 'api_error',
						error: error.message,
					},
				} );
				console.error( error );
				setIsUpdating( false );
			} );
	};

	const handleAutoUpdateToggle = () => {
		dispatch( { type: ACTIONS.TOGGLE_UPDATES, payload: { type } } );
		toggleAutoUpdate( type, checked );
	};

	return (
		<div
			className={ classNames( 'material-settings__updater', {
				'no__last-update':
					false === displayUpdatedOn && ! versionAvailable,
			} ) }
		>
			<div className="mdc-layout-grid">
				<div className="mdc-layout-grid__inner">
					<div className="mdc-layout-grid__cell mdc-layout-grid__cell--span-7 mdc-layout-grid__cell--align-middle">
						<h3 className="title-large">{ title }</h3>

						{ isDisabled && (
							<p
								className="body-large"
								dangerouslySetInnerHTML={ {
									__html: sprintf(
										// translators: %s: google api link with message.
										__(
											'To enable Google Fonts updates please %s first',
											'material-design'
										),
										`<a href="https://developers.google.com/fonts/docs/developer_api#APIKey" target="_blank" rel="noopener noreferrer">${ __(
											'activate Google API Key',
											'material-design'
										) }</a>`
									),
								} }
							></p>
						) }

						{ ! isDisabled && false !== displayUpdatedOn && (
							<p className="body-large">
								{ sprintf(
									// translators: %s: last updated date.
									__(
										'Last update on %s',
										'material-design'
									),
									updatedDate
								) }
							</p>
						) }

						{ versionAvailable && (
							<p className="body-large">
								{ sprintf(
									// translators: %s: version number.
									__(
										'New version %s is available.',
										'material-design'
									),
									versionAvailable
								) }
							</p>
						) }
					</div>

					<div className="mdc-layout-grid__cell mdc-layout-grid__cell--span-3 mdc-layout-grid__cell--align-middle material-settings__cell--justify-end">
						{ ! isDisabled && (
							<Switch
								checked={ checked }
								onChange={ handleAutoUpdateToggle }
								id={ id }
							/>
						) }
					</div>

					<div className="mdc-layout-grid__cell mdc-layout-grid__cell--span-2 mdc-layout-grid__cell--align-middle material-settings__cell--justify-end">
						{ isDisabled && (
							<div className="material-settings__message material-settings__message--error">
								<i
									className="material-icons mdc-button__icon leading-icon"
									aria-hidden="true"
								>
									error
								</i>
								<span className="material-settings__message-text">
									{ __(
										'Updates disabled',
										'material-design'
									) }
								</span>
							</div>
						) }

						{ shouldUpdate && (
							<Button
								style="mdc-button--raised"
								text={ __( 'Update', 'material-design' ) }
								leadingIcon="cached"
								onClick={ handleUpdate }
								loading={ isUpdating }
							/>
						) }

						{ shouldNotUpdate && (
							<Button
								style="mdc-button--raised"
								leadingIcon="done"
								disabled={ true }
								text={ __( 'Updated', 'material-design' ) }
							/>
						) }
					</div>
				</div>
			</div>
		</div>
	);
};

export default Updater;
