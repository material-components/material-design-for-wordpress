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
import { TextControl, ColorPicker, Button } from '@wordpress/components';
import { useState, useEffect } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

/**
 * External dependencies
 */
import classNames from 'classnames';

/**
 * Internal dependencies
 */
import './style.css';
import ColorA11y from './color-a11y';
import MaterialColorPalette from '../../../block-editor/components/material-color-palette';
import { randomColor } from '../../utils';

const api = window.wp.customize;

const ColorControl = ( { defaultValue, params, onColorChange, mode } ) => {
	const [ color, setColor ] = useState( defaultValue );
	/* @var {Theme} color The current color value. */
	const [ displayColorPalette, setDisplayColorPalette ] = useState( false );
	const [ materialPickerSelected, setMaterialPickerSelected ] = useState(
		true
	);
	const [ isLinked, setIsLinked ] = useState( false );
	const { label } = params;

	const isDarkMode = window.matchMedia( '(prefers-color-scheme: dark)' )
		.matches;

	const onChange = value => {
		setColor( value );
	};

	const onBlur = event => {
		const { target } = event;

		if ( ! target ) {
			return;
		}

		setColor( target.value );
		onColorChange( target.value );
	};

	const onShuffle = () => {
		const shuffledColor = randomColor();

		if ( shuffledColor ) {
			setColor( shuffledColor );
		}
	};

	useEffect( () => {
		if ( ! color ) {
			return;
		}

		let hexColor = color.substring( 1 );

		if ( hexColor.length === 3 ) {
			hexColor = hexColor
				.split( '' )
				.map( hex => hex + hex )
				.join( '' );
		}

		if ( 6 !== hexColor.length ) {
			return;
		}

		onColorChange( `#${ hexColor }` );
		api.previewer.send( 'materialDesignM3PaletteUpdate', {
			color,
			isDarkMode,
		} );
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

				<Button
					className="material-design-color__shuffle"
					variant="tertiary"
					icon="randomize"
					onClick={ onShuffle }
				/>
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
										onChange( value ?? defaultValue );
									} }
									materialColorsOnly={ true }
								/>
							) }

							{ ! materialPickerSelected && (
								<ColorPicker
									color={ color }
									onChangeComplete={ selectedColor => {
										onChange( selectedColor.hex );
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
