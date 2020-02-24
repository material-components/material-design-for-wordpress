/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import CardImage from './card-image';
import CardPrimary from './card-primary';
import CardActions from './card-actions';

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
				<CardPrimary { ...props } />
			</div>
			{ ( displayPostAuthor || displayCommentsCount ) && (
				<CardActions { ...props } />
			) }
		</div>
	);
};

export default HorizontalCardLayout;
