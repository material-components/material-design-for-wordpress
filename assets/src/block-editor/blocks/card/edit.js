/**
 * WordPress dependencies
 */
import { InspectorControls } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import './stlye.css';
import './editor.css';
import InspectorControlsStylePanel from './components/inspector-controls-style-panel';
import InspectorControlsContentPanel from './components/inspector-controls-content-panel';
import VerticalCardLayout from './components/vertical-card-layout';
import HorizontalCardLayout from './components/horizontal-card-layout';
/**
 * Card Edit component.
 *
 * @param {Object} props - Component props.
 *
 * @return {Function} Function returning the HTML markup for the component.
 */
const Edit = props => {
	const { attributes, setAttributes, className } = props;
	const {
		cardLayout = 'vertical',
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
	} = attributes;

	const cardIndex = 0;

	const setter = ( attributeName, attributeValue ) => {
		setAttributes( {
			[ attributeName ]: attributeValue,
		} );
	};

	const cardProps = {
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
	};

	const inspectorControlsStylePanelProps = {
		contentLayout,
		cornerRadius,
		outlined,
		isSingleCard: true,
		setter,
		cardIndex,
	};

	const inspectorControlsContentPanelProps = {
		displayTitle,
		displaySecondaryText,
		displayImage,
		displaySupportingText,
		displayActions,
		isSingleCard: true,
		setter,
		cardIndex,
	};

	return (
		<>
			<InspectorControls>
				<InspectorControlsStylePanel { ...inspectorControlsStylePanelProps } />
				<InspectorControlsContentPanel
					{ ...inspectorControlsContentPanelProps }
				/>
			</InspectorControls>
			<div className={ className }>
				{ cardLayout === 'vertical' && <VerticalCardLayout { ...cardProps } /> }
				{ cardLayout === 'horizontal' && (
					<HorizontalCardLayout { ...cardProps } />
				) }
			</div>
		</>
	);
};

export default Edit;
