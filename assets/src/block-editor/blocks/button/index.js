/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import edit from './edit';
import save from './save';

export const name = 'material/button';

export const settings = {
	title: __( 'Button', 'material-theme-builder' ),
	description: __( 'Button description goes here.', 'material-theme-builder' ), // @todo
	category: 'material',
	icon: <i className="material-icons md-call-to-action">call_to_action</i>,
	attributes: {
		icon: {
			type: 'string',
		},
	},
	edit,
	save,
};
