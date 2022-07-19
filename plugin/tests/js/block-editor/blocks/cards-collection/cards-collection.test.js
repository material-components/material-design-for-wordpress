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
} from '../../../../../assets/src/block-editor/blocks/cards-collection';
import Edit from '../../../../../assets/src/block-editor/blocks/cards-collection/edit';
import Save from '../../../../../assets/src/block-editor/blocks/cards-collection/save';

describe( 'blocks: material/cards-collection', () => {
	describe( 'name', () => {
		it( 'should equal material/cards-collection', () => {
			expect( name ).toStrictEqual( 'material/cards-collection' );
		} );
	} );

	describe( 'title settings', () => {
		it( 'should equal `Cards Collection (Material)`', () => {
			expect( settings.title ).toStrictEqual(
				'Cards Collection (Material)'
			);
		} );
	} );

	describe( 'description settings', () => {
		it( 'should equal `Add a group of cards to display content and actions on multiple topics.`', () => {
			expect( settings.description ).toStrictEqual(
				'Add a group of cards to display content and actions on multiple topics.'
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
				align: [ 'wide', 'full' ],
			} );
		} );
	} );

	describe( 'attributes', () => {
		it( 'should be a structured object', () => {
			expect( metadata.attributes ).toStrictEqual( {
				id: {
					type: 'string',
					source: 'attribute',
					attribute: 'id',
					selector: '*',
				},
				style: {
					type: 'string',
					default: 'masonry',
				},
				align: {
					type: 'string',
					default: 'wide',
				},
				columns: {
					type: 'number',
					default: 2,
				},
				contentLayout: {
					type: 'string',
					default: 'text-under-media',
				},
				numberOfCards: {
					type: 'number',
					default: 2,
				},
				cardsProps: {
					type: 'array',
					default: [],
				},
				gutter: {
					type: 'object',
					default: {
						desktop: 24,
						tablet: 16,
						mobile: 16,
					},
				},
				cornerRadius: {
					type: 'number',
				},
				lightbox: {
					type: 'boolean',
					default: false,
				},
				cardStyle: {
					enum: [ 'global', 'elevated', 'outlined', 'filled' ],
					default: 'global',
					type: 'string',
				},
				allowIndividualStyleOverride: {
					type: 'boolean',
					default: false,
				},
				allowIndividualContentOverride: {
					type: 'boolean',
					default: false,
				},
				displayTitle: {
					type: 'boolean',
					default: true,
				},
				displaySecondaryText: {
					type: 'boolean',
					default: true,
				},
				displayImage: {
					type: 'boolean',
					default: true,
				},
				displaySupportingText: {
					type: 'boolean',
					default: true,
				},
				displayActions: {
					type: 'boolean',
					default: true,
				},
				displaySecondaryActionButton: {
					type: 'boolean',
					default: false,
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
