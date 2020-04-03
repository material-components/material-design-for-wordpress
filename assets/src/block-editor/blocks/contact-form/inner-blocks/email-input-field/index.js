/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import edit from '../common/components/text-input-edit';
import BlockIcon from './block-icon';
import save from './save';

export const name = 'material/email-input-field';

export const settings = {
	title: __( 'Email', 'material-theme-builder' ),
	description: __(
		'Want to reply to folks? Add an email address input.',
		'material-theme-builder'
	),
	parent: [ 'material/contact-form' ],
	category: 'material',
	icon: BlockIcon,
	attributes: {
		id: {
			type: 'string',
		},
		inputType: {
			type: 'string',
			default: 'email',
		},
		label: {
			type: 'string',
			default: __( 'Email', 'material-theme-builder' ),
		},
		inputValue: {
			type: 'string',
		},
		isRequired: {
			type: 'boolean',
			default: true,
		},
		outlined: {
			type: 'boolean',
			default: false,
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
