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
 * Internal dependencies
 */
import {
	name,
	settings,
	metadata,
} from '../../../../../assets/src/block-editor/blocks/card';
import Edit from '../../../../../assets/src/block-editor/blocks/card/edit';
import Save from '../../../../../assets/src/block-editor/blocks/card/save';

describe( 'blocks: material/card', () => {
	describe( 'name', () => {
		it( 'should equal material/card', () => {
			expect( name ).toStrictEqual( 'material/card' );
		} );
	} );

	describe( 'title settings', () => {
		it( 'should equal Custom Card (Material)', () => {
			expect( settings.title ).toStrictEqual( 'Custom Card (Material)' );
		} );
	} );

	describe( 'description settings', () => {
		it( 'should equal `Display content and actions on a single topic.`', () => {
			expect( settings.description ).toStrictEqual(
				'Display content and actions on a single topic.'
			);
		} );
	} );

	describe( 'category settings', () => {
		it( 'should equal material', () => {
			expect( metadata.category ).toStrictEqual( 'material' );
		} );
	} );

	describe( 'supports settings', () => {
		it( 'should have align supporting only wide and full alignment', () => {
			expect( metadata.supports ).toStrictEqual( {
				align: [ 'left', 'right' ],
			} );
		} );
	} );

	describe( 'attributes', () => {
		it( 'should be a structured object', () => {
			expect( metadata.attributes ).toStrictEqual( {
				contentLayout: {
					type: 'string',
					default: 'text-under-media',
				},
				title: {
					type: 'string',
					default: '',
				},
				displayTitle: {
					type: 'boolean',
					default: true,
				},
				secondaryText: {
					type: 'string',
					default: '',
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
					default: '',
				},
				displaySupportingText: {
					type: 'boolean',
					default: true,
				},
				primaryActionButtonLabel: {
					type: 'string',
					default: '',
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
					default: '',
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
				cardStyle: {
					enum: [ 'global', 'elevated', 'outlined', 'filled' ],
					default: 'global',
					type: 'string',
				},
				imageElement: {
					default: true,
					type: 'boolean',
				},
			} );
		} );
	} );

	describe( 'settings edit property', () => {
		it( 'should be equal to the Edit component', () => {
			expect( settings.edit ).toStrictEqual( Edit );
		} );
	} );

	describe( 'settings save property', () => {
		it( 'should be equal to the Save component', () => {
			expect( settings.save ).toStrictEqual( Save );
		} );
	} );
} );
