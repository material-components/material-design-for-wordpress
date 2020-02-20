import edit from './edit';
import save from './save';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

export const name = 'button';

export const settings = {
	title: __( 'Button', 'material-theme-builder' ),
	description: __( 'Button description goes here.', 'material-theme-builder' ), // @todo
	category: 'material',
	icon: <i className="material-icons md-call-to-action">call_to_action</i>,
	attributes: {
		label: { type: 'string' },
		url: { type: 'string' },
		style: { type: 'string' },
		iconPosition: { type: 'string' },
		icon: { type: 'object' },
		backgroundColor: { type: 'string' },
		textColor: { type: 'string' },
		cornerRadius: { type: 'number' },
		rel: { type: 'string' },
		linkTarget: { type: 'string' },
	},
	edit,
	save,
};
