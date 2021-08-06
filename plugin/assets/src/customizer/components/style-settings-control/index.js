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
import { __ } from '@wordpress/i18n';
import { ToggleControl } from '@wordpress/components';
import { useState } from '@wordpress/element';

/**
 * Internal dependencies
 */
import './style.css';
import SettingsGroup from './SettingsGroup';

const CHOICES = {
	AUTO: 'auto',
	ACTIVE: 'active',
	INACTIVE: 'inactive',
};

const StyleSettingsControl = ( { currentValue, selectedStyle } ) => {
	const { dark, contrast, switcher } = currentValue[ selectedStyle ];
	const [ displaySwitcher, setDisplaySwitcher ] = useState( switcher );

	const onChange = ( value, setting ) => {
		const newValue = {};
		newValue[ setting ] = value;

		console.log( 'New value', {
			...currentValue[ selectedStyle ],
			...newValue,
		} );
	};

	return (
		<>
			<SettingsGroup
				title={ __( 'Dark mode', 'material-design' ) }
				icon="brightness_4"
				choices={ Object.values( CHOICES ) }
				defaultChecked={ dark }
				onChange={ value => onChange( value, 'dark' ) }
			/>

			<SettingsGroup
				title={ __( 'High Contrast', 'material-design' ) }
				icon="brightness_high"
				choices={ Object.values( CHOICES ) }
				defaultChecked={ contrast }
				onChange={ value => onChange( value, 'contrast' ) }
			/>

			<ToggleControl
				label={ __( 'Display Switcher', 'material-design' ) }
				help={ __( 'Shows mode switcher in the header', 'material-design' ) }
				checked={ displaySwitcher }
				onChange={ () => {
					setDisplaySwitcher( state => ! state );
				} }
			/>
		</>
	);
};

export default StyleSettingsControl;
