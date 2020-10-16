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
import { Placeholder, Button } from '@wordpress/components';
import { useCallback } from '@wordpress/element';

/**
 * Internal dependencies
 */
import PostsControl from '../../../components/posts-control';
import genericAttributesSetter from '../../../utils/generic-attributes-setter';

/**
 * Posts Picker component.
 *
 * @param {Object} props - Component props.
 * @param {Object} props.attributes - Block attributes.
 * @param {Function} props.debouncedSpeak - Function to debounce the call to the Speak method for accessibility purpose.
 * @param {Function} props.setAttributes - Function to set block attributes value.
 *
 * @return {Function} A functional component.
 */
const PostsPicker = ( { attributes, debouncedSpeak, setAttributes } ) => {
	const setter = useCallback( genericAttributesSetter( setAttributes ) );

	const onDone = () => {
		setAttributes( { editMode: false } );
		debouncedSpeak(
			__( 'Showing Curated Post Collection block preview.', 'material-design' )
		);
	};

	return (
		<Placeholder
			icon={ <i className="material-icons-outlined">library_books</i> }
			label={ __( 'Curated Post Collection', 'material-design' ) }
			className="material-design-block-products-grid material-design-block-handpicked-posts"
		>
			{ __( 'Display a selection of hand-picked posts.', 'material-design' ) }
			<div className="material-design-block-handpicked-posts__selection">
				<PostsControl
					selected={ attributes.posts }
					onChange={ setter( 'posts', ( value = [] ) => {
						/* istanbul ignore next */
						return value.map( ( { id } ) => id );
					} ) }
				/>
				<Button isPrimary onClick={ onDone }>
					{ __( 'Done', 'material-design' ) }
				</Button>
			</div>
		</Placeholder>
	);
};

export default PostsPicker;
