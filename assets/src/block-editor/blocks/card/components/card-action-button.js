/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { RichText } from '@wordpress/block-editor';
import UrlInputPopover from '../../../components/url-input-popover';

/**
 * Card action button.
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
 *
 * @return {Function} Function returning the HTML markup for the component.
 */
const CardActionButton = ( {
	label,
	onChangeLabel,
	url,
	onChangeUrl,
	newTab,
	onChangeNewTab,
	noFollow,
	onChangeNoFollow,
	disableSuggestions = false,
	onPopupClose,
	onPopupFocusOutside,
	isFocused = false,
} ) => {
	return (
		<>
			<button className="mdc-button mdc-card__action mdc-card__action--button">
				<span className="mdc-button__ripple"></span>
				<RichText
					tagName="div"
					value={ label }
					onChange={ onChangeLabel }
					placeholder={ __( 'Button text', 'material-theme-builder' ) }
				/>
			</button>
			{ isFocused && (
				<UrlInputPopover
					onFocusOutside={ onPopupFocusOutside }
					value={ url }
					onChange={ onChangeUrl }
					newTab={ newTab }
					noFollow={ noFollow }
					onChangeNewTab={ onChangeNewTab }
					onChangeNoFollow={ onChangeNoFollow }
					onPopupClose={ onPopupClose }
					disableSuggestions={ disableSuggestions }
				/>
			) }
		</>
	);
};

export default CardActionButton;
