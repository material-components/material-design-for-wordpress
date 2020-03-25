/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import edit from './edit';
import save from './save';

export const name = 'material/card-primary';

/**
 * @type {{edit: *, icon: (function(): *), description: string, title: string, category: string}}
 */
export const settings = {
	title: __( 'Card Primary', 'material-theme-builder' ),
	description: __(
		'Provide an area to add the main card body to the Card Block.',
		'material-theme-builder'
	),
	category: 'material',
	parent: [ 'material/card' ],
	supports: {
		multiple: false,
	},
	attributes: {},
	edit,
	save,
};
