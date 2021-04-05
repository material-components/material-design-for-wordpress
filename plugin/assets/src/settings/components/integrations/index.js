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
import uniqueId from 'lodash/uniqueId';

/**
 * WordPress dependencies
 */
import { __, sprintf } from '@wordpress/i18n';
import { useContext } from '@wordpress/element';

/**
 * Internal dependencies
 */
import SettingsContext from '../../context';
import { UPDATERS } from '../../constants';
import Updater from './updater';
import Api from './api';

const Integrations = () => {
	const { state } = useContext( SettingsContext );

	return (
		<div className="material-settings__integrations">
			<h2 className="mdc-typography--headline6">
				{ __( 'Integrations', 'material-design' ) }
			</h2>

			<p
				className="mdc-typography--body1"
				dangerouslySetInnerHTML={ {
					__html: sprintf(
						__(
							'Integrate %s and %s to get the most out of the Material Theme.',
							'material-design'
						),
						`<a href="https://fonts.google.com/">${ __(
							'Google Fonts',
							'material-design'
						) }</a>`,
						`<a href="https://material.io/resources/icons/?style=baseline">${ __(
							'Material icons',
							'material-design'
						) }</a>`
					),
				} }
			></p>

			<p className="mdc-typography--body1">
				{ __(
					'Turn on auto-updater or update your resources manually.',
					'material-design'
				) }
			</p>

			<div className="material-settings__updates">
				{ Object.keys( UPDATERS ).map( key => (
					<Updater
						key={ uniqueId( 'updater-' ) }
						title={ UPDATERS[ key ].title }
						needsKey={ UPDATERS[ key ].needsKey }
						checked={ state.updaters[ key ].autoUpdates }
						lastUpdated={ state.updaters[ key ].lastUpdated }
						type={ UPDATERS[ key ].type }
					/>
				) ) }
			</div>

			<h2 className="mdc-typography--headline6">
				{ __( 'Google API Key', 'material-design' ) }
			</h2>

			<p
				className="mdc-typography--body1"
				dangerouslySetInnerHTML={ {
					__html: sprintf(
						__(
							'To use Google Fonts in Material Theme, please activate your %s and enable updates',
							'material-design'
						),
						`<a href="https://developers.google.com/fonts/docs/developer_api#APIKey">${ __(
							'Google API Key',
							'material-design'
						) }</a>`
					),
				} }
			></p>

			<Api />
		</div>
	);
};

export default Integrations;
