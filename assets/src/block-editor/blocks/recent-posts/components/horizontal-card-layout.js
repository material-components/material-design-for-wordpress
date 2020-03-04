/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import CardImage from './card-image';
import CardHeader from './card-header';
import CardActions from './card-actions';

/**
 * Horizontal Card Layout component.
 *
 * @param {Object} props - Component props.
 * @param {number} props.postIndex - Post index.
 * @param {string} props.imageSourceUrl - Image source URL.
 * @param {boolean} props.outlined - Whether or not the card has an outlined style.
 * @param {boolean} props.displayFeaturedImage - Whether or not to display the featured image.
 * @param {boolean} props.displayCommentsCount - Whether or not to display the comments count field.
 * @param {boolean} props.displayPostAuthor - Whether or not to display the post author field.
 * @param {Object} props.post - Post data.
 * @param {string} props.dateFormat - Date format.
 *
 * @return {Function} A functional component.
 */
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
			className={ classnames(
				'mdc-card',
				{ 'mdc-card--outlined': outlined },
				'single-post-card',
				'single-post-card__list',
				'single-post-basic'
			) }
		>
			<div
				className="mdc-card__primary-action single-post-card__primary-action"
				tabIndex={ postIndex }
			>
				{ displayFeaturedImage && imageSourceUrl && (
					<CardImage imageSourceUrl={ imageSourceUrl } type="square" />
				) }
				<CardHeader { ...props } />
			</div>
			{ ( displayPostAuthor || displayCommentsCount ) && (
				<CardActions { ...props } />
			) }
		</div>
	);
};

export default HorizontalCardLayout;
