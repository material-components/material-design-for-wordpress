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

/** @type {Array} */
export const BLOCK_TEMPLATE = [
	[
		'core/group',
		{ className: 'mdc-drawer__header' },
		[
			[
				'core/group',
				{
					className: 'logo',
					style: {
						spacing: {
							padding: {
								bottom: 5,
								left: 5,
								right: 5,
								top: 5,
							},
						},
					},
				},
				[
					[
						'core/site-logo',
						{
							width: 190,
						},
					],
				],
			],
			[
				'core/group',
				{ className: 'mdc-drawer__title' },
				[
					[
						'core/group',
						{ className: 'site-title__wrapper' },
						[
							[
								'core/group',
								{ className: 'site-title__row' },
								[
									[
										'core/site-title',
										{
											className:
												'site-title mdc-typography mdc-typography--headline6',
										},
									],
								],
							],
						],
					],
				],
			],
		],
	],
	[
		'core/group',
		{
			className: 'mdc-drawer__content',
			style: {
				spacing: {
					padding: {
						bottom: 10,
						left: 10,
						right: 10,
						top: 10,
					},
				},
			},
		},
		[ [ 'material/search' ], [ 'material/navigation' ] ],
	],
];
