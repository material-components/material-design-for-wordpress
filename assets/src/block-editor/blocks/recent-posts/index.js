/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import edit from './edit';

export const name = 'material/recent-posts';

/**
 * @type {{edit: *, icon: (function(): *), description: string, title: string, category: string}}
 */
export const settings = {
	title: __( 'Recent Posts Cards', 'material-theme-builder' ),
	description: __(
		'Display a list of your most recent posts.',
		'material-theme-builder'
	),
	category: 'material',
	keywords: [ __( 'Material Card', 'material-theme-builder' ) ],
	supports: {
		align: [ 'wide', 'full' ],
	},
	icon: <i className="material-icons-outlined">description</i>,
	edit,
};
