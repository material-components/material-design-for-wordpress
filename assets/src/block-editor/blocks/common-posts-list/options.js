/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { GridIcon, ListIcon, MasonryIcon } from './components/style-icons';

export const RECENT_POSTS_STYLES = [
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

export const CONTENT_LAYOUTS = [
	{
		label: __( 'Text above media', 'material-theme-builder' ),
		value: 'text-above-media',
	},
	{
		label: __( 'Text over media', 'material-theme-builder' ),
		value: 'text-over-media',
	},
	{
		label: __( 'Text under media', 'material-theme-builder' ),
		value: 'text-under-media',
	},
];

export const CATEGORIES_LIST_QUERY = {
	per_page: 100, // @todo: Implement lookup of categories using auto complete field.
};

export const MIN_NUMBER_OF_POSTS = 1;
export const MAX_NUMBER_OF_POSTS = 12;

export const MIN_POSTS_COLUMNS = 2;
export const MAX_POSTS_COLUMNS = 4;

export const MIN_POST_CONTENT_LENGTH = 10;
export const MAX_POST_CONTENT_LENGTH = 30;
