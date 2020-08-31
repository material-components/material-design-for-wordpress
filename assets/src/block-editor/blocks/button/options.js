/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { TextButton, IconButton } from './components/icon-types';

export const BUTTON_TYPES = [
	{
		label: __( 'Text', 'material-theme-builder' ),
		value: 'text',
		src: TextButton,
	},
	{
		label: __( 'Icon', 'material-theme-builder' ),
		value: 'icon',
		src: IconButton,
	},
];

export const BUTTON_STYLES = [
	{
		label: __( 'Text', 'material-theme-builder' ),
		value: 'text',
	},
	{
		label: __( 'Outlined', 'material-theme-builder' ),
		value: 'outlined',
	},
	{
		label: __( 'Raised', 'material-theme-builder' ),
		value: 'raised',
	},
	{
		label: __( 'Unelevated', 'material-theme-builder' ),
		value: 'unelevated',
	},
];

export const ICON_POSITIONS = [
	{
		label: __( 'None', 'material-theme-builder' ),
		value: 'none',
	},
	{
		label: __( 'Leading', 'material-theme-builder' ),
		value: 'leading',
	},
	{
		label: __( 'Trailing', 'material-theme-builder' ),
		value: 'trailing',
	},
];
