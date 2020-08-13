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
import transforms from './transforms';
import { example } from './example';

const { name } = metadata;

export { metadata, name };

/**
 * @type {{edit: *, icon: (function(): *), description: string, title: string, category: string}}
 */
export const settings = {
	title: __( 'Gallery (Material)', 'material-theme-builder' ),
	description: __(
		'Image lists display a collection of images in an organized grid.',
		'material-theme-builder'
	),
	icon: <i className="material-icons-outlined">filter</i>,
	edit,
	save,
	example,
	transforms,
};
