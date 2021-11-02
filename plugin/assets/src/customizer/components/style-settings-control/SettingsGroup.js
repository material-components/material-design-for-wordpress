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
/* eslint-disable @wordpress/no-unsafe-wp-apis */

/**
 * Wordpress dependencies
 */
import {
	__experimentalRadio as Radio,
	__experimentalRadioGroup as RadioGroup,
} from '@wordpress/components';
import { useState } from '@wordpress/element';

/**
 * External dependencies
 */
import uniqueId from 'lodash/uniqueId';

const SettingsGroup = ( {
	title,
	icon,
	choices,
	defaultChecked,
	onChange,
} ) => {
	const [ selected, setSelected ] = useState( defaultChecked );

	const handleChange = value => {
		setSelected( value );
		onChange( value );
	};

	return (
		<div className="style-settings-group">
			<div className="style-settings-group__title">
				<span className="material-icons">{ icon }</span>
				{ title }
			</div>

			{ choices && (
				<RadioGroup
					label="test"
					defaultChecked={ defaultChecked }
					checked={ selected }
					onChange={ handleChange }
				>
					{ choices.map( choice => (
						<Radio key={ uniqueId( 'option' ) } value={ choice }>
							{ choice }
						</Radio>
					) ) }
				</RadioGroup>
			) }
		</div>
	);
};

export default SettingsGroup;
