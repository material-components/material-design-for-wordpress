/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import BlockIcon from './components/block-icon';

/**
 * Internal dependencies
 */
import edit from './edit';
import save from './save';

export const name = 'material/card';

/**
 * @type {{edit: *, icon: (function(): *), description: string, title: string, category: string}}
 */
export const settings = {
	title: __( 'Card', 'material-theme-builder' ),
	description: __( 'Display a card.', 'material-theme-builder' ),
	category: 'material',
	supports: {
		align: true,
	},
	icon: BlockIcon,
	attributes: {
		contentLayout: {
			type: 'string',
			default: 'text-under-media',
		},
		title: {
			type: 'string',
		},
		displayTitle: {
			type: 'boolean',
			default: true,
		},
		subTitle: {
			type: 'string',
		},
		displaySubTitle: {
			type: 'boolean',
			default: true,
		},
		imageSourceUrl: {
			type: 'string',
		},
		imageEditMode: {
			type: 'boolean',
		},
		displayImage: {
			type: 'boolean',
			default: true,
		},
		secondaryText: {
			type: 'string',
		},
		displaySecondaryText: {
			type: 'boolean',
			default: true,
		},
		buttonActionText: {
			type: 'string',
			default: 'Button text',
		},
		buttonActionUrl: {
			type: 'string',
		},
		buttonActionNewTab: {
			type: 'bool',
			default: false,
		},
		buttonActionNoFollow: {
			type: 'bool',
			default: false,
		},
		displayActions: {
			type: 'boolean',
			default: true,
		},
		cornerRadius: {
			type: 'number',
			default: 4,
		},
		outlined: {
			type: 'boolean',
			default: false,
		},
	},
	edit,
	save,
};
