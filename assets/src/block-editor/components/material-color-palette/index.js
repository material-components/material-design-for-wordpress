/**
 * External dependencies
 */
import { map } from 'lodash';

/**
 * WordPress dependencies.
 */
import {
	BaseControl,
	ColorIndicator,
	ColorPicker,
} from '@wordpress/components';
import CircularOptionPicker from '../circular-option-picker';
import { Fragment, useCallback, useMemo } from '@wordpress/element';
import { __, sprintf } from '@wordpress/i18n';

/**
 * Internal dependencies.
 */
import MATERIAL_COLORS from '../../../common/material-colors';
import './style.css';

const ColorPickerOption = ( { color, value, name, clearColor, onChange } ) => {
	return (
		<CircularOptionPicker.Option
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
		/>
	);
};

/**
 * Determine if the index is at end of color range.
 *
 * @param {number} i Index of the color
 */
const isEndOfColor = i => {
	// Each color has 14 shades, except the last 3 which only have 10 shades
	// After index 233 just check for 233 and 243 for color endings.
	return ( i < 233 && 0 === ( i + 1 ) % 14 ) || [ 233, 243 ].includes( i );
};

export default function MaterialColorPalette( {
	clearable = true,
	className,
	disableCustomColors = false,
	materialColorsOnly = false,
	onChange,
	value,
	label,
} ) {
	const colors = [
		{
			color: '#6200ee',
			name: __( 'Primary', 'material-theme-builder' ),
		},
		{
			color: '#018786',
			name: __( 'Secondary', 'material-theme-builder' ),
		},
	];

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
	}, [ value, onChange, clearColor ] );

	// Generate material color palette.
	const materialColorOptions = useCallback( () => {
		return map( MATERIAL_COLORS, ( { color, name }, i ) => (
			<Fragment key={ color }>
				<ColorPickerOption
					color={ color }
					value={ value }
					name={ name }
					clearColor={ clearColor }
					onChange={ onChange }
				/>
				{ isEndOfColor( i ) && <br /> }
			</Fragment>
		) );
	}, [ value, onChange, clearColor ] );

	const renderCustomColorPicker = useCallback(
		() => (
			<ColorPicker
				color={ value }
				onChangeComplete={ color => onChange( color.hex ) }
				disableAlpha
			/>
		),
		[ value ]
	);

	if ( materialColorsOnly ) {
		return (
			<div className="components-material-color-palette__picker">
				{ materialColorOptions() }
			</div>
		);
	}

	return (
		<BaseControl className="material-component-color-palette">
			<BaseControl.VisualLabel>
				<span className="material-component-color-palette__label">
					{ label }
				</span>
				<ColorIndicator colorValue={ value } aria-label={ label } />
			</BaseControl.VisualLabel>

			<div className="material-colors-wrap">
				<CircularOptionPicker
					className={ className }
					options={ colorOptions }
					actions={
						<>
							{ ! disableCustomColors && (
								<>
									<CircularOptionPicker.DropdownLinkAction
										className="components-material-color-palette__link"
										dropdownProps={ {
											renderContent: materialColorOptions,
											contentClassName:
												'components-material-color-palette__picker',
										} }
										buttonProps={ {
											'aria-label': __(
												'Color palette',
												'material-theme-builder'
											),
										} }
										linkText={ __( 'Color palette', 'material-theme-builder' ) }
									/>
									<CircularOptionPicker.DropdownLinkAction
										dropdownProps={ {
											renderContent: renderCustomColorPicker,
											contentClassName: 'components-color-palette__picker',
										} }
										buttonProps={ {
											'aria-label': __(
												'Custom color picker',
												'material-theme-builder'
											),
										} }
										linkText={ __( 'Custom Color', 'material-theme-builder' ) }
									/>
								</>
							) }
							{ !! clearable && (
								<CircularOptionPicker.ButtonAction onClick={ clearColor }>
									{ __( 'Clear', 'material-theme-builder' ) }
								</CircularOptionPicker.ButtonAction>
							) }
						</>
					}
				/>
			</div>
		</BaseControl>
	);
}
