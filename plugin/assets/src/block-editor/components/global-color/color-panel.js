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

import {
	__experimentalColorGradientSettingsDropdown as ColorGradientDropdown, // eslint-disable-line @wordpress/no-unsafe-wp-apis
	ContrastChecker,
	useSetting,
} from '@wordpress/block-editor';
import {
	PanelBody,
	__experimentalSpacer as Spacer, // eslint-disable-line @wordpress/no-unsafe-wp-apis
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * @param {string} color Color input in 'var(--md-sys-color-on-primary)' format.
 *
 * @return {string} variable name example: '--md-sys-color-on-primary'.
 */
const getColorFromVarString = color => {
	if ( color && color.includes( 'var(' ) ) {
		const colorVar = color.split( '(' )[ 1 ].split( ')' )[ 0 ];
		const style = getComputedStyle( document.body );
		return style.getPropertyValue( colorVar );
	}

	return color;
};

const ColorPanel = ( { colors } ) => {
	const { text, container } = colors;
	const settings = [ text, container ];
	const colorSettings = useSetting( 'color.palette' );
	const colorPalette = [
		{
			name: __( 'Theme', 'material-design' ),
			colors: colorSettings,
		},
	];

	const colorText = text ? getColorFromVarString( text.colorValue ) : null;
	const containerText = container
		? getColorFromVarString( container.colorValue )
		: null;

	return (
		<PanelBody
			title={ __( 'Color', 'material-design' ) }
			initialOpen={ true }
		>
			<ColorGradientDropdown
				settings={ settings }
				colors={ colorPalette }
				__experimentalHasMultipleOrigins={ true } // Allow multiple color palettes.
			/>

			<Spacer marginY={ 4 } />

			{ colorText && containerText && (
				<ContrastChecker
					textColor={ colorText }
					backgroundColor={ containerText }
				/>
			) }
		</PanelBody>
	);
};

export default ColorPanel;
