import edit from './edit';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import BlockIcon from './components/block-icon';

export const name = 'recent-posts';

export const settings = {
	title: __( 'Recent Posts', 'material-theme-builder' ),
	description: __(
		'Display a list of your most recent posts.',
		'material-theme-builder'
	),
	category: 'material',
	icon: BlockIcon,
	edit,
};
