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
		activeTab: {
			type: 'string',
			default: 1,
		},
		tabs: {
			type: 'array',
			default: [
				{
					id: 1,
					label: 'Tab 1',
					active: true,
					icon: null,
				},
				{
					id: 2,
					label: 'Tab 2',
					active: false,
					icon: null,
				},
			],
		},
	},
	edit,
	save,
};
