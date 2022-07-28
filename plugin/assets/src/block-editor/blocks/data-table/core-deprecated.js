/**
 *  Copyright 2022 Google LLC
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *        http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

import SaveV1 from './deprecated/dataTableV1';

const coreDeprecatedV1 = {
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
	save: SaveV1,
};
export default coreDeprecatedV1;
