/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import getConfig from '../admin/get-config';

export const ACTIONS = {
	ERROR: 'ERROR',
	TOGGLE_UPDATES: 'TOGGLE_UPDATES',
	REMOVE_API_KEY: 'REMOVE_API_KEY',
	ADD_API_KEY: 'ADD_API_KEY',
	SET_UPDATED: 'SET_UPDATED',
};

export const UPDATERS = {
	FONTS: {
		title: __( 'Google Fonts', 'material-design' ),
		type: 'FONTS',
		lastUpdated: parseInt( getConfig( 'fontsLastUpdated' ), 10 ),
		needsKey: true,
		updateAvailable: false,
	},
	ICONS: {
		title: __( 'Material Icons', 'material-design' ),
		type: 'ICONS',
		lastUpdated: parseInt( getConfig( 'iconsLastUpdated' ), 10 ),
		needsKey: false,
		updateAvailable: true,
	},
};

export const KEY_PLACEHOLDER = '•••••••••••••••••••••••••••••';
