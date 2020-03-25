/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { RichText } from '@wordpress/block-editor';
import { TextControl } from '@wordpress/components';

/**
 * Card Actions Component.
 *
 * @param {Object} props - Component props.
 * @param {string} props.buttonActionText - Button action text.
 * @param {string} props.buttonActionUrl - Button action URL.
 * @param {boolean} props.isSelected - Whether or not the block is selected.
 * @param {Function} props.setter - Block attribute setter.
 *
 * @return {Function} Function returning the HTML markup for the component.
 */
const CardActions = ( {
	buttonActionText,
	buttonActionUrl,
	isSelected,
	setter,
} ) => {
	return (
		<>
			<div className="mdc-card__actions">
				<div className="mdc-card__action-buttons">
					<button className="mdc-button mdc-card__action mdc-card__action--button">
						<span className="mdc-button__ripple"></span>
						<RichText
							tagName="div"
							value={ buttonActionText }
							onChange={ setter( 'buttonActionText' ) }
							placeholder={ __( 'Action text here', 'material-theme-builder' ) }
						/>
					</button>
				</div>
			</div>
			{ isSelected && (
				<TextControl
					value={ buttonActionUrl }
					label={ __( 'Link', 'material-theme-builder' ) }
					placeholder={ __( 'Paste your URL...', 'material-theme-builder' ) }
					onChange={ setter( 'buttonActionUrl' ) }
					className="components-base-control wp-block-button__inline-link"
				/>
			) }
		</>
	);
};

export default CardActions;
