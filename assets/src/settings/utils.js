/**
 * External dependencies
 */
import apiFetch from '@wordpress/api-fetch';

/**
 * Internal dependencies
 */
import { UPDATERS } from './constants';
import getConfig from '../admin/get-config';

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
		return updateIcons();
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
	return new Promise( ( resolve, reject ) => {
		apiFetch( {
			path: getConfig( 'assetsRestPath' ) + 'retrieve-icons/force',
			method: 'GET',
			headers: {
				'X-WP-Nonce': getConfig( 'nonce' ),
			},
		} )
			.then( resolve )
			.catch( reject );
	} );
};
