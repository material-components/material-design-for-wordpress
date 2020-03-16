/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import BlockIcon from './components/block-icon';
import edit from './edit';
import save from './save';

export const name = 'material/image-list';

/**
 * @type {{edit: *, icon: (function(): *), description: string, title: string, category: string}}
 */
export const settings = {
	title: __( 'Image List', 'material-theme-builder' ),
	description: __( 'Image List description.', 'material-theme-builder' ),
	category: 'material',
	supports: {
		align: true,
	},
	icon: BlockIcon,
	edit,
	save,
};
