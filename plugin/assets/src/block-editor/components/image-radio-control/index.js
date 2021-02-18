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
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { BaseControl } from '@wordpress/components';
import { withInstanceId } from '@wordpress/compose';

/**
 * Internal dependencies
 */
import './style.css';

const ImageRadioControl = withInstanceId(
	( {
		label,
		className,
		selected,
		help,
		onChange,
		options = [],
		instanceId,
	} ) => {
		const id = `image-radio-control-${ instanceId }`;
		const onChangeValue = event => onChange( event.target.value );

		return (
			options &&
			Array.isArray( options ) && (
				<BaseControl
					label={ label }
					id={ id }
					help={ help }
					className={ classnames(
						className,
						'components-radio-control',
						'components-image-radio-control'
					) }
				>
					{ options.map( ( option, index ) => {
						const Image = option.src;
						return (
							<div
								key={ `${ id }-${ index }` }
								className={ classnames( 'components-radio-control__option', {
									active: option.value === selected,
								} ) }
							>
								<input
									id={ `${ id }-${ index }` }
									className="components-radio-control__input"
									type="radio"
									name={ id }
									value={ option.value }
									onChange={ onChangeValue }
									checked={ option.value === selected }
									aria-describedby={ !! help ? `${ id }__help` : undefined }
								/>
								<label htmlFor={ `${ id }-${ index }` }>
									<div className="components-image-radio-control__image">
										{ Image &&
											( 'string' === typeof Image ? (
												<img src={ Image } alt={ option.label } />
											) : (
												<Image />
											) ) }
									</div>
									<span className="components-image-radio-control__label">
										{ option.label }
									</span>
								</label>
							</div>
						);
					} ) }
				</BaseControl>
			)
		);
	}
);

export default ImageRadioControl;
