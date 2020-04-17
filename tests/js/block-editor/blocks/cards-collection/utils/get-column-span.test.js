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
