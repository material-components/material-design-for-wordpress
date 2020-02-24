/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { RawHTML } from '@wordpress/element';

/**
 * Internal dependencies
 */
import CardImage from './card-image';
import CardPrimary from './card-primary';
import CardActions from './card-actions';

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
			className={ classnames(
				'mdc-card',
				{ 'mdc-card--outlined': outlined },
				'single-post-card',
				'single-post-card__masonry',
				'single-post-basic'
			) }
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

export default VerticalCardLayout;
