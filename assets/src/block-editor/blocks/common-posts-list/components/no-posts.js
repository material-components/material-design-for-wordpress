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
import { Spinner, Placeholder } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * No Posts component. This component also serves to show a spinner while fetching the recent posts data.
 *
 * @param {Object} props - Component props.
 * @param {string} props.name - Component name.
 * @param {Array} props.postsToDisplay - Posts.
 *
 * @return {Function} A functional component.
 */
const NoPosts = ( { name, postsToDisplay } ) => {
	let placeholderLabel = __( 'Recent Posts', 'material-design' );

	if ( name === 'material/hand-picked-posts' ) {
		placeholderLabel = __( 'Curated Post Collection', 'material-design' );
	}

	return (
		<>
			<Placeholder icon={ 'sticky' } label={ placeholderLabel }>
				{ ! Array.isArray( postsToDisplay ) ? (
					<Spinner />
				) : (
					__( 'No posts found.', 'material-design' )
				) }
			</Placeholder>
		</>
	);
};

export default NoPosts;
