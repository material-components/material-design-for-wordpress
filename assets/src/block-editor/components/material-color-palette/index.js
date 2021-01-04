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
 * External dependencies
 */
import { map, groupBy } from 'lodash';

/**
 * WordPress dependencies.
 */
import {
	BaseControl,
	ColorIndicator,
	ColorPicker,
	Popover,
	SlotFillProvider,
} from '@wordpress/components';
import CircularOptionPicker, {
	ButtonAction,
	DropdownLinkAction,
	Option,
} from '../circular-option-picker';
import { useCallback, useMemo } from '@wordpress/element';
import { __, sprintf } from '@wordpress/i18n';

/**
 * Internal dependencies.
 */
import MATERIAL_COLORS from '../../../common/material-colors';
import './style.css';

// Group material colors based on name.
const groupedColors = groupBy( MATERIAL_COLORS, color => {
	return color.name.replace( /\sA?[\d]+/, '' );
} );

const ColorPickerOption = ( { color, value, name, clearColor, onChange } ) => {
	return (
		<Option
			isSelected={ value === color }
			tooltipText={
				name ||
				// translators: %s: color hex code e.g: "#f00".
				sprintf( __( 'Color code: %s' ), color )
			}
			style={ { backgroundColor: color, color } }
			onClick={ value === color ? clearColor : () => onChange( color ) }
			aria-label={
				name
					? // translators: %s: The name of the color e.g: "vivid red".
					  sprintf( __( 'Color: %s' ), name )
					: // translators: %s: color hex code e.g: "#f00".
					  sprintf( __( 'Color code: %s' ), color )
			}
			position="top center"
		/>
	);
};

export default function MaterialColorPalette( {
	clearable = true,
	className,
	disableCustomColors = false,
	materialColorsOnly = false,
	onChange,
	value,
	label,
	colors,
} ) {
	if ( ! colors ) {
		colors = [
			{
				color: '#6200ee',
				name: __( 'Primary', 'material-design' ),
			},
			{
				color: '#018786',
				name: __( 'Secondary', 'material-design' ),
			},
		];
	}

	const clearColor = useCallback( () => onChange( undefined ), [ onChange ] );
	const colorOptions = useMemo( () => {
		return map( colors, ( { color, name } ) => (
			<ColorPickerOption
				key={ color }
				color={ color }
				value={ value }
				name={ name }
				clearColor={ clearColor }
				onChange={ onChange }
			/>
		) );
	}, [ colors, value, clearColor, onChange ] );

	// Generate material color palette.
	const MaterialColorOptions = useCallback( () => {
		return map( Object.keys( groupedColors ), group => {
			const shades = groupedColors[ group ];
			return (
				<div
					key={ group }
					className="components-circular-option-picker__option-wrapper__row"
				>
					{ map( shades, ( { color, name } ) => {
						return (
							<ColorPickerOption
								key={ color }
								color={ color }
								value={ value }
								name={ name }
								clearColor={ clearColor }
								onChange={ onChange }
							/>
						);
					} ) }
				</div>
			);
		} );
	}, [ value, onChange, clearColor ] );

	const materialColorOptions = () => <MaterialColorOptions />;

	const renderCustomColorPicker = useCallback(
		() => (
			<ColorPicker
				color={ value }
				onChangeComplete={ color => onChange( color.hex ) }
				disableAlpha
			/>
		),
		[ onChange, value ]
	);

	if ( materialColorsOnly ) {
		return (
			<SlotFillProvider>
				<div className="components-material-color-palette__picker">
					<MaterialColorOptions />
					<Popover.Slot />
				</div>
			</SlotFillProvider>
		);
	}

	const VisualLabel = BaseControl.VisualLabel || 'label';

	return (
		<BaseControl className="material-component-color-palette">
			<VisualLabel>
				<span className="material-component-color-palette__label">
					{ label }
				</span>
				<ColorIndicator colorValue={ value } aria-label={ label } />
			</VisualLabel>

			<div className="material-colors-wrap">
				<CircularOptionPicker
					className={ className }
					options={ colorOptions }
					actions={
						<>
							{ ! disableCustomColors && (
								<>
									<DropdownLinkAction
										className="components-material-color-palette__link"
										dropdownProps={ {
											renderContent: materialColorOptions,
											contentClassName:
												'components-material-color-palette__picker',
										} }
										buttonProps={ {
											'aria-label': __( 'Color palette', 'material-design' ),
										} }
										linkText={ __( 'Color palette', 'material-design' ) }
									/>
									<DropdownLinkAction
										dropdownProps={ {
											renderContent: renderCustomColorPicker,
											contentClassName: 'components-color-palette__picker',
										} }
										buttonProps={ {
											'aria-label': __(
												'Custom color picker',
												'material-design'
											),
										} }
										linkText={ __( 'Custom Color', 'material-design' ) }
									/>
								</>
							) }
							{ !! clearable && (
								<ButtonAction onClick={ clearColor }>
									{ __( 'Reset', 'material-design' ) }
								</ButtonAction>
							) }
						</>
					}
				/>
			</div>
		</BaseControl>
	);
}
