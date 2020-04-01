/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import '../stlye.css';
import '../editor.css';
import CardImage from './card-image';
import CardPrimary from './card-primary';
import CardActions from './card-actions';

const HorizontalCardLayout = ( {
	cardIndex,
	contentLayout,
	title,
	displayTitle,
	subTitle,
	displaySubTitle,
	imageSourceUrl,
	imageEditMode,
	displayImage,
	buttonActionText,
	buttonActionUrl,
	buttonActionNewTab,
	buttonActionNoFollow,
	displayActions,
	outlined,
	cornerRadius,
	setter,
} ) => {
	const cardPrimaryProps = {
		title,
		displayTitle,
		subTitle,
		displaySubTitle,
		cardIndex,
		setter,
	};

	const cardImageProps = {
		imageSourceUrl,
		imageEditMode,
		contentLayout,
		displayImage,
		type: 'square',
		cardPrimaryProps,
		cardIndex,
		setter,
	};

	return (
		<div
			className={ classnames(
				'mdc-card',
				{ 'mdc-card--outlined': outlined },
				'mtb-card',
				'mtb-card__list',
				'mtb-basic'
			) }
			style={ {
				...( cornerRadius !== undefined
					? { borderRadius: `${ cornerRadius }px` }
					: {} ),
			} }
		>
			<div
				className="mdc-card__primary-action mtb-card__primary-action"
				tabIndex={ 0 }
			>
				{ displayImage && <CardImage { ...cardImageProps } /> }
				<CardPrimary { ...cardPrimaryProps } />
			</div>
			{ displayActions && (
				<CardActions
					buttonActionText={ buttonActionText }
					buttonActionUrl={ buttonActionUrl }
					buttonActionNewTab={ buttonActionNewTab }
					buttonActionNoFollow={ buttonActionNoFollow }
					cardIndex={ cardIndex }
					setter={ setter }
				/>
			) }
		</div>
	);
};

export default HorizontalCardLayout;
