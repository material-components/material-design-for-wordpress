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
	attributes: {
		images: {
			type: 'array',
			default: [],
			source: 'query',
			selector: '.mdc-image-list__item',
			query: {
				url: {
					type: 'string',
					source: 'attribute',
					selector: 'img',
					attribute: 'src',
				},
				fullUrl: {
					type: 'string',
					source: 'attribute',
					selector: 'img',
					attribute: 'data-full-url',
				},
				link: {
					type: 'string',
					source: 'attribute',
					selector: 'img',
					attribute: 'data-link',
				},
				alt: {
					type: 'string',
					source: 'attribute',
					selector: 'img',
					attribute: 'alt',
					default: '',
				},
				id: {
					type: 'string',
					source: 'attribute',
					selector: 'img',
					attribute: 'data-id',
				},
				caption: {
					type: 'string',
					source: 'html',
					selector: '.mdc-image-list__label',
				},
			},
		},
		ids: {
			type: 'array',
			items: {
				type: 'number',
			},
			default: [],
		},
		style: {
			type: 'string',
			default: 'masonry',
		},
		columns: {
			type: 'number',
			default: 2,
		},
		gutter: {
			type: 'number',
			default: 10,
		},
		cornerRadius: {
			type: 'number',
			default: 4,
		},
		aspectRatio: {
			type: 'number',
			default: 66,
		},
		displayLightbox: {
			type: 'boolean',
			default: false,
		},
		displayCaptions: {
			type: 'boolean',
			default: true,
		},
		textProtection: {
			type: 'boolean',
			default: true,
		},
		linkTo: {
			type: 'string',
			default: 'media',
		},
	},
	supports: {
		align: true,
	},
	icon: BlockIcon,
	edit,
	save,
};
