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
import { ContrastChecker } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import { withGlobalColorDefault, getColor } from '../with-global-default';
import MaterialColorPalette from '../material-color-palette';

/**
 * Check color contrast using global color defaults as fallback.
 *
 * @param {Object} props Component props.
 * @param {string} props.textColor Color of the text.
 * @param {string} props.backgroundColor Color of background.
 * @param {string} props.textProp Global prop name for text color.
 * @param {string} props.backgroundProp Global prop name for background color.
 *
 * @return {Function} Updated component.
 */
export const GlobalColorContrastChecker = ( {
	textColor,
	backgroundColor,
	textProp,
	backgroundProp,
} ) => {
	textColor = getColor( textProp, textColor );
	backgroundColor = getColor( backgroundProp, backgroundColor );

	return (
		<ContrastChecker
			textColor={ textColor }
			backgroundColor={ backgroundColor }
		/>
	);
};

export default withGlobalColorDefault( MaterialColorPalette );
