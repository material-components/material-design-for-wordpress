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
		secondaryText: {
			type: 'string',
		},
		displaySecondaryText: {
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
		supportingText: {
			type: 'string',
		},
		displaySupportingText: {
			type: 'boolean',
			default: true,
		},
		primaryActionButtonLabel: {
			type: 'string',
			default: __( 'Button text', 'material-theme-builder' ),
		},
		primaryActionButtonUrl: {
			type: 'string',
		},
		primaryActionButtonNewTab: {
			type: 'bool',
			default: false,
		},
		primaryActionButtonNoFollow: {
			type: 'bool',
			default: false,
		},
		secondaryActionButtonLabel: {
			type: 'string',
			default: __( 'Button text', 'material-theme-builder' ),
		},
		secondaryActionButtonUrl: {
			type: 'string',
		},
		secondaryActionButtonNewTab: {
			type: 'bool',
			default: false,
		},
		secondaryActionButtonNoFollow: {
			type: 'bool',
			default: false,
		},
		displayActions: {
			type: 'boolean',
			default: true,
		},
		displaySecondaryActionButton: {
			type: 'bool',
			default: false,
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
