/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import BlockIcon from './components/block-icon';

/**
 * Internal dependencies
 */
import edit from './edit';

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
		align: [ 'wide', 'full' ],
	},
	icon: BlockIcon,
	edit,
};
