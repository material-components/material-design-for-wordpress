/**
 * WordPress dependencies
 */
import { RawHTML } from '@wordpress/element';
import { dateI18n, format, __experimentalGetSettings } from '@wordpress/date';
import { __ } from '@wordpress/i18n';

const HorizontalCardLayout = props => {
	const {
		post,
		postIndex,
		titleTrimmed,
		imageSourceUrl,
		dateFormat,
		outlined,
		displayPostDate,
		displayFeaturedImage,
		displayCommentsCount,
		displayPostAuthor,
	} = props;

	return (
		<div
			className={
				'mdc-card ' +
				( outlined ? 'mdc-card--outlined' : '' ) +
				' single-post-card single-post-card__list single-post-basic'
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
			{ ( displayPostAuthor || displayCommentsCount ) && (
				<div className="mdc-card__actions">
					<div className="mdc-card__action-buttons">
						{ displayPostAuthor && (
							<button className="mdc-button mdc-card__action mdc-card__action--button">
								<span className="mdc-button__ripple"></span>
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
							<button className="mdc-button mdc-card__action mdc-card__action--button">
								<span className="mdc-button__ripple"></span>
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
	);
};

const VerticalCardLayout = props => {
	const {
		post,
		postIndex,
		titleTrimmed,
		excerpt,
		imageSourceUrl,
		dateFormat,
		outlined,
		displayPostDate,
		displayPostContent,
		postContentLength,
		displayFeaturedImage,
		displayCommentsCount,
		displayPostAuthor,
	} = props;

	return (
		<div
			className={
				'mdc-card ' +
				( outlined ? 'mdc-card--outlined' : '' ) +
				' single-post-card single-post-card__masonry single-post-basic'
			}
		>
			<div
				className="mdc-card__primary-action single-post-card__primary-action mdc-ripple-upgraded"
				tabIndex={ postIndex }
			>
				{ displayFeaturedImage && imageSourceUrl && (
					<div
						className="mdc-card__media mdc-card__media--16-9 single-post-card__media"
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
			</div>
			{ ( displayPostAuthor || displayCommentsCount ) && (
				<div className="mdc-card__actions">
					<div className="mdc-card__action-buttons">
						{ displayPostAuthor && (
							<button className="mdc-button mdc-card__action mdc-card__action--button">
								<span className="mdc-button__ripple"></span>
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
							<button className="mdc-button mdc-card__action mdc-card__action--button">
								<span className="mdc-button__ripple"></span>
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
	);
};

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
