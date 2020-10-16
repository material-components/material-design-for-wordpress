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
import { __ } from '@wordpress/i18n';
import { SelectControl } from '@wordpress/components';

/**
 * A pre-configured SelectControl for post orderby settings.
 *
 * @param {Object} props - Component props.
 * @param {string} props.value - Ordering value.
 * @param {Function} props.onChange - Callback fired when the selected item changes.
 */
const PostsOrderbyControl = ( { value, onChange } ) => (
	<SelectControl
		label={ __( 'Order posts by', 'material-design' ) }
		value={ value }
		options={ [
			{
				label: __( 'Newness - newest first', 'material-design' ),
				value: 'date',
			},
			{
				label: __( 'Title - alphabetical', 'material-design' ),
				value: 'title',
			},
			{
				label: __( 'Comments - most first', 'material-design' ),
				value: 'popularity',
			},
		] }
		onChange={ onChange }
	/>
);

export default PostsOrderbyControl;
