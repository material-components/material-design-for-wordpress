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
} from '../../../../../assets/src/block-editor/blocks/contact-form';
import Edit from '../../../../../assets/src/block-editor/blocks/contact-form/edit';
import Save from '../../../../../assets/src/block-editor/blocks/contact-form/save';

describe( 'blocks: material/contact-form', () => {
	describe( 'name', () => {
		it( 'should equal material/contact-form', () => {
			expect( name ).toStrictEqual( 'material/contact-form' );
		} );
	} );

	describe( 'title settings', () => {
		it( 'should equal Contact Form (Material)', () => {
			expect( settings.title ).toStrictEqual( 'Contact Form (Material)' );
		} );
	} );

	describe( 'description settings', () => {
		it( 'should equal `Get feedback from folks visiting your site.`', () => {
			expect( settings.description ).toStrictEqual(
				'Get feedback from folks visiting your site.'
			);
		} );
	} );

	describe( 'category settings', () => {
		it( 'should equal material', () => {
			expect( metadata.category ).toStrictEqual( 'material' );
		} );
	} );

	describe( 'settings attributes', () => {
		it( 'should equal material', () => {
			expect( metadata.attributes ).toBeDefined();
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
