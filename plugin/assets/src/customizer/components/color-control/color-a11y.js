/**
 * WordPress dependencies
 */
import { __, sprintf } from '@wordpress/i18n';
import { uniqueId } from 'lodash';

const api = window.wp.customize;

/**
 * Internal dependencies
 */
import colorUtils from '../../../common/color-utils';

const ColorA11y = ( { selectedColor, params } ) => {
	const colors = [];
	const textColorLabel = params.a11yLabel || '';
	const { relatedSetting, relatedTextSetting } = params;
	let color;
	let textColor;
	let isText = true;

	if ( relatedTextSetting && api( relatedTextSetting ) ) {
		color = selectedColor;
		textColor = api( relatedTextSetting ).get();
		isText = false;
	} else if ( relatedSetting && api( relatedSetting ) ) {
		textColor = selectedColor;
		color = api( relatedSetting ).get();
	}

	const colorRange = colorUtils.getColorRangeFromHex( color );

	const colorRanges = [
		{
			color,
			name: params.label,
		},
		{
			color: colorRange.light.hex,
			name: __( 'Light variation', 'material-design' ),
		},
		{
			color: colorRange.dark.hex,
			name: __( 'Dark variation', 'material-design' ),
		},
	];

	colorRanges.forEach( ( { color: colorHex, name }, i ) => {
		// For text color ignore light and dark variations.
		if ( isText && 0 !== i ) {
			return;
		}

		if ( ! colorHex || ! textColor ) {
			return;
		}

		colors.push(
			colorUtils.getColorAccessibility(
				colorHex,
				name,
				textColor,
				textColorLabel
			)
		);
	} );

	return (
		<div className="material-design-accessibility">
			<div className="material-color-accessibility">
				{ /* eslint-disable-next-line jsx-a11y/label-has-for */ }
				<label>{ __( 'Current Scheme', 'material-design' ) }</label>
				<div className="material-color-accessibility-inner">
					{ colors.map( colorObject => (
						<ColorItem
							key={ uniqueId( 'color-' ) }
							{ ...colorObject }
						/>
					) ) }
				</div>
			</div>
		</div>
	);
};

const ColorItem = ( { type, hex, variations } ) => {
	return (
		<div className="material-color-accessibility-row">
			<div className="material-color-accessibility-color">
				<span style={ { backgroundColor: hex } }></span>{ ' ' }
				<strong>{ type }</strong>
			</div>

			{ variations.map( variation => (
				<ColorVariation
					key={ uniqueId( 'variation-' ) }
					{ ...variation }
				/>
			) ) }
		</div>
	);
};

const ColorVariation = ( {
	size,
	result,
	textColor,
	colorHex,
	textColorHex,
} ) => {
	if ( null !== result ) {
		return null;
	}

	return (
		<>
			{
				// translators: %s is size of the color variation.
				sprintf( __( '%s text: ', 'material-design' ), size )
			}
			{ textColor }
			{ __( ' text not legible ', 'material-design' ) }
			<span style={ { backgroundColor: colorHex, color: textColorHex } }>
				{ __( 'Aa', 'material-design' ) }
			</span>
			<span className="dashicons dashicons-warning"></span>
			<br />
		</>
	);
};

export default ColorA11y;
