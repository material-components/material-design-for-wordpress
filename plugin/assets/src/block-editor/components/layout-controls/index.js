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
import { BaseControl, RangeControl, Tooltip } from '@wordpress/components';
import { useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import './style.css';
import { DEVICES } from '../../constants';

export default ( {
	label,
	columns,
	gutter,
	columnsMin = 0,
	columnsMax = 5,
	gutterMin = 0,
	gutterMax = 24,
	onColumnsChange,
	onGutterChange,
} ) => {
	const [ selectedDevice, setSelectedDevice ] = useState( 'desktop' );

	const setGutter = newGutter => {
		onGutterChange( { ...gutter, ...{ [ selectedDevice ]: newGutter } } );
	};

	const setColumns = newColumns => {
		onColumnsChange( {
			...columns,
			...{ [ selectedDevice ]: newColumns },
		} );
	};

	const VisualLabel = BaseControl.VisualLabel || 'label';

	return (
		<BaseControl>
			<VisualLabel className="components-base-control__layout-controls-label">
				{ label }
				<div className="components-base-control__label-actions components-base-control__layout-controls">
					{ DEVICES.map( device => (
						<Tooltip text={ device.label } key={ device.name }>
							<button
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
						</Tooltip>
					) ) }
				</div>
			</VisualLabel>
			<RangeControl
				label={ __( 'Columns', 'material-design' ) }
				value={
					columns && columns[ selectedDevice ]
						? columns[ selectedDevice ]
						: columnsMin
				}
				onChange={ setColumns }
				min={ columnsMin }
				max={ columnsMax }
			/>
			<RangeControl
				label={ __( 'Gutter', 'material-design' ) }
				value={
					gutter && gutter[ selectedDevice ]
						? gutter[ selectedDevice ]
						: gutterMin
				}
				onChange={ setGutter }
				min={ gutterMin }
				max={ gutterMax }
			/>
		</BaseControl>
	);
};
