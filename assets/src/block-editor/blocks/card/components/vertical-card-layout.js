/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import CardImage from './card-image';
import CardPrimary from './card-primary';
import CardSupportingText from './card-supporting-text';
import CardActions from './card-actions';

const VerticalCardLayout = ( {
	cardIndex,
	contentLayout,
	title,
	displayTitle,
	secondaryText,
	displaySecondaryText,
	imageSourceUrl,
	imageEditMode,
	displayImage,
	supportingText,
	displaySupportingText,
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
		type: '16-9',
		cardPrimaryProps,
		cardIndex,
		setter,
		isEditMode,
	};

	return (
		<div
			className={ classnames( 'mdc-card', 'mtb-card', {
				'mdc-card--outlined': outlined,
			} ) }
			style={ {
				...( cornerRadius !== undefined
					? { borderRadius: `${ cornerRadius }px` }
					: {} ),
			} }
		>
			<div
				className="mdc-card__primary-action mtb-card__primary-action mdc-ripple-upgraded"
				tabIndex={ 0 }
			>
				{ contentLayout === 'text-above-media' && (
					<CardPrimary { ...cardPrimaryProps } />
				) }

				{ contentLayout === 'text-over-media' &&
					displayImage &&
					! imageSourceUrl && <CardPrimary { ...cardPrimaryProps } /> }

				{ contentLayout === 'text-over-media' && ! displayImage && (
					<CardPrimary { ...cardPrimaryProps } />
				) }

				{ displayImage && <CardImage { ...cardImageProps } /> }

				{ contentLayout === 'text-under-media' && (
					<CardPrimary { ...cardPrimaryProps } />
				) }

				{ displaySupportingText && (
					<CardSupportingText
						supportingText={ supportingText }
						contentLayout={ contentLayout }
						cardIndex={ cardIndex }
						setter={ setter }
						isEditMode={ isEditMode }
					/>
				) }
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

export default VerticalCardLayout;
