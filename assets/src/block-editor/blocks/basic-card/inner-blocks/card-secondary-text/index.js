/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import edit from './edit';

export const name = 'material/card-secondary-text';

/**
 * @type {{edit: *, icon: (function(): *), description: string, title: string, category: string}}
 */
export const settings = {
	title: __( 'Card Secondary Text', 'material-theme-builder' ),
	description: __(
		'Provide an area to add a secondary text in a Card Block.',
		'material-theme-builder'
	),
	category: 'material',
	parent: [ 'material/card' ],
	supports: {
		multiple: false,
	},
	attributes: {
		content: {
			type: 'string',
			default: __(
				'This is the card secondary text.',
				'material-theme-builder'
			),
		},
	},
	edit,
};
