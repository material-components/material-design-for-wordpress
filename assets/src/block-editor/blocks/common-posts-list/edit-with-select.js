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
import './style.css';
import NoPosts from './components/no-posts';
import PostsList from './components/posts-list';

/**
 * Edit component.
 *
 * @param {Object} props - Component props.
 *
 * @return {Function} A functional component.
 */
const Edit = props => {
	const { postsToDisplay } = props;
	const hasPosts = Array.isArray( postsToDisplay ) && postsToDisplay.length;

	if ( ! hasPosts ) {
		return <NoPosts { ...props } />;
	}

	return <PostsList { ...props } />;
};

/**
 * @type {Function} A functional component.
 */
const EditWithSelect = withSelect( ( select, props ) => {
	const {
		category,
		postsToShow,
		posts,
		orderby,
		displayFeaturedImage,
		style,
	} = props.attributes;
	const { name } = props;

	const featuredImageSizeSlug = style === 'list' ? 'medium' : 'large';

	const { getEntityRecords, getMedia } = select( 'core' );

	let queryArgs = {
		categories: category,
		per_page: postsToShow,
	};

	if ( name === 'material/hand-picked-posts' ) {
		queryArgs = {
			include: posts.map( Number ),
			per_page: posts.length,
			orderby: 'date',
			order: 'desc',
		};

		if ( orderby ) {
			if ( orderby === 'title' ) {
				queryArgs.orderby = 'title';
				queryArgs.order = 'asc';
			} else if ( orderby === 'popularity' ) {
				queryArgs.orderby = 'comment_count';
				queryArgs.order = 'desc';
			}
		}
	}

	const fetchedPostsQuery = pickBy(
		queryArgs,
		value => ! isUndefined( value )
	);

	const fetcheddPosts = getEntityRecords(
		'postType',
		'post',
		fetchedPostsQuery
	);

	return {
		postsToDisplay: ! Array.isArray( fetcheddPosts )
			? fetcheddPosts
			: fetcheddPosts.map( post => {
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
} )( Edit );

export default EditWithSelect;
