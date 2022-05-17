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
import { TextControl, ColorPicker } from '@wordpress/components';
import { useState, useEffect } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

/**
 * External dependencies
 */
import classNames from 'classnames';
import {
	argbFromHex,
	themeFromSourceColor,
	applyTheme,
} from '@material/material-color-utilities';

/**
 * Internal dependencies
 */
import './style.css';
import ColorA11y from './color-a11y';
import MaterialColorPalette from '../../../block-editor/components/material-color-palette';
import { COLOR_MODES } from '../../customize-preview';

const api = window.customize;

console.log( argbFromHex );

const ColorControl = ( {
	defaultValue,
	params,
	onColorChange,
	range,
	mode,
} ) => {
	const [ color, setColor ] = useState( defaultValue );
	const [ colorPallete, setColorPallete ] = useState( {} );
	const [ displayColorPalette, setDisplayColorPalette ] = useState( false );
	const [ materialPickerSelected, setMaterialPickerSelected ] = useState(
		true
	);
	const [ isLinked, setIsLinked ] = useState( false );
	const { label } = params;

	const onChange = value => {
		setColor( value );
		onColorChange( value );
	};

	const onBlur = event => {
		const { target } = event;

		if ( ! target ) {
			return;
		}

		onColorChange( target.value );
	};

	useEffect( () => {
		if ( 'dark' === mode && isLinked ) {
			setColor( range.dark.hex );
		} else if ( 'contrast' === mode && isLinked ) {
			setColor( range.light.hex );
		}
	}, [ mode, isLinked, range ] );

	useEffect( () => {
		if ( isLinked ) {
			onColorChange( color );
		}
	}, [ isLinked, color, onColorChange ] );

	useEffect( () => {
		if ( ! range ) {
			return;
		}

		if ( COLOR_MODES.dark === mode ) {
			setIsLinked( color === range.dark.hex );
		}
	}, [ color, mode, range ] );

	useEffect( () => {
		if ( color ) {
			const intColor = argbFromHex( color );
			setColorPallete( themeFromSourceColor( intColor ) );
		}

		if ( Object.keys( colorPallete ).length > 0 ) {
			applyTheme( colorPallete, { target: document.body, dark: false } );
		}
	}, [ color ] );

	return (
		<>
			<div className="material-design-color__label">{ label }</div>

			<div className="material-design-color__picker">
				{ /* eslint-disable-next-line jsx-a11y/no-redundant-roles */ }
				<button
					type="button"
					className="material-design-color__color"
					style={ { backgroundColor: color } }
					onClick={ () => {
						setDisplayColorPalette( ! displayColorPalette );
					} }
				></button>

				<TextControl
					value={ color }
					onChange={ onChange }
					onBlur={ onBlur }
					className="material-design-color__input"
				/>

				{ 'default' !== mode && (
					/* eslint-disable-next-line jsx-a11y/no-redundant-roles */
					<button
						className="material-design-color__link"
						type="button"
						onClick={ () => {
							setIsLinked( ! isLinked );
						} }
					>
						<span className="material-icons">
							{ isLinked && 'link_off' }
							{ ! isLinked && 'link' }
						</span>
					</button>
				) }
			</div>

			{ displayColorPalette && (
				<>
					<div className="material-design-color__picker-container">
						<div className="material-design-color__picker-tabs material-design-tabs">
							<button
								type="button"
								className={ classNames(
									'material-design-tab-link',
									{
										active: materialPickerSelected,
									}
								) }
								onClick={ () => {
									setMaterialPickerSelected( true );
								} }
							>
								{ __( 'Palette', 'material-design' ) }
							</button>

							<button
								type="button"
								className={ classNames(
									'material-design-tab-link',
									{
										active: ! materialPickerSelected,
									}
								) }
								onClick={ () => {
									setMaterialPickerSelected( false );
								} }
							>
								{ __( 'Custom', 'material-design' ) }
							</button>
						</div>

						<div className="material-design-color__picker-options">
							{ materialPickerSelected && (
								<MaterialColorPalette
									value={ color }
									onChange={ value => {
										onChange( value );
									} }
									materialColorsOnly={ true }
								/>
							) }

							{ ! materialPickerSelected && (
								<ColorPicker
									color={ color }
									onChangeComplete={ selectedColor => {
										onChange( selectedColor.hex );
										onColorChange( selectedColor.hex );
									} }
									disableAlpha
								/>
							) }
						</div>
					</div>

					<ColorA11y
						api={ api }
						params={ params }
						selectedColor={ color }
					/>
				</>
			) }
		</>
	);
};

export default ColorControl;
