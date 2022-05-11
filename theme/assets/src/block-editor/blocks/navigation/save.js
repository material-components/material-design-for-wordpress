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
import { InnerBlocks } from '@wordpress/block-editor';

/**
 *
 * @param {Object} props
 * @param {Object} props.attributes
 *
 * @return {JSX.Element|void} Element to save
 */
export default function save( { attributes } ) {
	if ( attributes.ref ) {
		// Avoid rendering inner blocks when a ref is defined.
		// When this id is defined the inner blocks are loaded from the
		// `wp_navigation` entity rather than the hard-coded block html.
		return;
	}
	return <InnerBlocks.Content />;
}
