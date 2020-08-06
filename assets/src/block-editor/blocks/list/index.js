/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import './style.css';
import edit from './edit';
import save from './save';
import transforms from './transforms';
import { example } from './example';

export const name = 'material/list';

export const settings = {
	title: __( 'List (Material)', 'material-theme-builder' ),
	description: __(
		'Lists allow you to list out your information in a clear manner.',
		'material-theme-builder'
	),
	category: 'material',
	icon: <i className="material-icons-outlined">list_alt</i>,
	keywords: [ __( 'Material List', 'material-theme-builder' ), 'mlist' ],
	attributes: {
		style: {
			type: 'string',
			default: 'basic',
		},
		iconPosition: {
			type: 'string',
			default: 'leading',
		},
		iconSize: {
			type: 'string',
			default: 'small',
		},
		items: {
			type: 'array',
			default: [],
			source: 'query',
			selector: 'li',
			query: {
				primaryText: {
					type: 'string',
					default: '',
					source: 'html',
					selector: '.mdc-list-item__primary-text',
				},
				secondaryText: {
					type: 'string',
					default: '',
					source: 'html',
					selector: '.mdc-list-item__secondary-text',
				},
				icon: {
					type: 'string',
					default: '',
					source: 'html',
					selector: '.mdc-list-item__graphic, .mdc-list-item__meta',
				},
				url: {
					type: 'string',
					source: 'attribute',
					selector: 'a',
					attribute: 'href',
				},
				target: {
					type: 'string',
					source: 'attribute',
					selector: 'a',
					attribute: 'target',
				},
			},
		},
	},
	edit,
	save,
	example,
	transforms,
};
