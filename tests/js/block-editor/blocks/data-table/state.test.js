import {
	createTable,
	updateSelectedCell,
	getCellAttribute,
	insertRow,
	deleteRow,
	insertColumn,
	deleteColumn,
	toggleSection,
	getFirstRow,
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
		expect( getFirstRow( table ).cells[ 0 ].content ).toStrictEqual( 'Row 1' );

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
} );
