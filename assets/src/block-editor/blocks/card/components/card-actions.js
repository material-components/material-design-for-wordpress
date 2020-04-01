/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { RichText } from '@wordpress/block-editor';
import UrlInputPopover from '../../../components/url-input-popover';
import { useState } from '@wordpress/element';

/**
 * Card Actions Component.
 *
 * @param {Object} props - Component props.
 * @param {string} props.buttonActionText - Button action text.
 * @param {string} props.buttonActionUrl - Button action URL.
 * @param {boolean} props.buttonActionNewTab - Whether or not to open the link in a new tab.
 * @param {boolean} props.buttonActionNoFollow - Whether or not the link rel to be nofollow.
 * @param {number} props.cardIndex - Card index
 * @param {Function} props.setter - Block attribute setter.
 *
 * @return {Function} Function returning the HTML markup for the component.
 */
const CardActions = ( {
	buttonActionText,
	buttonActionUrl,
	buttonActionNewTab,
	buttonActionNoFollow,
	cardIndex,
	setter,
} ) => {
	const [ showUrlInput, setShowUrlInput ] = useState( false );

	return (
		<>
			<div className="mdc-card__actions">
				<div className="mdc-card__action-buttons">
					<button
						className="mdc-button mdc-card__action mdc-card__action--button"
						onFocus={ () => setShowUrlInput( true ) }
					>
						<span className="mdc-button__ripple"></span>
						<RichText
							tagName="div"
							value={ buttonActionText }
							onChange={ value =>
								setter( 'buttonActionText', value, cardIndex )
							}
							placeholder={ __( 'Action text here', 'material-theme-builder' ) }
						/>
					</button>
					{ showUrlInput && (
						<UrlInputPopover
							value={ buttonActionUrl }
							onChange={ value =>
								setter( 'buttonActionUrl', value, cardIndex )
							}
							newTab={ buttonActionNewTab }
							noFollow={ buttonActionNoFollow }
							onChangeNewTab={ value =>
								setter( 'buttonActionNewTab', value, cardIndex )
							}
							onChangeNoFollow={ value =>
								setter( 'buttonActionNoFollow', value, cardIndex )
							}
							onPopupClose={ () => setShowUrlInput( false ) }
							disableSuggestions={ false }
						/>
					) }
				</div>
			</div>
		</>
	);
};

export default CardActions;
