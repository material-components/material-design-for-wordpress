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
import { __ } from '@wordpress/i18n';
import { Toolbar } from '@wordpress/components';

const DIRECTIONS = [
	{
		icon: () => <i className="material-icons">keyboard_arrow_left</i>,
		title: __( 'Move left', 'material-design' ),
		direction: 'left',
	},
	{
		icon: () => <i className="material-icons">keyboard_arrow_right</i>,
		title: __( 'Move right', 'material-design' ),
		direction: 'right',
	},
];

const OrderToolbar = ( {
	onChange,
	label = __( 'Change the tab order', 'material-design' ),
} ) => (
	<Toolbar
		label={ label }
		controls={ DIRECTIONS.map( control => ( {
			...control,
			onClick: onChange.bind( this, control.direction ),
		} ) ) }
	/>
);

export default OrderToolbar;
