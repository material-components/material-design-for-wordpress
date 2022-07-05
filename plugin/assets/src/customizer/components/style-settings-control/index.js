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
import { useState, useEffect, useCallback } from '@wordpress/element';

/**
 * Internal dependencies
 */
import './style.css';
import SettingsGroup from './SettingsGroup';
import getConfig from '../../../block-editor/utils/get-config';

const CHOICES = {
	AUTO: 'auto',
	ACTIVE: 'active',
	INACTIVE: 'inactive',
};

const api = window.wp.customize;
const localStorageDarkMode = window.localStorage.getItem(
	'materialDesignDarkMode'
);

const StyleSettingsControl = ( { defaultValue, setValue } ) => {
	const [ currentValue, setCurrentValue ] = useState( defaultValue );
	const { dark, switcher } = currentValue;
	const [ isSwitcherDisabled, setIsSwitcherDisabled ] = useState(
		'inactive' === defaultValue.dark
	);
	const isThemeActive = 'ok' === getConfig( 'themeStatus' );

	const onChange = useCallback(
		( value, setting ) => {
			const newValue = {};
			newValue[ setting ] = value;

			if ( localStorageDarkMode ) {
				window.localStorage.removeItem( 'materialDesignDarkMode' );
			}

			if ( CHOICES.INACTIVE === newValue.dark ) {
				api.previewer.send( 'materialDesignPaletteUpdate', 'light' );
				newValue.switcher = false;
				setTimeout( () => {
					setIsSwitcherDisabled( true );
				}, 50 );
			}

			if ( CHOICES.ACTIVE === newValue.dark ) {
				api.previewer.send( 'materialDesignPaletteUpdate', 'dark' );
				newValue.switcher = true;
			}

			if ( CHOICES.AUTO === newValue.dark ) {
				newValue.switcher = true;
			}

			setIsSwitcherDisabled( false );

			setCurrentValue( {
				...currentValue,
				...newValue,
			} );
		},
		[ currentValue ]
	);

	useEffect( () => {
		setValue( currentValue );
	}, [ currentValue, setValue ] );

	return (
		<>
			<SettingsGroup
				title={ __( 'Dark mode', 'material-design' ) }
				icon="brightness_4"
				choices={ Object.values( CHOICES ) }
				defaultChecked={ dark }
				onChange={ value => onChange( value, 'dark' ) }
			/>

			{ isThemeActive && (
				<ToggleControl
					label={ __( 'Display Switcher', 'material-design' ) }
					help={ __(
						'Shows mode switcher in the header',
						'material-design'
					) }
					checked={ switcher }
					disabled={ isSwitcherDisabled }
					onChange={ value => {
						onChange( value, 'switcher' );
					} }
				/>
			) }
		</>
	);
};

export default StyleSettingsControl;
