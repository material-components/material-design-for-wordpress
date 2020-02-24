/**
 * External dependencies
 */
import { get, isUndefined, pickBy } from 'lodash';

/**
 * WordPress dependencies
 */
import { withSelect } from '@wordpress/data';
import { createHigherOrderComponent } from '@wordpress/compose';

/**
 * Internal dependencies
 */
import NoPosts from './components/no-posts';
import PostsList from './components/posts-list';
import './style.css';

/**
 * @type {WPComponent}
 */
const withCustomClassName = createHigherOrderComponent( BlockListBlock => {
	return props => {
		if ( 'material/recent-posts' !== props.name ) {
			return <BlockListBlock { ...props } />;
		}

		const { style } = props.attributes;
		const className = `recent-posts-block-${ style }`;

		return <BlockListBlock { ...props } className={ className } />;
	};
}, 'withCustomClassName' );
wp.hooks.addFilter(
	'editor.BlockListBlock',
	'material/with-custom-class-name',
	withCustomClassName
);

/**
 * Recent Posts Edit component.
 *
 * @param {Object} props - Component props
 *
 * @return {Function} Function returning the HTML markup for the component.
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
 * @type {Function} Function returning the HTML markup for the component.
 */
const RecentPostsEditWithSelect = withSelect( ( select, props ) => {
	const {
		postsToShow,
		categories,
		displayFeaturedImage,
		featuredImageSizeSlug,
	} = props.attributes;

	const { getEntityRecords, getMedia } = select( 'core' );
	const { getSettings } = select( 'core/block-editor' );
	const { imageSizes } = getSettings();
	const recentPostsQuery = pickBy(
		{
			categories,
			per_page: postsToShow,
		},
		value => ! isUndefined( value )
	);

	const posts = getEntityRecords( 'postType', 'post', recentPostsQuery );

	const imageSizeOptions = imageSizes
		.filter( ( { slug } ) => slug !== 'full' )
		.map( ( { name, slug } ) => ( { value: slug, label: name } ) );

	return {
		imageSizeOptions,
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
