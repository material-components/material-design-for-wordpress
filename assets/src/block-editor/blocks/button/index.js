import edit from './edit';
import save from './save';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
const icon = 'button';

export const name = 'material/button';

export const settings = {
	title: __( 'Button', 'material-theme-builder' ),
	description: __( 'Button description goes here.', 'material-theme-builder' ), // @todo
	category: 'material',
	icon,
	edit,
	save,
};
