/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import BlockIcon from './block-icon';
import edit from '../common/components/textarea-input-edit';
import save from '../common/components/textarea-input-save';

export const name = 'material/message-input-field';

export const settings = {
	title: __( 'Message', 'material-theme-builder' ),
	description: __(
		'Let folks speak their mind. This text box is great for longer responses.',
		'material-theme-builder'
	),
	parent: [ 'material/contact-form' ],
	category: 'material',
	icon: BlockIcon,
	attributes: {
		id: {
			type: 'string',
		},
		label: {
			type: 'string',
			default: __( 'Message', 'material-theme-builder' ),
		},
		inputValue: {
			type: 'string',
		},
		inputRole: {
			type: 'string',
			default: 'message',
		},
		isRequired: {
			type: 'boolean',
			default: true,
		},
		outlined: {
			type: 'boolean',
			default: true,
		},
		fullWidth: {
			type: 'boolean',
			default: true,
		},
		displayLabel: {
			type: 'boolean',
			default: true,
		},
	},
	edit,
	save,
};
