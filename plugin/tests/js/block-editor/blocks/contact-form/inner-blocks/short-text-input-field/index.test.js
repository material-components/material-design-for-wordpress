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
} from '../../../../../../../assets/src/block-editor/blocks/contact-form/inner-blocks/short-text-input-field';
import BlockIcon from '../../../../../../../assets/src/block-editor/blocks/contact-form/inner-blocks/short-text-input-field/block-icon';
import Edit from '../../../../../../../assets/src/block-editor/blocks/contact-form/inner-blocks/common/components/text-input-edit';
import Save from '../../../../../../../assets/src/block-editor/blocks/contact-form/inner-blocks/common/components/text-input-save';

describe( 'blocks: material/short-text-input-field', () => {
	describe( 'name', () => {
		it( 'should equal material/short-text-input-field', () => {
			expect( name ).toStrictEqual( 'material/short-text-input-field' );
		} );
	} );

	describe( 'title settings', () => {
		it( 'should equal Short text', () => {
			expect( settings.title ).toStrictEqual( 'Short text' );
		} );
	} );

	describe( 'description settings', () => {
		it( 'should equal `A single-line input field for people to add a shorter response.`', () => {
			expect( settings.description ).toStrictEqual(
				'A single-line input field for people to add a shorter response.'
			);
		} );
	} );

	describe( 'parent settings', () => {
		it( 'should have a list of allowed parent blocks', () => {
			expect( settings.parent ).toStrictEqual( [
				'material/contact-form',
			] );
		} );
	} );

	describe( 'category settings', () => {
		it( 'should equal material', () => {
			expect( settings.category ).toStrictEqual( 'material' );
		} );
	} );

	describe( 'icon settings', () => {
		it( 'should be equal to the BlockIcon component', () => {
			expect( settings.icon ).toStrictEqual( BlockIcon );
		} );
	} );

	describe( 'attributes', () => {
		it( 'should be a structured object', () => {
			expect( settings.attributes ).toStrictEqual( {
				id: {
					type: 'string',
				},
				inputType: {
					type: 'string',
					default: 'text',
				},
				inputRole: {
					type: 'string',
					default: 'short-text',
				},
				label: {
					type: 'string',
					default: 'Short text',
				},
				inputValue: {
					type: 'string',
				},
				isRequired: {
					type: 'boolean',
					default: false,
				},
				outlined: {
					type: 'boolean',
					default: false,
				},
				fullWidth: {
					type: 'boolean',
					default: true,
				},
				displayLabel: {
					type: 'boolean',
					default: true,
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
