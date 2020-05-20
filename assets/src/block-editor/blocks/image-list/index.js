/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import edit from './edit';
import save from './save';

export const name = 'material/image-list';

/**
 * @type {{edit: *, icon: (function(): *), description: string, title: string, category: string}}
 */
export const settings = {
	title: __( 'Material Gallery', 'material-theme-builder' ),
	description: __(
		'Image lists display a collection of images in an organized grid.',
		'material-theme-builder'
	),
	category: 'material',
	keywords: [ __( 'Material Image List', 'material-theme-builder' ) ],
	supports: {
		align: true,
	},
	icon: <i className="material-icons-outlined">filter</i>,
	edit,
	save,
};
