/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { RichText } from '@wordpress/block-editor';

/**
 * Card Primary Component.
 *
 * @param {Object} props - Component props.
 * @param {boolean} props.displayTitle - Whether or not to display the title.
 * @param {string} props.title - Title.
 * @param {boolean} props.displaySubTitle - Whether or not to display the subtitle.
 * @param {string} props.subTitle - SubTitle.
 * @param {Function} props.setter - Block attribute setter.
 *
 * @return {Function} Function returning the HTML markup for the component.
 */
const CardPrimary = ( {
	displayTitle,
	title,
	displaySubTitle,
	subTitle,
	setter,
} ) => (
	<div className="mtb-card__primary">
		{ displayTitle && (
			<RichText
				tagName="h2"
				className="mtb-card__title mdc-typography mdc-typography--headline6"
				value={ title }
				onChange={ setter( 'title' ) }
				placeholder={ __(
					'Enter the card title here.',
					'material-theme-builder'
				) }
				place
			/>
		) }
		{ displaySubTitle && (
			<RichText
				tagName="h3"
				className="mtb-card__subtitle mdc-typography mdc-typography--subtitle2"
				value={ subTitle }
				onChange={ setter( 'subTitle' ) }
				placeholder={ __(
					'Enter the card subtitle here.',
					'material-theme-builder'
				) }
			/>
		) }
	</div>
);

export default CardPrimary;
