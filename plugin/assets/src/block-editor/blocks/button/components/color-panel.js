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

import {
	__experimentalColorGradientSettingsDropdown as ColorGradientDropdown,
	ContrastChecker,
} from '@wordpress/block-editor';
import { PanelBody } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

const ColorPanel = ( { colors: { text, container } } ) => {
	const settings = [ text, container ];

	return (
		<PanelBody
			title={ __( 'Color', 'material-design' ) }
			initialOpen={ false }
		>
			<ColorGradientDropdown settings={ settings } />

			<ContrastChecker
				textColor={ text.colorValue }
				backgroundColor={ container.colorValue }
			/>
		</PanelBody>
	);
};

export default ColorPanel;
