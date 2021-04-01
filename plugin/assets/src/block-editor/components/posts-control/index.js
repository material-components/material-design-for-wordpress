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
import { SearchListControl } from '@woocommerce/components';
import '@woocommerce/components/build-style/style.css';

/**
 * WordPress dependencies
 */
import { __, _n, sprintf } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import withSearchedPosts from '../../hocs/with-searched-posts';
import ErrorMessage from '../error-message';

/**
 * The posts control exposes a custom selector for searching and selecting posts.
 *
 * Most of the code has been lifted from https://github.com/woocommerce/woocommerce-gutenberg-products-block/blob/master/assets/js/components/products-control/index.js
 *
 * @param {Object} props - Component props.
 * @param {Function} props.onChange - Callback fired when the selected item changes.
 * @param {Function} props.onSearch - Callback fired when a search is triggered.
 * @param {Array}    props.selected - An array of selected posts.
 * @param {Array}    props.posts - An array of posts to select from.
 * @param {boolean}  props.isLoading - Whether or not the posts are being loaded.
 *
 * @return {Function} A functional component.
 */
const PostsControl = ( {
	error,
	onChange,
	onSearch,
	selected,
	posts,
	isLoading,
} ) => {
	/* istanbul ignore next */
	const messages = {
		clear: __( 'Clear all posts', 'material-design' ),
		list: __( 'Posts', 'material-design' ),
		noItems: __( 'There are no posts.', 'material-design' ),
		search: __( 'Search for posts to display', 'material-design' ),
		selected: n =>
			sprintf(
				_n( '%d post selected', '%d posts selected', n, 'material-design' ),
				n
			),
		updated: __( 'Posts search results updated.', 'material-design' ),
	};

	if ( error ) {
		return <ErrorMessage error={ error } />;
	}

	return (
		<SearchListControl
			className="mtd-posts"
			list={ posts }
			isLoading={ isLoading }
			selected={ posts.filter( ( { id } ) => selected.includes( id ) ) }
			onSearch={ onSearch }
			onChange={ onChange }
			messages={ messages }
		/>
	);
};

export default withSearchedPosts( PostsControl );
