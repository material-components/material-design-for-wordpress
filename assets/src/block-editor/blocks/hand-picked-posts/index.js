/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import edit from './edit';
import metadata from './block.json';

const { name } = metadata;

export { metadata, name };

/**
 * @type {{edit: *, icon: (function(): *), description: string, title: string, category: string, supports: Object}}
 */
export const settings = {
	title: __( 'Hand-Picked Posts (Material)', 'material-theme-builder' ),
	description: __(
		'Display a list of your hand-picked posts.',
		'material-theme-builder'
	),
	keywords: [ __( 'Material Card', 'material-theme-builder' ) ],
	icon: <i className="material-icons-outlined">library_books</i>,
	example: {
		attributes: {
			preview: true,
		},
	},
	edit,
};
