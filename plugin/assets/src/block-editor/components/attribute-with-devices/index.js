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
import classNames from 'classnames';

/**
 * WordPress dependencies
 */
import { RangeControl } from '@wordpress/components';
import { useState } from '@wordpress/element';

/**
 * Internal dependencies
 */
import './style.css';
import { DEVICES } from '../../constants';

export default ( { label, value, min = 0, max = 24, onChange } ) => {
	const [ selectedDevice, setSelectedDevice ] = useState( 'desktop' );

	const setGutter = newGutter => {
		onChange( { ...value, ...{ [ selectedDevice ]: newGutter } } );
	};

	return (
		<RangeControl
			label={
				<>
					{ label }
					<div className="components-base-control__label-actions components-base-control__attr-device-label">
						{ DEVICES.map( device => (
							<button
								key={ device.name }
								className={ classNames( '', {
									'is-selected':
										device.name === selectedDevice,
								} ) }
								onClick={ () =>
									setSelectedDevice( device.name )
								}
							>
								<i className="material-icons">
									{ device.icon }
								</i>
							</button>
						) ) }
					</div>
				</>
			}
			value={ value[ selectedDevice ] || 1 }
			onChange={ setGutter }
			min={ min }
			max={ max }
		/>
	);
};
