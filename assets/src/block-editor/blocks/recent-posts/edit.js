/**
 * External dependencies
 */
import { get, isUndefined, pickBy } from 'lodash';

/**
 * WordPress dependencies
 */
import { withSelect } from '@wordpress/data';

/**
 * Internal dependencies
 */
import NoPosts from './components/no-posts';
import PostsList from './components/posts-list';
import '../common-posts-list/style.css';

/**
 * Recent Posts Edit component.
 *
 * @param {Object} props - Component props.
 *
 * @return {Function} A functional component.
 */
const RecentPostsEdit = props => {
	const { recentPosts } = props;
	const hasPosts = Array.isArray( recentPosts ) && recentPosts.length;

	if ( ! hasPosts ) {
		return <NoPosts { ...props } />;
	}

	return <PostsList { ...props } />;
};

/**
 * @type {Function} A functional component.
 */
const RecentPostsEditWithSelect = withSelect( ( select, props ) => {
	const {
		postsToShow,
		category,
		displayFeaturedImage,
		style,
	} = props.attributes;

	const featuredImageSizeSlug = style === 'list' ? 'medium' : 'large';

	const { getEntityRecords, getMedia } = select( 'core' );
	const recentPostsQuery = pickBy(
		{
			categories: category,
			per_page: postsToShow,
		},
		value => ! isUndefined( value )
	);

	const posts = getEntityRecords( 'postType', 'post', recentPostsQuery );

	return {
		recentPosts: ! Array.isArray( posts )
			? posts
			: posts.map( post => {
					if ( displayFeaturedImage && post.featured_media ) {
						const image = getMedia( post.featured_media );
						let url = get(
							image,
							[ 'media_details', 'sizes', featuredImageSizeSlug, 'source_url' ],
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

export default RecentPostsEditWithSelect;
