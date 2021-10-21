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
/* eslint-disable @typescript-eslint/no-empty-function */

import {
	createTable,
	getFirstRow,
	updateSelectedCell,
	isCellSelected,
	insertRow,
	deleteRow,
	insertColumn,
	deleteColumn,
	toggleSection,
} from '../../../../../assets/src/block-editor/blocks/data-table/state';

describe( 'Data Table State', () => {
	it( '`createTable` should create an empty table', () => {
		const table = createTable( {
			rowCount: 3,
			columnCount: 4,
		} );

		expect( table.body ).toHaveLength( 3 );
		expect( table.body[ 0 ].cells ).toHaveLength( 4 );
		expect( table.body[ 0 ].cells[ 0 ].tag ).toStrictEqual( 'td' );
		expect( table.body[ 0 ].cells[ 0 ].content ).toStrictEqual( '' );
	} );

	it( '`getFirstRow` should return first row', () => {
		let table = {
			body: [
				{ cells: [ { content: 'Row 1', tag: 'td' } ] },
				{ cells: [ { content: 'Row 2', tag: 'td' } ] },
			],
		};

		expect( getFirstRow( table ) ).toStrictEqual( table.body[ 0 ] );
		expect( getFirstRow( table ).cells[ 0 ].content ).toStrictEqual(
			'Row 1'
		);

		table = {
			head: [ { cells: [ { content: 'Heading 1', tag: 'td' } ] } ],
		};

		expect( getFirstRow( table ) ).toStrictEqual( table.head[ 0 ] );
		expect( getFirstRow( table ).cells[ 0 ].content ).toStrictEqual(
			'Heading 1'
		);

		table = {
			foot: [ { cells: [ { content: 'Footer 1', tag: 'td' } ] } ],
		};

		expect( getFirstRow( table ) ).toStrictEqual( table.foot[ 0 ] );
		expect( getFirstRow( table ).cells[ 0 ].content ).toStrictEqual(
			'Footer 1'
		);
	} );

	it( '`updateSelectedCell` updates the selected cell', () => {
		const table = {
			head: [ { cells: [ { content: 'Heading 1', tag: 'td' } ] } ],
			body: [
				{ cells: [ { content: 'Row 1', tag: 'td' } ] },
				{ cells: [ { content: 'Row 2', tag: 'td' } ] },
			],
			foot: [ { cells: [ { content: 'Footer 1', tag: 'td' } ] } ],
		};

		expect( updateSelectedCell( table, null, () => {} ) ).toStrictEqual(
			table
		);

		const updateCell = jest.fn();
		updateSelectedCell(
			table,
			{ columnIndex: 0, rowIndex: 1, sectionName: 'body', type: 'cell' },
			updateCell
		);
		updateSelectedCell(
			table,
			{ columnIndex: 0, sectionName: 'body', type: 'column' },
			updateCell
		);
		updateSelectedCell(
			table,
			{ columnIndex: 0, rowIndex: 0, sectionName: 'head', type: 'cell' },
			updateCell
		);
		updateSelectedCell(
			table,
			{ columnIndex: 0, rowIndex: 0, sectionName: 'foot', type: 'cell' },
			updateCell
		);

		expect( updateCell ).toHaveBeenCalledTimes( 5 );

		expect( updateCell.mock.calls[ 0 ][ 0 ].content ).toStrictEqual(
			'Row 2'
		);
		expect( updateCell.mock.calls[ 1 ][ 0 ].content ).toStrictEqual(
			'Row 1'
		);
		expect( updateCell.mock.calls[ 2 ][ 0 ].content ).toStrictEqual(
			'Row 2'
		);
		expect( updateCell.mock.calls[ 3 ][ 0 ].content ).toStrictEqual(
			'Heading 1'
		);
		expect( updateCell.mock.calls[ 4 ][ 0 ].content ).toStrictEqual(
			'Footer 1'
		);
	} );

	it( '`isCellSelected` should determine if a cell is selected', () => {
		const cellLocation = {
			sectionName: 'body',
			columnIndex: 0,
			rowIndex: 0,
		};
		const selection = {
			columnIndex: 0,
			rowIndex: 0,
			sectionName: 'body',
			type: 'cell',
		};

		expect( isCellSelected( null, selection ) ).toStrictEqual( false );
		expect( isCellSelected( cellLocation, null ) ).toStrictEqual( false );
		expect( isCellSelected( cellLocation, selection ) ).toStrictEqual(
			true
		);

		selection.type = 'column';
		selection.rowIndex = 1;
		expect( isCellSelected( cellLocation, selection ) ).toStrictEqual(
			true
		);
	} );

	it( '`insertRow` should insert a row', () => {
		const table = {
			body: [
				{ cells: [ { content: 'Row 1', tag: 'td' } ] },
				{ cells: [ { content: 'Row 2', tag: 'td' } ] },
			],
		};

		let updatedTable = insertRow( table, {
			sectionName: 'body',
			rowIndex: 2,
			columnCount: 1,
		} );

		expect( updatedTable.body ).toHaveLength( 3 );
		expect( updatedTable.body[ 2 ].cells ).toHaveLength( 1 );

		updatedTable = insertRow( table, {
			sectionName: 'body',
			rowIndex: 2,
		} );

		expect( updatedTable.body ).toHaveLength( 3 );
		expect( updatedTable.body[ 2 ].cells ).toHaveLength( 1 );

		updatedTable = insertRow(
			{ body: [] },
			{
				sectionName: 'body',
				rowIndex: 2,
			}
		);

		expect( updatedTable.body ).toHaveLength( 0 );
	} );

	it( '`deleteRow` should delete a row', () => {
		const table = {
			body: [
				{ cells: [ { content: 'Row 1', tag: 'td' } ] },
				{ cells: [ { content: 'Row 2', tag: 'td' } ] },
				{ cells: [ { content: 'Row 3', tag: 'td' } ] },
			],
		};

		let updatedTable = deleteRow( table, {
			sectionName: 'body',
			rowIndex: 1,
		} );

		expect( updatedTable.body ).toHaveLength( 2 );
		expect( updatedTable.body[ 1 ].cells[ 0 ].content ).toStrictEqual(
			'Row 3'
		);

		updatedTable = deleteRow( table, {
			sectionName: 'body',
			rowIndex: 1,
		} );

		expect( updatedTable.body ).toHaveLength( 2 );
		expect( updatedTable.body[ 1 ].cells[ 0 ].content ).toStrictEqual(
			'Row 3'
		);
	} );

	it( '`insertColumn` should insert a column', () => {
		const table = {
			body: [
				{ cells: [ { content: 'Row 1', tag: 'td' } ] },
				{ cells: [ { content: 'Row 2', tag: 'td' } ] },
			],
			head: [],
		};

		let updatedTable = insertColumn( table, {
			columnIndex: 1,
		} );

		expect( updatedTable.body[ 0 ].cells ).toHaveLength( 2 );
		expect( updatedTable.body[ 0 ].cells[ 1 ].content ).toStrictEqual( '' );
		expect( updatedTable.body[ 1 ].cells ).toHaveLength( 2 );
		expect( updatedTable.body[ 1 ].cells[ 1 ].content ).toStrictEqual( '' );

		updatedTable = insertColumn( table, {
			columnIndex: 4,
		} );
		expect( updatedTable.body[ 0 ].cells ).toHaveLength( 1 );
	} );

	it( '`deleteColumn` should delete a column', () => {
		const table = {
			body: [
				{
					cells: [
						{ content: 'Row 1', tag: 'td' },
						{ content: 'Row 1 Col 2', tag: 'td' },
					],
				},
				{
					cells: [
						{ content: 'Row 2', tag: 'td' },
						{ content: 'Row 2 Col 2', tag: 'td' },
					],
				},
			],
			head: [],
		};

		const updatedTable = deleteColumn( table, {
			columnIndex: 1,
		} );

		expect( updatedTable.body[ 0 ].cells ).toHaveLength( 1 );
		expect( updatedTable.body[ 0 ].cells[ 0 ].content ).toStrictEqual(
			'Row 1'
		);
		expect( updatedTable.body[ 1 ].cells ).toHaveLength( 1 );
		expect( updatedTable.body[ 1 ].cells[ 0 ].content ).toStrictEqual(
			'Row 2'
		);
	} );

	it( '`toggleSection` should toggle the existance of a section', () => {
		const table = {
			head: [],
			body: [
				{
					cells: [ { content: 'Row 1', tag: 'td' } ],
				},
				{
					cells: [ { content: 'Row 2', tag: 'td' } ],
				},
			],
		};

		let updatedTable = toggleSection( table, 'body' );
		expect( updatedTable.body ).toHaveLength( 0 );

		updatedTable = toggleSection( table, 'head' );
		expect( updatedTable.head ).toHaveLength( 1 );
	} );
} );
