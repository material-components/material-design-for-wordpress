/**
 * Internal dependencies
 */
import edit from './edit';
import save from './save';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

export const name = 'material/list-item';

export const settings = {
	title: __( 'List Item', 'material-theme-builder' ),
	category: 'material',
	parent: [ 'material/list' ],
	icon: <i className="material-icons">list</i>,
	supports: { inserter: false },
	attributes: {
		primaryText: {
			type: 'string',
			default: __( 'List item', 'material-theme-builder' ),
		},
		secondaryText: {
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
	edit,
	save,
};
