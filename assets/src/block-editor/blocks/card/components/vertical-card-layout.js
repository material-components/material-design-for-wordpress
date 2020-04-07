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
		secondaryText,
		displaySecondaryText,
		cardIndex,
		setter,
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
					/>
				) }
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

export default VerticalCardLayout;
