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
	...metadata,
	keywords: [ __( 'Material Card', 'material-theme-builder' ) ],
	icon: <i className="material-icons-outlined">chrome_reader_mode</i>,
	example,
	edit,
	save,
};
