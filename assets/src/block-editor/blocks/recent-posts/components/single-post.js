/**
 * WordPress dependencies
 */
import { RawHTML } from '@wordpress/element';
import { dateI18n, format, __experimentalGetSettings } from '@wordpress/date';
import { __ } from '@wordpress/i18n';

// @todo: Refactor Material design layout.
export default ( { post, postIndex, attributes } ) => {
	const {
		// outlined,
		displayPostDate,
		displayPostContent,
		displayFeaturedImage,
		displayCommentsCount,
		displayPostAuthor,
	} = attributes;

	const titleTrimmed = post.title.rendered.trim();
	let excerpt = post.excerpt.rendered;

	const excerptElement = document.createElement( 'div' );
	excerptElement.innerHTML = excerpt;
	excerpt = excerptElement.textContent || excerptElement.innerText || '';

	const imageSourceUrl = post.featuredImageSourceUrl;
	const dateFormat = __experimentalGetSettings().formats.date;

	return (
		<div className="mdc-card demo-card">
			<div
				className="mdc-card__primary-action demo-card__primary-action"
				tabIndex={ postIndex }
			>
				{ displayFeaturedImage && imageSourceUrl && (
					<div
						className="mdc-card__media mdc-card__media--16-9 demo-card__media"
						style={ { backgroundImage: `url(${ imageSourceUrl })` } }
					/>
				) }
				<div className="demo-card__primary">
					<h4 className="demo-card__title mdc-typography mdc-typography--headline6">
						<a href={ post.link } target="_blank" rel="noreferrer noopener">
							{ titleTrimmed ? (
								<RawHTML>{ titleTrimmed }</RawHTML>
							) : (
								__( '(no title)', 'material-theme-builder' )
							) }
						</a>
					</h4>
					{ ( displayPostDate ||
						displayPostAuthor ||
						displayCommentsCount ) && (
						<h5 className="demo-card__subtitle mdc-typography mdc-typography--subtitle2">
							{ displayPostAuthor && <span> { post.authorDisplayName } </span> }
							{ displayCommentsCount && <span> { post.commentsCount } </span> }
							{ displayPostDate && post.date_gmt && (
								<time
									dateTime={ format( 'c', post.date_gmt ) }
									className="wp-block-latest-posts__post-date"
								>
									{ dateI18n( dateFormat, post.date_gmt ) }
								</time>
							) }
						</h5>
					) }
				</div>
				{ displayPostContent && (
					<div className="demo-card__secondary mdc-typography mdc-typography--body2">
						<RawHTML key="html">{ excerpt.trim() }</RawHTML>
					</div>
				) }
			</div>
		</div>
	);
};
