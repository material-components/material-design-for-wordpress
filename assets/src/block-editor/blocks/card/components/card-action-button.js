/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { RichText } from '@wordpress/block-editor';
import ToolbarUrlInputPopover from '../../../components/toolbar-url-input-popover';

/**
 * Card Action Button component.
 *
 * @param {Object} props - Component properties.
 * @param {string} props.label - Button label.
 * @param {Function} props.onChangeLabel - Button label change handler.
 * @param {string} props.url - Button url.
 * @param {Function} props.onChangeUrl - Button url change handler
 * @param {boolean} props.newTab - Whether or not the button url should open in a new tab.
 * @param {Function} props.onChangeNewTab - Button new tab toggle handler.
 * @param {boolean} props.noFollow - Whether or not the button url rel property should be noFollow.
 * @param {Function} props.onChangeNoFollow - Button no follow toggle handler.
 * @param {boolean} props.disableSuggestions. - Whether or not the url input suggestion is enabled or not.
 * @param {Function} props.onPopupClose. - Url input popup close handler.
 * @param {Function} props.onPopupFocusOutside. - Url input popup focus outside handler.
 * @param {boolean} props.isFocused. - Whether or not the button is focused.
 * @param {boolean} props.isEditMode - Whether or not the edit mode is enabled.
 *
 * @return {Function} Function returning the HTML markup for the component.
 */
const CardActionButton = ( {
	label,
	onChangeLabel = () => {},
	onPopupFocusOutside = () => {},
	onChangeUrl = () => {},
	onChangeNewTab = () => {},
	url,
	newTab,
	noFollow,
	isFocused = false,
	isEditMode,
} ) => {
	let rel;
	if ( url && newTab ) {
		rel = 'noopener noreferrer';
		if ( noFollow ) {
			rel += ' nofollow';
		}
	}

	return (
		<>
			{ isEditMode ? (
				<button className="mdc-button mdc-card__action mdc-card__action--button">
					<RichText
						tagName="div"
						value={ label }
						onChange={ onChangeLabel }
						placeholder={ __( 'Button', 'material-theme-builder' ) }
					/>
				</button>
			) : (
				<a
					href={ url || '#' }
					rel={ rel }
					target={ url && newTab ? '_blank' : undefined }
					className="mdc-button mdc-card__action mdc-card__action--button"
				>
					<div className="mdc-button__ripple"></div>
					<span className="mdc-button__label">{ label }</span>
				</a>
			) }
			{ isFocused && isEditMode && (
				<>
					<ToolbarUrlInputPopover
						url={ url }
						setURL={ onChangeUrl }
						isSelected={ true }
						opensInNewTab={ newTab }
						onChangeNewTab={ onChangeNewTab }
						onFocusOutside={ onPopupFocusOutside }
					/>
				</>
			) }
		</>
	);
};

export default CardActionButton;
