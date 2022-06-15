/**
 * Internal dependencies
 */
import { ASSET_UPDATES } from '../constants';
import getConfig from '../../admin/get-config';
import { updateFonts, updateIcons, isCoreUpdate } from './promises';

/**
 * Handles each kind of update
 *
 * @param {string} type Item to update
 *
 * @return {Promise|undefined} Promise.
 */
export const update = type => {
	if ( type === ASSET_UPDATES.FONTS.type ) {
		return updateFonts();
	}

	if ( type === ASSET_UPDATES.ICONS.type ) {
		return updateIcons();
	}

	if ( isCoreUpdate( type ) ) {
		return new Promise( () => {
			window.location.href = getConfig( 'coreUpdateUrl' );
		} );
	}
};
