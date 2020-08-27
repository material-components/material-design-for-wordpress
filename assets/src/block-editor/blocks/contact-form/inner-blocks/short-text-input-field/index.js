/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import BlockIcon from './block-icon';
import edit from '../common/components/text-input-edit';
import save from '../common/components/text-input-save';

export const name = 'material/short-text-input-field';

export const settings = {
	title: __( 'Short text', 'material-theme-builder' ),
	description: __(
		'A single-line input field for people to add a shorter response.',
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
			default: 'text',
		},
		inputRole: {
			type: 'string',
			default: 'short-text',
		},
		label: {
			type: 'string',
			default: __( 'Short text', 'material-theme-builder' ),
		},
		inputValue: {
			type: 'string',
		},
		isRequired: {
			type: 'boolean',
			default: false,
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
