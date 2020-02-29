/**
 * Internal dependencies
 */
import edit from './edit';
import save from './save';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

export const name = 'tab-bar';

export const settings = {
	title: __( 'Tab Bar', 'material-theme-builder' ),
	description: __(
		'Organize and allow navigation between related groups of content.',
		'material-theme-builder'
	),
	category: 'material',
	icon: <i className="material-icons">face</i>,
	attributes: {
		iconPosition: {
			type: 'string',
			default: 'none',
		},
		tabs: {
			type: 'array',
			default: [
				{
					id: 1,
					position: 1,
					label: __( 'Tab 1', 'material-theme-builder' ),
					active: true,
					icon: null,
					content: null,
				},
				{
					id: 2,
					position: 2,
					label: __( 'Tab 2', 'material-theme-builder' ),
					active: false,
					icon: null,
					content: null,
				},
			],
		},
	},
	edit,
	save,
};
