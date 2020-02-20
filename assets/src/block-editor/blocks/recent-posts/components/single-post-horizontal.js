/**
 * WordPress dependencies
 */
import { RawHTML } from '@wordpress/element';
import { dateI18n, format, __experimentalGetSettings } from '@wordpress/date';
import { __ } from '@wordpress/i18n';

// @todo: Refactor Material design layout.
export default ( { post, postIndex, attributes } ) => {
	const {
		outlined,
		displayPostDate,
		displayPostContent,
		postContentLength,
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
		<a
			href={ post.link }
			className="mdc-card__link"
			target="_blank"
			rel="noreferrer noopener"
		>
			<div
				className={
					'mdc-card ' +
					( outlined ? 'mdc-card--outlined' : '' ) +
					' single-post-card single-post-card__horizontal single-post-basic-with-header'
				}
			>
				<div
					className="mdc-card__primary-action single-post-card__primary-action"
					tabIndex={ postIndex }
				>
					{ displayFeaturedImage && imageSourceUrl && (
						<div
							className="mdc-card__media mdc-card__media--square demo-card__media single-post-card__media"
							style={ { backgroundImage: `url(${ imageSourceUrl })` } }
						/>
					) }
					<div className="single-post-card__primary">
						<h2 className="single-post-card__title mdc-typography mdc-typography--headline6">
							{ titleTrimmed ? (
								<RawHTML>{ titleTrimmed }</RawHTML>
							) : (
								__( '(no title)', 'material-theme-builder' )
							) }
						</h2>
						{ displayPostDate && (
							<h3 className="single-post-card__subtitle mdc-typography mdc-typography--subtitle2">
								<time dateTime={ format( 'c', post.date_gmt ) }>
									{ dateI18n( dateFormat, post.date_gmt ) }
								</time>
							</h3>
						) }
					</div>
				</div>
				{ displayPostContent && (
					<div className="single-post-card__secondary mdc-typography mdc-typography--body2">
						<RawHTML key="html">
							{ postContentLength < excerpt.trim().split( ' ' ).length
								? excerpt
										.trim()
										.split( ' ', postContentLength )
										.join( ' ' ) + ' ...'
								: excerpt
										.trim()
										.split( ' ', postContentLength )
										.join( ' ' ) }
						</RawHTML>
					</div>
				) }
				{ ( displayPostAuthor || displayCommentsCount ) && (
					<div className="mdc-card__actions">
						<div className="mdc-card__action-buttons">
							{ displayPostAuthor && (
								<button className="mdc-button">
									<i
										className="material-icons mdc-button__icon"
										aria-hidden="true"
									>
										face
									</i>
									<span className="mdc-button__label">
										{ post.authorDisplayName }
									</span>
								</button>
							) }
							{ displayCommentsCount && (
								<button className="mdc-button">
									<i
										className="material-icons mdc-button__icon"
										aria-hidden="true"
									>
										comment
									</i>
									<span className="mdc-button__label">
										{ post.commentsCount }{ ' ' }
										{ __( 'comments', 'material-theme-builder' ) }
									</span>
								</button>
							) }
						</div>
					</div>
				) }
			</div>
		</a>
	);
};
