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
	description: __(
		'Buttons allow users to take actions, and make choices, with a single tap.',
		'material-theme-builder'
	),
	category: 'material',
	icon: <i className="material-icons md-call-to-action">call_to_action</i>,
	attributes: {
		label: {
			type: 'string',
			default: __( 'BUTTON LABEL', 'material-theme-builder' ),
		},
		type: {
			type: 'string',
			default: 'text',
		},
		style: {
			type: 'string',
			default: 'text',
		},
		iconPosition: {
			type: 'string',
			default: 'leading',
		},
		cornerRadius: {
			type: 'number',
		},
		url: {
			type: 'string',
			default: '',
		},
		rel: {
			type: 'string',
			default: '',
		},
		linkTarget: {
			type: 'string',
		},
		icon: { type: 'object' },
		backgroundColor: { type: 'string' },
		textColor: { type: 'string' },
		isSubmit: {
			type: 'boolean',
			default: false,
		},
	},
	edit,
	save,
};
