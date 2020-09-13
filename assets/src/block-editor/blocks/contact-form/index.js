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

export const settings = {
	...metadata,
	keywords: [ __( 'Material Contact Form', 'material-theme-builder' ) ],
	icon: <i className="material-icons-outlined">mail</i>,
	edit,
	save,
};
