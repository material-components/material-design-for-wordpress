/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import edit from './edit';
import BlockIcon from './components/block-icon';

export const name = 'material/hand-picked-posts';

/**
 * @type {{edit: *, icon: (function(): *), description: string, title: string, category: string, supports: Object}}
 */
export const settings = {
	title: __( 'Hand-picked Posts', 'material-theme-builder' ),
	description: __(
		'Display a list of your hand-picked posts.',
		'material-theme-builder'
	),
	category: 'material',
	supports: {
		align: true,
	},
	icon: BlockIcon,
	edit,
};
