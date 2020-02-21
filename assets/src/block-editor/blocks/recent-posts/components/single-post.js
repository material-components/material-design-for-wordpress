/**
 * WordPress dependencies
 */
import { __experimentalGetSettings } from '@wordpress/date';

/**
 * Internal dependencies
 */
import VerticalCardLayout from './vertical-card-layout';
import HorizontalCardLayout from './horizontal-card-layout';

const SinglePost = ( { post, postIndex, style, attributes } ) => {
	const titleTrimmed = post.title.rendered.trim();
	let excerpt = post.excerpt.rendered;

	const excerptElement = document.createElement( 'div' );
	excerptElement.innerHTML = excerpt;
	excerpt = excerptElement.textContent || excerptElement.innerText || '';

	const imageSourceUrl = post.featuredImageSourceUrl;
	const dateFormat = __experimentalGetSettings().formats.date;

	const styleProps = {
		post,
		postIndex,
		titleTrimmed,
		excerpt,
		imageSourceUrl,
		dateFormat,
		...attributes,
	};

	return (
		<>
			{ style === 'grid' && <VerticalCardLayout { ...styleProps } /> }
			{ style === 'list' && <HorizontalCardLayout { ...styleProps } /> }
			{ style === 'masonry' && <VerticalCardLayout { ...styleProps } /> }
		</>
	);
};

export default SinglePost;
