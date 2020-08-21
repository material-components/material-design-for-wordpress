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
import { example } from './example';

const { name } = metadata;

export { metadata, name };

/**
 * @type {{edit: *, icon: (function(): *), description: string, title: string, category: string}}
 */
export const settings = {
	title: __( 'Data Table (Material)', 'material-theme-builder' ),
	description: __(
		'Data tables display sets of data across rows and columns.',
		'material-theme-builder'
	),
	keywords: [ __( 'Material Data Table', 'material-theme-builder' ) ],
	icon: <i className="material-icons-outlined">grid_on</i>,
	edit,
	save,
	example,
};
