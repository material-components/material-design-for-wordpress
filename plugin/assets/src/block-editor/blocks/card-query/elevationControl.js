/*
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
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
import { RadioControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

const ElevationStyleControl = ( { onChange, selected } ) => {
	const options = [
		{
			label: __( 'Elevated', 'material-design' ),
			value: 'elevated',
		},
		{
			label: __( 'Outlined', 'material-design' ),
			value: 'outlined',
		},
		{
			label: __( 'Filled', 'material-design' ),
			value: 'filled',
		},
		{
			label: __( 'Inherit from Global Settings', 'material-design' ),
			value: 'global',
		},
	];
	return (
		<RadioControl
			label={ __( 'Elevation style', 'material-design' ) }
			help={ __(
				'Elevation style whether elevated or outlined.',
				'material-design'
			) }
			selected={ selected }
			options={ options }
			onChange={ onChange }
		/>
	);
};

export default ElevationStyleControl;
