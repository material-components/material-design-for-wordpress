/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import edit from './edit';

export const name = 'material/card-title';

/**
 * @type {{edit: *, icon: (function(): *), description: string, title: string, category: string}}
 */
export const settings = {
	title: __( 'Card Title', 'material-theme-builder' ),
	description: __(
		'Provide an area to add a title in a Card Block.',
		'material-theme-builder'
	),
	category: 'material',
	parent: [ 'material/card' ],
	supports: {
		multiple: false,
	},
	attributes: {
		title: {
			type: 'string',
			default: __( 'This is the card title.', 'material-theme-builder' ),
		},
		subTitle: {
			type: 'string',
			default: __( 'This is the card subtitle.', 'material-theme-builder' ),
		},
	},
	edit,
};
