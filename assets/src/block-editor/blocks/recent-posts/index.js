import edit from './edit';
import save from './save';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

export const name = 'material/recent-posts';

export const settings = {
	title: __( 'Recent Posts', 'material-theme-builder' ),
	description: __(
		'Recent Posts Block description goes here.',
		'material-theme-builder'
	), // @todo
	category: 'material',
	icon: <i className="material-icons md-list">list</i>,
	edit,
	save,
};
