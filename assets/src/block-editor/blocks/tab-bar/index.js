/**
 * Internal dependencies
 */
import edit from './edit';
import save from './save';
import { TabSchema } from './components/tab';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

export const name = 'material/tab-bar';

export const settings = {
	title: __( 'Tab Bar', 'material-theme-builder' ),
	description: __(
		'Organize and allow navigation between related groups of content.',
		'material-theme-builder'
	),
	category: 'material',
	icon: <i className="material-icons">face</i>,
	attributes: {
		forceUpdate: {
			type: 'boolean',
			default: true,
		},
		iconPosition: {
			type: 'string',
			default: 'none',
		},
		tabs: {
			type: 'array',
			default: [
				new TabSchema( {
					position: 1,
					label: __( 'Tab 1', 'material-theme-builder' ),
				} ),
				new TabSchema( {
					position: 2,
					label: __( 'Tab 2', 'material-theme-builder' ),
				} ),
			],
		},
	},
	edit,
	save,
};
