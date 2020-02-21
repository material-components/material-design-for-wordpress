import { __ } from '@wordpress/i18n';
import { GridIcon, ListIcon, MasonryIcon } from './components/style-icons';

export default [
	{
		label: __( 'Masonry', 'material-theme-builder' ),
		value: 'masonry',
		src: MasonryIcon,
	},
	{
		label: __( 'List', 'material-theme-builder' ),
		value: 'list',
		src: ListIcon,
	},
	{
		label: __( 'Grid', 'material-theme-builder' ),
		value: 'grid',
		src: GridIcon,
	},
];
