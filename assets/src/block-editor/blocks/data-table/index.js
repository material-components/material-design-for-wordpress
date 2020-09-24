/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import edit from './edit';
import save from './save';
import metadata from './block.json';

const { name } = metadata;

export { metadata, name };

/**
 * @type {{edit: *, icon: (function(): *), description: string, title: string, category: string}}
 */
export const settings = {
	keywords: [ __( 'Material Data Table', 'material-theme-builder' ) ],
	title: __( 'Material Data Table', 'material-theme-builder' ),
	icon: <i className="material-icons-outlined">grid_on</i>,
	edit,
	save,
};
