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

export const name = 'material/telephone-input-field';

export const settings = {
	title: __( 'Telephone', 'material-theme-builder' ),
	description: __( 'Add a phone number input.', 'material-theme-builder' ),
	parent: [ 'material/contact-form' ],
	category: 'material',
	icon: BlockIcon,
	attributes: {
		id: {
			type: 'string',
		},
		inputType: {
			type: 'string',
			default: 'tel',
		},
		label: {
			type: 'string',
			default: __( 'Telephone', 'material-theme-builder' ),
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
