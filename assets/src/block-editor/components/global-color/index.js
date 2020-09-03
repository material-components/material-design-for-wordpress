/**
 * WordPress dependencies
 */
import { ContrastChecker } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import { withGlobalColorDefault, getColor } from '../with-global-default';
import MaterialColorPalette from '../material-color-palette';

/**
 * Check color contrast using global color defaults as fallback.
 *
 * @param {Object} props Component props.
 * @param {string} props.textColor Color of the text.
 * @param {string} props.backgroundColor Color of background.
 * @param {string} props.textProp Global prop name for text color.
 * @param {string} props.backgroundProp Global prop name for background color.
 *
 * @return {Function} Updated component.
 */
export const GlobalColorContrastChecker = ( {
	textColor,
	backgroundColor,
	textProp,
	backgroundProp,
} ) => {
	textColor = getColor( textProp, textColor );
	backgroundColor = getColor( backgroundProp, backgroundColor );

	return (
		<ContrastChecker
			textColor={ textColor }
			backgroundColor={ backgroundColor }
		/>
	);
};

export default withGlobalColorDefault( MaterialColorPalette );
