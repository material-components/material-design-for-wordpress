/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import './style.css';
import edit from './edit';
import save from './save';

export const name = 'material/list';

export const settings = {
	title: __( 'List', 'material-theme-builder' ),
	description: __( 'List stuff in a list', 'material-theme-builder' ),
	category: 'material',
	icon: <i className="material-icons">list</i>,
	edit,
	save,
};
