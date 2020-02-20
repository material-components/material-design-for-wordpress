/**
 * WordPress dependencies
 */
import { withSelect } from '@wordpress/data';

/**
 * External dependencies
 */
import { get, isUndefined, pickBy } from 'lodash';

/**
 * Internal dependencies
 */
import NoPosts from './components/no-posts';
import PostsList from './components/posts-list';

/**
 * Material recent posts edit component.
 */
const RecentPostsEdit = ( { recentPosts, attributes, setAttributes } ) => {
	const hasPosts = Array.isArray( recentPosts ) && recentPosts.length;
	const props = { recentPosts, attributes, setAttributes };

	if ( ! hasPosts ) {
		return <NoPosts { ...props } />;
	}

	return <PostsList { ...props } />;
};

export default withSelect( ( select, props ) => {
	const { postsToShow, categories, displayFeaturedImage } = props.attributes;

	const { getEntityRecords, getMedia } = select( 'core' );

	const recentPostsQuery = pickBy(
		{
			categories,
			per_page: postsToShow,
		},
		value => ! isUndefined( value )
	);

	const posts = getEntityRecords( 'postType', 'post', recentPostsQuery );

	// @todo: Implement logic to get the correct image size.
	return {
		recentPosts: ! Array.isArray( posts )
			? posts
			: posts.map( post => {
					if ( displayFeaturedImage && post.featured_media ) {
						const image = getMedia( post.featured_media );
						let url = get(
							image,
							[ 'media_details', 'sizes', 'source_url' ],
							null
						);
						if ( ! url ) {
							url = get( image, 'source_url', null );
						}
						return { ...post, featuredImageSourceUrl: url };
					}
					return post;
			  } ),
	};
} )( RecentPostsEdit );
