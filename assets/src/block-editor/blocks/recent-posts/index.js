/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import edit from './edit';
import metadata from './block.json';
import { example } from './example';

const { name } = metadata;

export { metadata, name };

/**
 * @type {{edit: *, icon: (function(): *), description: string, title: string, category: string}}
 */
export const settings = {
	title: __( 'Recent Posts (Material)', 'material-theme-builder' ),
	description: __(
		'Display a list of your most recent posts.',
		'material-theme-builder'
	),
	keywords: [ __( 'Material Card', 'material-theme-builder' ) ],
	icon: <i className="material-icons-outlined">description</i>,
	edit,
	example,
};
