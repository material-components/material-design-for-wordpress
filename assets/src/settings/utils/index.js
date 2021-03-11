import { UPDATERS } from '../constants';

/**
 * Handles each kind of update
 *
 * @param {*} type Item to update
 */
export const update = type => {
	if ( type === UPDATERS.FONTS.type ) {
		updateFonts();
	}

	if ( type === UPDATERS.ICONS.type ) {
		updateIcons();
	}
};

/**
 * Update fonts.
 */
const updateFonts = () => {
	console.log( 'updating fonts' );
};

/**
 * Update icons.
 */
const updateIcons = () => {
	console.log( 'updating icons' );
};
