import edit from './edit';
import save from './save';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

export const name = 'button';

export const settings = {
	title: __( 'Button', 'material-theme-builder' ),
	description: __(
		'Buttons allow users to take actions, and make choices, with a single tap.',
		'material-theme-builder'
	), // @todo
	category: 'material',
	icon: <i className="material-icons md-call-to-action">call_to_action</i>,
	attributes: {
		label: {
			type: 'string',
			default: __( 'BUTTON LABEL', 'material-theme-builder' ),
		},
		style: {
			type: 'string',
			default: 'text',
		},
		iconPosition: {
			type: 'string',
			default: 'none',
		},
		cornerRadius: {
			type: 'number',
			default: 4,
		},
		url: { type: 'string' },
		icon: { type: 'object' },
		backgroundColor: { type: 'string' },
		textColor: { type: 'string' },
		rel: { type: 'string' },
		linkTarget: { type: 'string' },
	},
	edit,
	save,
};
