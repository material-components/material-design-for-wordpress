/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import edit from './edit';

export const name = 'material/hand-picked-posts';

/**
 * @type {{edit: *, icon: (function(): *), description: string, title: string, category: string, supports: Object}}
 */
export const settings = {
	title: __( 'Hand-Picked Posts (Material)', 'material-theme-builder' ),
	description: __(
		'Display a list of your hand-picked posts.',
		'material-theme-builder'
	),
	category: 'material',
	keywords: [ __( 'Material Card', 'material-theme-builder' ) ],
	supports: {
		align: [ 'wide', 'full' ],
	},
	icon: <i className="material-icons-outlined">library_books</i>,
	example: {
		attributes: {
			preview: true,
		},
	},
	edit,
};
