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

export const name = 'material/website-input-field';

export const settings = {
	title: __( 'Website', 'material-theme-builder' ),
	description: __(
		'An input field for people to add their website URL.',
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
			default: 'url',
		},
		inputRole: {
			type: 'string',
			default: 'website',
		},
		label: {
			type: 'string',
			default: __( 'Website', 'material-theme-builder' ),
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
