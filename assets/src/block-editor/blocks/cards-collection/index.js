/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import edit from './edit';
import save from './save';
import { example } from './example';
import metadata from './block.json';

const { name } = metadata;

export { metadata, name };

/**
 * @type {{edit: *, icon: (function(): *), description: string, title: string, category: string}}
 */
export const settings = {
	...metadata,
	title: __( 'Cards Collection (Material)', 'material-theme-builder' ),
	description: __(
		'Add a group of cards to display content and actions on multiple topics.',
		'material-theme-builder'
	),
	keywords: [ __( 'Material Cards Collection', 'material-theme-builder' ) ],
	icon: <i className="material-icons-outlined">dashboard</i>,
	edit,
	save,
	example,
};
