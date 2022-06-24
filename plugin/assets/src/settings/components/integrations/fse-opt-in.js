/*
 *
 *  Copyright 2022 Google LLC
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *        http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

/**
 * External dependencies
 */
import _uniqueId from 'lodash/uniqueId';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useState, useContext } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { ACTIONS } from '../../constants';
import SettingsContext from '../../context';
import Switch from './switch';
import { toggleFseOptIn } from '../../utils';

/**
 * @return {JSX.Element} JSX.
 */
const FseOptIn = () => {
	const [ id ] = useState( _uniqueId( 'updater-' ) );
	const { dispatch } = useContext( SettingsContext );
	const type = 'OPT_IN';
	const { state } = useContext( SettingsContext );

	const checked = state.updaters.OPT_IN.autoUpdates;

	const handleAutoUpdateToggle = async () => {
		dispatch( { type: ACTIONS.TOGGLE_UPDATES, payload: { type } } );

		await toggleFseOptIn( ! checked );
		window.location.reload();
	};

	return (
		<div className={ 'material-settings__updater no__last-update' }>
			<div className="mdc-layout-grid">
				<div className="mdc-layout-grid__inner">
					<div className="mdc-layout-grid__cell mdc-layout-grid__cell--span-10 mdc-layout-grid__cell--align-middle">
						<h3 className="mdc-typography--headline6">
							{ __(
								'Full Site Editing Opt In',
								'material-design'
							) }{ ' ' }
						</h3>

						<p className="mdc-typography--body1">
							{ __(
								'This setting won’t be available when Full Site Editing is out of Beta and fully supported by WordPress.',
								'material-design'
							) }
						</p>
					</div>
					<div className="mdc-layout-grid__cell mdc-layout-grid__cell--span-2 mdc-layout-grid__cell--align-middle material-settings__cell--justify-end">
						<Switch
							checked={ checked }
							onChange={ handleAutoUpdateToggle }
							id={ id }
							showLabel={ false }
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default FseOptIn;
