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
 * @param {Function} props.setter - Block attribute setter.
 *
 * @return {Function} Function returning the HTML markup for the component.
 */
const CardActions = ( {
	buttonActionText,
	buttonActionUrl,
	buttonActionNewTab,
	buttonActionNoFollow,
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
							onChange={ setter( 'buttonActionText' ) }
							placeholder={ __( 'Action text here', 'material-theme-builder' ) }
						/>
					</button>
					{ showUrlInput && (
						<UrlInputPopover
							value={ buttonActionUrl }
							onChange={ setter( 'buttonActionUrl' ) }
							newTab={ buttonActionNewTab }
							noFollow={ buttonActionNoFollow }
							onChangeNewTab={ setter( 'buttonActionNewTab' ) }
							onChangeNoFollow={ setter( 'buttonActionNoFollow' ) }
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
