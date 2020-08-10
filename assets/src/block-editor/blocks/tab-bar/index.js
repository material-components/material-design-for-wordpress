/**
 * Internal dependencies
 */
import edit from './edit';
import save from './save';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

export const name = 'material/tab-bar';

export const settings = {
	title: __( 'Tabs (Material)', 'material-theme-builder' ),
	description: __(
		'Organize and allow navigation between related groups of content.',
		'material-theme-builder'
	),
	category: 'material',
	keywords: [
		__( 'Material Tabs', 'material-theme-builder' ),
		__( 'Material Tabs', 'material-theme-builder' ),
	],
	icon: <i className="material-icons-outlined">tab</i>,
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
			default: [],
		},
		preview: {
			type: 'boolean',
			default: false,
		},
	},
	supports: {
		align: [ 'wide', 'full' ],
	},
	edit,
	save,
	example: {
		attributes: {
			preview: true,
		},
	},
};
