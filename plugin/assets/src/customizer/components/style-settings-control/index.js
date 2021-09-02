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

const api = wp.customize;

const StyleSettingsControl = ( { defaultValue, selectedStyle, setValue } ) => {
	const [ currentValue, setCurrentValue ] = useState(
		defaultValue[ selectedStyle ]
	);
	const { dark, switcher } = currentValue;
	const [ displaySwitcher, setDisplaySwitcher ] = useState( switcher );
	const [ isSwitcherDisabled, setIsSwitcherDisabled ] = useState( false );
	const isThemeActive = 'ok' === getConfig( 'themeStatus' );

	const onChange = useCallback( ( value, setting ) => {
		const newValue = {};
		newValue[ setting ] = value;

		setCurrentValue( {
			...currentValue,
			...newValue,
		} );
	}, [] );

	useEffect( () => {
		onChange( displaySwitcher, 'switcher' );
	}, [ displaySwitcher, onChange ] );

	useEffect( () => {
		setValue( currentValue );
		setIsSwitcherDisabled( false );

		if ( CHOICES.INACTIVE === currentValue.dark ) {
			api.previewer.send( 'materialDesignPaletteUpdate', 'light' );
			setDisplaySwitcher( false );
			setTimeout( () => setIsSwitcherDisabled( true ), 50 );
		}

		if ( CHOICES.ACTIVE === currentValue.dark ) {
			api.previewer.send( 'materialDesignPaletteUpdate', 'dark' );
		}
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
					help={ __( 'Shows mode switcher in the header', 'material-design' ) }
					checked={ displaySwitcher }
					onChange={ () => setDisplaySwitcher( state => ! state ) }
					disabled={ isSwitcherDisabled }
				/>
			) }
		</>
	);
};

export default StyleSettingsControl;
