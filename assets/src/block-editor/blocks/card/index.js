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
	title: __( 'Custom Card (Material)', 'material-theme-builder' ),
	description: __(
		'Display content and actions on a single topic.',
		'material-theme-builder'
	),
	keywords: [ __( 'Material Card', 'material-theme-builder' ) ],
	icon: <i className="material-icons-outlined">chrome_reader_mode</i>,
	example,
	edit,
	save,
};
