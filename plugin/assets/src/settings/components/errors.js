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
import { useContext } from '@wordpress/element';

/**
 * Internal dependencies
 */
import SettingsContext from '../context';

const Errors = () => {
	const { state } = useContext( SettingsContext );

	return Object.keys( state.errors ).map( key => (
		<div
			key={ key }
			className="material-settings__message material-settings__message--error"
		>
			<i
				className="material-icons mdc-button__icon leading-icon"
				aria-hidden="true"
			>
				error
			</i>
			<span className="material-settings__message-text">
				{ state.errors[ key ] }
			</span>
		</div>
	) );
};

export default Errors;
