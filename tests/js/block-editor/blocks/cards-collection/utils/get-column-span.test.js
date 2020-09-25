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

import getColumnSpan from '../../../../../../assets/src/block-editor/blocks/cards-collection/utils/get-column-span';

describe( 'column span', () => {
	it( 'should equal to 12 when the style is not `grid`', () => {
		const columnSpan = getColumnSpan( 'list', 4 );
		expect( columnSpan ).toStrictEqual( 12 );
	} );

	it( 'should equal to 3 when the style is `grid` and number of columns is 4', () => {
		const columnSpan = getColumnSpan( 'grid', 4 );
		expect( columnSpan ).toStrictEqual( 3 );
	} );
} );
