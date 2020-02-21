/**
 * WordPress dependencies
 */
import { RawHTML } from '@wordpress/element';
import { dateI18n, format, __experimentalGetSettings } from '@wordpress/date';
import { __ } from '@wordpress/i18n';

const CardActions = ( { displayPostAuthor, displayCommentsCount, post } ) => (
	<div className="mdc-card__actions">
		<div className="mdc-card__action-buttons">
			{ displayPostAuthor && (
				<button className="mdc-button mdc-card__action mdc-card__action--button">
					<span className="mdc-button__ripple"></span>
					<i className="material-icons mdc-button__icon" aria-hidden="true">
						face
					</i>
					<span className="mdc-button__label">{ post.authorDisplayName }</span>
				</button>
			) }
			{ displayCommentsCount && (
				<button className="mdc-button mdc-card__action mdc-card__action--button">
					<span className="mdc-button__ripple"></span>
					<i className="material-icons mdc-button__icon" aria-hidden="true">
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
);

const CardImage = ( { imageSourceUrl, type } ) => (
	<div
		className={ `mdc-card__media mdc-card__media--${ type } single-post-card__media }` }
		style={ { backgroundImage: `url(${ imageSourceUrl })` } }
	/>
);

const CardPrimary = ( { titleTrimmed, displayPostDate, post, dateFormat } ) => (
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
);

const HorizontalCardLayout = props => {
	const {
		postIndex,
		imageSourceUrl,
		outlined,
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
					<CardImage imageSourceUrl={ imageSourceUrl } type="square" />
				) }
				<CardPrimary { ...props } />
			</div>
			{ ( displayPostAuthor || displayCommentsCount ) && (
				<CardActions { ...props } />
			) }
		</div>
	);
};

const VerticalCardLayout = props => {
	const {
		postIndex,
		excerpt,
		imageSourceUrl,
		outlined,
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
					<CardImage imageSourceUrl={ imageSourceUrl } type="16-9" />
				) }
				<CardPrimary { ...props } />
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
				<CardActions { ...props } />
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
