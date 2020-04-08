/**
 * Internal dependencies
 */
import './stlye.css';
import VerticalCardLayout from './components/vertical-card-layout';
import HorizontalCardLayout from './components/horizontal-card-layout';

/**
 * Card Save component.
 *
 * @param {Object} props - Component props.
 * @param {Object} props.attributes - Block attributes.
 * @param {string} props.className - Block classes.
 *
 * @return {Function} Function returning the HTML markup for the component.
 */
const Save = ( { attributes, className } ) => {
	const {
		cardLayout = 'vertical',
		contentLayout,
		title,
		displayTitle,
		secondaryText,
		displaySecondaryText,
		imageSourceUrl,
		isImageEditMode,
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
		displayActions,
		displaySecondaryActionButton,
		outlined,
		cornerRadius,
	} = attributes;

	const cardIndex = 0;

	const setter = () => {};

	const cardProps = {
		cardIndex,
		contentLayout,
		title,
		displayTitle,
		secondaryText,
		displaySecondaryText,
		imageSourceUrl,
		isImageEditMode,
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
		displayActions,
		displaySecondaryActionButton,
		outlined,
		cornerRadius,
		setter,
		isEditMode: false,
	};

	return (
		<div className={ className }>
			{ cardLayout === 'vertical' && <VerticalCardLayout { ...cardProps } /> }
			{ cardLayout === 'horizontal' && (
				<HorizontalCardLayout { ...cardProps } />
			) }
		</div>
	);
};

export default Save;
