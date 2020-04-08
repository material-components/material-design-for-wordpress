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

/**
 * Vertical Card Layout component.
 *
 * @param {Object} props - Component props.
 * @param {number} props.cardIndex - Card index.
 * @param {string} props.contentLayout - Content layout.
 * @param {string} props.title - Card title.
 * @param {boolean} props.displayTitle - Whether or not to display the title.
 * @param {string} props.secondaryText - Card secondary text.
 * @param {boolean} props.displaySecondaryText - Whether or not to display the secondary text.
 * @param {string} props.imageSourceUrl - Image Source URL.
 * @param {boolean} props.imageEditMode - Image Edit mode.
 * @param {boolean} props.displayImage - Whether or not to display the image.
 * @param {string} props.supportingText - Card supporting text.
 * @param {boolean} props.displaySupportingText - PWhether or not to display the supporting text.
 * @param {string} props.primaryActionButtonLabel - Primary action button label.
 * @param {string} props.primaryActionButtonUrl - Primary action button URL.
 * @param {boolean} props.primaryActionButtonNewTab - Whether or not the primary action button url should open in a new tab.
 * @param {boolean} props.primaryActionButtonNoFollow - Whether or not the primary action button url rel property should be noFollow.
 * @param {string} props.secondaryActionButtonLabel - Secondary action button label.
 * @param {string} props.secondaryActionButtonUrl - Secondary action button URL.
 * @param {boolean} props.secondaryActionButtonNewTab - Whether or not the secondary action button url should open in a new tab.
 * @param {boolean} props.secondaryActionButtonNoFollow - Whether or not the secondary action button url rel property should be noFollow.
 * @param {boolean} props.displaySecondaryActionButton - Whether or not to show the secondary action button.
 * @param {boolean} props.displayActions - Whether or not to show the card actions row.
 * @param {boolean} props.outlined - Whether or not the card has an outlined style.
 * @param {number} props.cornerRadius - Card corner radius.
 * @param {Function} props.setter - Function to set block attributes value.
 * @param {boolean} props.isEditMode - Whether or not the block is in edit mode (inside Gutenberg editor or not).
 *
 * @return {Function} Function returning the HTML markup for the component.
 */
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
