/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import edit from './edit';
import save from './save';

export const name = 'material/data-table';

/**
 * @type {{edit: *, icon: (function(): *), description: string, title: string, category: string}}
 */
export const settings = {
	title: __( 'Material Data Table', 'material-theme-builder' ),
	description: __(
		'Data tables display sets of data across rows and columns.',
		'material-theme-builder'
	),
	category: 'material',
	keywords: [ __( 'Material Data Table', 'material-theme-builder' ) ],
	attributes: {
		hasFixedLayout: {
			type: 'boolean',
			default: false,
		},
		backgroundColor: {
			type: 'string',
		},
		caption: {
			type: 'string',
			source: 'html',
			selector: 'figcaption',
			default: '',
		},
		head: {
			type: 'array',
			default: [],
			source: 'query',
			selector: 'thead tr',
			query: {
				cells: {
					type: 'array',
					default: [],
					source: 'query',
					selector: 'td,th',
					query: {
						content: {
							type: 'string',
							source: 'html',
						},
						tag: {
							type: 'string',
							default: 'td',
							source: 'tag',
						},
						scope: {
							type: 'string',
							source: 'attribute',
							attribute: 'scope',
						},
						align: {
							type: 'string',
							source: 'attribute',
							attribute: 'data-align',
						},
					},
				},
			},
		},
		body: {
			type: 'array',
			default: [],
			source: 'query',
			selector: 'tbody tr',
			query: {
				cells: {
					type: 'array',
					default: [],
					source: 'query',
					selector: 'td,th',
					query: {
						content: {
							type: 'string',
							source: 'html',
						},
						tag: {
							type: 'string',
							default: 'td',
							source: 'tag',
						},
						scope: {
							type: 'string',
							source: 'attribute',
							attribute: 'scope',
						},
						align: {
							type: 'string',
							source: 'attribute',
							attribute: 'data-align',
						},
					},
				},
			},
		},
		foot: {
			type: 'array',
			default: [],
			source: 'query',
			selector: 'tfoot tr',
			query: {
				cells: {
					type: 'array',
					default: [],
					source: 'query',
					selector: 'td,th',
					query: {
						content: {
							type: 'string',
							source: 'html',
						},
						tag: {
							type: 'string',
							default: 'td',
							source: 'tag',
						},
						scope: {
							type: 'string',
							source: 'attribute',
							attribute: 'scope',
						},
						align: {
							type: 'string',
							source: 'attribute',
							attribute: 'data-align',
						},
					},
				},
			},
		},
	},
	supports: {
		align: true,
	},
	icon: <i className="material-icons-outlined">grid_on</i>,
	edit,
	save,
};
