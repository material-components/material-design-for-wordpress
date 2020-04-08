/**
 * Internal dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { RichText } from '@wordpress/block-editor';

/**
 * Card Supporting Text Component.
 *
 * @param {Object} props - Component props.
 * @param {string} props.supportingText - Supporting text.
 * @param {string} props.contentLayout - Content layout.
 * @param {number} props.cardIndex - Card index.
 * @param {Function} props.setter - Block attribute setter.
 * @param {boolean} props.isEditMode - Whether or not the edit mode is enabled.
 *
 * @return {Function} Function returning the HTML markup for the component.
 */
const CardSupportingText = ( {
	supportingText,
	contentLayout,
	cardIndex,
	setter,
	isEditMode,
} ) => (
	<>
		{ isEditMode ? (
			<RichText
				tagName="div"
				className={ classnames(
					'mtb-card__secondary',
					`single-post-card__secondary-${ contentLayout }`,
					'mdc-typography',
					'mdc-typography--body2'
				) }
				value={ supportingText }
				onChange={ value => setter( 'supportingText', value, cardIndex ) }
				placeholder={ __( 'Supporting text', 'material-theme-builder' ) }
			/>
		) : (
			<div
				className={ classnames(
					'mtb-card__secondary',
					`single-post-card__secondary-${ contentLayout }`,
					'mdc-typography',
					'mdc-typography--body2'
				) }
			>
				{ supportingText }
			</div>
		) }
	</>
);

export default CardSupportingText;
