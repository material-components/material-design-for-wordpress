/**
 * External dependencies
 */
import { __, _n, sprintf } from '@wordpress/i18n';
import { SearchListControl } from '@woocommerce/components';
import withSearchedPosts from '../../hocs/with-searched-posts';
import ErrorMessage from '../error-message';
import '@woocommerce/components/build-style/style.css';

/**
 * The posts control exposes a custom selector for searching and selecting
 * posts.
 *
 * Most of the code has been lifted from https://github.com/woocommerce/woocommerce-gutenberg-products-block/blob/master/assets/js/components/products-control/index.js
 *
 * @param {Object} props - Component props.
 * @param {Function} props.onChange  - Callback fired when the selected item changes
 * @param {Function} props.onSearch  - Callback fired when a search is triggered
 * @param {Array}    props.selected  - An array of selected posts.
 * @param {Array}    props.posts  - An array of posts to select from.
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
	const messages = {
		clear: __( 'Clear all posts', 'material-theme-builder' ),
		list: __( 'Posts', 'material-theme-builder' ),
		noItems: __( 'There are no posts.', 'material-theme-builder' ),
		search: __( 'Search for posts to display', 'material-theme-builder' ),
		selected: n =>
			sprintf(
				_n(
					'%d post selected',
					'%d posts selected',
					n,
					'material-theme-builder'
				),
				n
			),
		updated: __( 'Posts search results updated.', 'material-theme-builder' ),
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
