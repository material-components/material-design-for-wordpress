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
 * Internal dependencies
 */
import Gallery from './components/gallery';

/**
 * ImageListSave component.
 *
 * @param {Object} props - Component props.
 * @param {Array} props.attributes.id - ID of the wrapping div.
 * @param {Array} props.attributes.images - List of images in the gallery.
 * @param {string} props.attributes.style - Layout style of the gallery.
 * @param {number} props.attributes.columns - Columns in the gallery.
 * @param {Object} props.attributes.gutter - Column gutter for various devices.
 * @param {number} props.attributes.cornerRadius - Corner radius.
 * @param {boolean} props.attributes.displayCaptions - Display/hide captions.
 * @param {boolean} props.attributes.textProtection - Display/hide captions with text protection.
 * @param {string} props.attributes.linkTo - Image should link to.
 * @param {string} props.className - Class name for the block.
 * @param {number} props.instanceId - Unique instance ID.
 *
 * @return {Function} A functional component.
 */
const ImageListSave = ( {
	attributes: {
		id,
		images,
		style,
		columns,
		gutter,
		cornerRadius,
		displayCaptions,
		textProtection,
		linkTo,
	},
	className,
} ) => (
	<div className={ className } id={ id }>
		<Gallery
			{ ...{
				images,
				style,
				columns,
				gutter,
				cornerRadius,
				displayCaptions,
				textProtection,
				linkTo,
				isSaveContext: true,
			} }
		/>
	</div>
);

export default ImageListSave;
