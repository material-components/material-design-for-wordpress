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

export const name = 'material/name-input-field';

export const settings = {
	title: __( 'Name', 'material-theme-builder' ),
	description: __(
		'Introductions are important. Add an input for folks to add their name.',
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
		label: {
			type: 'string',
			default: __( 'Name', 'material-theme-builder' ),
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
