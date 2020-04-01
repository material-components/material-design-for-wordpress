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
import Card from './components/card';
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
		contentLayout,
		title,
		displayTitle,
		subTitle,
		displaySubTitle,
		imageSourceUrl,
		imageEditMode,
		displayImage,
		secondaryText,
		displaySecondaryText,
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
		subTitle,
		displaySubTitle,
		imageSourceUrl,
		imageEditMode,
		displayImage,
		secondaryText,
		displaySecondaryText,
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
		displayTitle,
		displaySubTitle,
		displayImage,
		displaySecondaryText,
		displayActions,
		cornerRadius,
		outlined,
		isSingleCard: true,
		setter,
		cardIndex,
	};

	return (
		<>
			<InspectorControls>
				<InspectorControlsStylePanel { ...inspectorControlsStylePanelProps } />
			</InspectorControls>
			<div className={ className }>
				<Card { ...cardProps } />
			</div>
		</>
	);
};

export default Edit;
