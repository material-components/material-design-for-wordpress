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
import { TextControl } from '@wordpress/components';
import { useState } from '@wordpress/element';

/**
 * Internal dependencies
 */
import './style.css';
import ColorA11y from './color-a11y';
import MaterialColorPalette from '../../../block-editor/components/material-color-palette';

const ColorControl = ( { defaultValue, params, api } ) => {
	const [ color, setColor ] = useState( defaultValue );
	const [ displayColorPalette, setDisplayColorPalette ] = useState( false );
	const { label } = params;

	return (
		<>
			<div className="material-design-color__label">{ label }</div>

			<div className="material-design-color__picker">
				{ /* eslint-disable-next-line jsx-a11y/no-redundant-roles */ }
				<button
					role="button"
					className="material-design-color__color"
					style={ { backgroundColor: color } }
					onClick={ () => setDisplayColorPalette( ! displayColorPalette ) }
				></button>
				<TextControl
					value={ color }
					onChange={ value => setColor( value ) }
					className="material-design-color__input"
				/>
			</div>

			{ displayColorPalette && (
				<>
					<MaterialColorPalette
						value={ color }
						onChange={ value => setColor( value ) }
						materialColorsOnly={ true }
					/>

					<ColorA11y api={ api } params={ params } selectedColor={ color } />
				</>
			) }
		</>
	);
};

export default ColorControl;
