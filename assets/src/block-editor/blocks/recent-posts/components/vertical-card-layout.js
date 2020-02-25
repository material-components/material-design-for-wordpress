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

/**
 * Horizontal Card Layout component.
 *
 * @param {Object} props - Props.
 * @param {number} props.postIndex - Post index.
 * @param {string} props.excerpt - Post excerpt.
 * @param {string} props.imageSourceUrl - Image source URL.
 * @param {boolean} props.outlined - Whether or not the card has an outlined style.
 * @param {boolean} props.displayPostContent - Whether or not to display the post content.
 * @param {number} props.postContentLength - Post content length.
 * @param {boolean} props.displayFeaturedImage - Whether or not to display the featured image.
 * @param {boolean} props.displayCommentsCount - Whether or not to display the comments count field.
 * @param {boolean} props.displayPostAuthor - Whether or not to display the post author field.
 *
 * @return {Function} Function returning the HTML markup for the component.
 */
const VerticalCardLayout = props => {
	const {
		postIndex,
		excerpt,
		imageSourceUrl,
		contentLayout,
		outlined,
		displayPostContent,
		postContentLength,
		displayFeaturedImage,
		displayCommentsCount,
		displayPostAuthor,
	} = props;

	const cardImageProps = { type: '16-9', ...props };

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
				{ contentLayout === 'text-above-media' && <CardPrimary { ...props } /> }
				{ displayFeaturedImage && imageSourceUrl && (
					<CardImage { ...cardImageProps } />
				) }
				{ contentLayout === 'text-under-media' && <CardPrimary { ...props } /> }
				{ displayPostContent && (
					<div
						className={ classnames(
							'single-post-card__secondary',
							`single-post-card__secondary-${ contentLayout }`,
							'mdc-typography',
							'mdc-typography--body2'
						) }
					>
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
