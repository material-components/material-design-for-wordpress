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

const HorizontalCardLayout = ( {
	cardIndex,
	contentLayout,
	title,
	displayTitle,
	secondaryText,
	displaySecondaryText,
	imageSourceUrl,
	imageEditMode,
	displayImage,
	primaryActionButtonLabel,
	primaryActionButtonUrl,
	primaryActionButtonNewTab,
	primaryActionButtonNoFollow,
	secondaryActionButtonLabel,
	secondaryActionButtonUrl,
	secondaryActionButtonNewTab,
	secondaryActionButtonNoFollow,
	displaySecondaryActionButton,
	displayActions,
	outlined,
	cornerRadius,
	setter,
	isEditMode,
} ) => {
	const cardPrimaryProps = {
		title,
		displayTitle,
		secondaryText,
		displaySecondaryText,
		cardIndex,
		setter,
		isEditMode,
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
		isEditMode,
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
					primaryActionButtonLabel={ primaryActionButtonLabel }
					primaryActionButtonUrl={ primaryActionButtonUrl }
					primaryActionButtonNewTab={ primaryActionButtonNewTab }
					primaryActionButtonNoFollow={ primaryActionButtonNoFollow }
					secondaryActionButtonLabel={ secondaryActionButtonLabel }
					secondaryActionButtonUrl={ secondaryActionButtonUrl }
					secondaryActionButtonNewTab={ secondaryActionButtonNewTab }
					secondaryActionButtonNoFollow={ secondaryActionButtonNoFollow }
					displaySecondaryActionButton={ displaySecondaryActionButton }
					cardIndex={ cardIndex }
					setter={ setter }
					isEditMode={ isEditMode }
				/>
			) }
		</div>
	);
};

export default HorizontalCardLayout;
