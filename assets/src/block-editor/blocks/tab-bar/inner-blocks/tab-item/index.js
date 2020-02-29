/**
 * Internal dependencies
 */
import edit from './edit';
import save from './save';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

export const name = 'tab-item';

export const settings = {
	title: __( 'Tab Item', 'material-theme-builder' ),
	category: 'material',
	icon: <i className="material-icons">tab</i>,
	parent: [ 'material/tab-bar' ],
	attributes: {
		id: {
			type: 'string',
		},
		label: {
			type: 'string',
			default: 'Tab',
		},
		content: {
			type: 'string',
		},
		iconPosition: {
			type: 'string',
			default: 'none',
		},
		icon: {
			type: 'object',
		},
	},
	supports: {
		inserter: false,
		alignWide: false,
	},
	edit,
	save,
};
