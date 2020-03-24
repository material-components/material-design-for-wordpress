/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import edit from './edit';

export const name = 'material/card-actions';

/**
 * @type {{edit: *, icon: (function(): *), description: string, title: string, category: string}}
 */
export const settings = {
	title: __( 'Card Actions', 'material-theme-builder' ),
	description: __(
		'Provide an area to add a actions to the Card Block.',
		'material-theme-builder'
	),
	category: 'material',
	parent: [ 'material/card' ],
	supports: {
		multiple: false,
	},
	attributes: {},
	edit,
};
