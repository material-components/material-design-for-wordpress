/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import edit from './edit';
import save from './save';

export const name = 'material/card-image';

/**
 * @type {{edit: *, icon: (function(): *), description: string, title: string, category: string}}
 */
export const settings = {
	title: __( 'Card Image', 'material-theme-builder' ),
	description: __(
		'Provide an image in a Card Primary Block.',
		'material-theme-builder'
	),
	category: 'material',
	parent: [ 'material/card' ],
	supports: {
		multiple: false,
	},
	attributes: {
		imageSourceUrl: {
			type: 'string',
			default: '',
		},
		editMode: {
			type: 'boolean',
			default: true,
		},
	},
	edit,
	save,
};
