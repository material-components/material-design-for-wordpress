/**
 * WordPress dependencies
 */
import { __, sprintf } from '@wordpress/i18n';
import { RichText } from '@wordpress/block-editor';

/**
 * Card Primary Component.
 *
 * @param {Object} props - Component props.
 * @param {boolean} props.displayTitle - Whether or not to display the title.
 * @param {string} props.title - Title.
 * @param {boolean} props.displaySubTitle - Whether or not to display the subtitle.
 * @param {string} props.subTitle - SubTitle.
 * @param {boolean} props.cardIndex - Card Index.
 * @param {Function} props.setter - Block attribute setter.
 *
 * @return {Function} Function returning the HTML markup for the component.
 */
const CardPrimary = ( {
	displayTitle,
	title,
	displaySubTitle,
	subTitle,
	cardIndex,
	setter,
} ) => (
	<div className="mtb-card__primary">
		{ displayTitle && (
			<RichText
				tagName="h2"
				className="mtb-card__title mdc-typography mdc-typography--headline6"
				value={ title }
				onChange={ value => setter( 'title', value, cardIndex ) }
				placeholder={ sprintf(
					__( 'Enter the card #%d title here.', 'material-theme-builder' ),
					cardIndex + 1
				) }
				place
			/>
		) }
		{ displaySubTitle && (
			<RichText
				tagName="h3"
				className="mtb-card__subtitle mdc-typography mdc-typography--subtitle2"
				value={ subTitle }
				onChange={ value => setter( 'subTitle', value, cardIndex ) }
				placeholder={ sprintf(
					__( 'Enter the card #%d subtitle here.', 'material-theme-builder' ),
					cardIndex + 1
				) }
			/>
		) }
	</div>
);

export default CardPrimary;
