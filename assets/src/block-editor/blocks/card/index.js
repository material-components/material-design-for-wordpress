/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

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
	title: __( 'Custom Card (Material)', 'material-theme-builder' ),
	description: __(
		'Add a card to display content and actions on a single topic.',
		'material-theme-builder'
	),
	category: 'material',
	keywords: [ __( 'Material Card', 'material-theme-builder' ) ],
	supports: {
		align: [ 'left', 'right' ],
	},
	icon: <i className="material-icons-outlined">chrome_reader_mode</i>,
	attributes: {
		contentLayout: {
			type: 'string',
			default: 'text-under-media',
		},
		title: {
			type: 'string',
			default: __( 'Title goes here', 'material-theme-builder' ),
		},
		displayTitle: {
			type: 'boolean',
			default: true,
		},
		secondaryText: {
			type: 'string',
			default: __( 'Secondary Text', 'material-theme-builder' ),
		},
		displaySecondaryText: {
			type: 'boolean',
			default: true,
		},
		imageSourceUrl: {
			type: 'string',
		},
		isImageEditMode: {
			type: 'boolean',
		},
		displayImage: {
			type: 'boolean',
			default: true,
		},
		supportingText: {
			type: 'string',
			default: __( 'Supporting Text', 'material-theme-builder' ),
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
		},
		outlined: {
			type: 'boolean',
			default: false,
		},
	},
	edit,
	save,
};
