/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import icon from './components/block-icon';
import edit from './edit';
import save from './save';
import { example } from './example';

export const name = 'material/button';

export const settings = {
	title: __( 'Button (Material)', 'material-theme-builder' ),
	description: __(
		'Buttons allow users to take actions, and make choices, with a single tap.',
		'material-theme-builder'
	),
	category: 'material',
	icon,
	attributes: {
		label: {
			type: 'string',
			source: 'html',
			selector: '.mdc-button__label',
			default: '',
		},
		type: {
			type: 'string',
			default: 'text',
		},
		style: {
			type: 'string',
			default: 'raised',
		},
		iconPosition: {
			type: 'string',
			default: 'leading',
		},
		cornerRadius: {
			type: 'number',
		},
		url: {
			type: 'string',
			source: 'attribute',
			selector: 'a',
			attribute: 'href',
			default: '',
		},
		rel: {
			type: 'string',
			source: 'attribute',
			selector: 'a',
			attribute: 'rel',
			default: '',
		},
		linkTarget: {
			type: 'string',
			source: 'attribute',
			selector: 'a',
			attribute: 'target',
		},
		icon: {
			type: 'object',
		},
		backgroundColor: {
			type: 'string',
		},
		textColor: {
			type: 'string',
		},
		isSubmit: {
			type: 'boolean',
			default: false,
		},
	},
	edit,
	save,
	example,
};
