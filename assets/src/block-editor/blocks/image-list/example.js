/**
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

export const example = {
	attributes: {
		images: [
			{
				caption: __(
					'I took this photo at a wedding reception. The flowers were in a vase next to a window through which the early evening sun filtered. The sun caused a slight glare that - in the final photo - created a slightly blue cast over the bottom part of the frame.',
					'material-design'
				),
				url:
					'https://images.unsplash.com/photo-1531306760863-7fb02a41db12?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2550&q=80',
				fullUrl:
					'https://images.unsplash.com/photo-1531306760863-7fb02a41db12?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2550&q=80',
			},
			{
				url:
					'https://images.unsplash.com/photo-1558905586-d9bc8798d488?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2612&q=80',
				fullUrl:
					'https://images.unsplash.com/photo-1558905586-d9bc8798d488?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2612&q=80',
			},
			{
				caption: __(
					"This shot is actually an update to the matching flowers elsewhere in my collection - I returned to Cascais and found the same wall with the same flowers. They've grown a lot in the past year!",
					'material-design'
				),
				url:
					'https://images.unsplash.com/photo-1558905585-24d5d344c91d?ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80',
				fullUrl:
					'https://images.unsplash.com/photo-1558905585-24d5d344c91d?ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80',
			},
			{
				caption: __(
					'An up-close look at a Blushing Bride Protea flower, native to South Africa.',
					'material-design'
				),
				url:
					'https://images.unsplash.com/photo-1566964423430-3e52903303a5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2550&q=80',
				fullUrl:
					'https://images.unsplash.com/photo-1566964423430-3e52903303a5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2550&q=80',
			},
		],
	},
};
