/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import BlockIcon from './components/block-icon';

/**
 * Internal dependencies
 */
import edit from './edit';

export const name = 'material/card-collections';

/**
 * @type {{edit: *, icon: (function(): *), description: string, title: string, category: string}}
 */
export const settings = {
	title: __( 'Card Collections', 'material-theme-builder' ),
	description: __(
		'Display a list of your hand made cards.',
		'material-theme-builder'
	),
	category: 'material',
	supports: {
		align: true,
	},
	icon: BlockIcon,
	attributes: {
		style: {
			type: 'string',
			default: 'masonry',
		},
		columns: {
			type: 'number',
			default: 2,
		},
		roundedCorners: {
			type: 'number',
			default: 4,
		},
		lightbox: {
			type: 'boolean',
			default: false,
		},
		outlined: {
			type: 'boolean',
			default: false,
		},
	},
	edit,
};
