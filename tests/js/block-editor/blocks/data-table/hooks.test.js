/**
 * External dependencies
 */
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';

/**
 * WordPress dependencies
 */
import { registerBlockStyle } from '@wordpress/blocks';
import { addFilter } from '@wordpress/hooks';

/**
 * Internal dependencies
 */
import {
	isMaterialTableBlock,
	withDataTableEdit,
	save,
} from '../../../../../assets/src/block-editor/blocks/data-table/hooks';

jest.mock(
	'../../../../../assets/src/block-editor/blocks/data-table/edit',
	() => ( {
		__esModule: true,
		default: () => <div>Material Data Table Edit Component</div>,
	} )
);

// Mock wp.hooks.addFilter.
jest.mock( '@wordpress/hooks', () => {
	return {
		addFilter: jest.fn(),
	};
} );

// Mock wp.blocks.registerBlockStyle.
jest.mock( '@wordpress/blocks', () => {
	return {
		registerBlockStyle: jest.fn(),
	};
} );

// Mock wp.data.
jest.mock( '@wordpress/block-editor', () => ( {
	RichText: jest.fn(),
	getColorClassName: jest.fn(),
	createCustomColorsHOC: Comp => () => () => Comp,
} ) );

// Mock wp.data.
jest.mock( '@wordpress/data', () => ( {
	combineReducers: jest.fn(),
	registerStore: jest.fn(),
	select: () => {
		return {};
	},
	withSelect: () => () => {
		return {};
	},
	dispatch: jest.fn(),
} ) );

const attributes = {
	hasFixedLayout: true,
	head: [
		{
			cells: [
				{
					content: 'Version',
					tag: 'th',
				},
				{
					content: 'Jazz Musician',
					tag: 'th',
				},
				{
					content: 'Release Date',
					tag: 'th',
				},
			],
		},
	],
	body: [
		{
			cells: [
				{
					content: '5.2',
					tag: 'td',
				},
				{
					content: 'Jaco Pastorius',
					tag: 'td',
				},
				{
					content: 'May 7, 2019',
					tag: 'td',
				},
			],
		},
		{
			cells: [
				{
					content: '5.1',
					tag: 'td',
				},
				{
					content: 'Betty Carter',
					tag: 'td',
				},
				{
					content: 'February 21, 2019',
					tag: 'td',
				},
			],
		},
		{
			cells: [
				{
					content: '5.0',
					tag: 'td',
				},
				{
					content: 'Bebo Valdés',
					tag: 'td',
				},
				{
					content: 'December 6, 2018',
					tag: 'td',
				},
			],
		},
	],
	foot: [
		{
			cells: [
				{
					content: 'Footer Col 1',
					tag: 'td',
				},
				{
					content: 'Footer Col 2',
					tag: 'td',
				},
				{
					content: 'Footer Col 3',
					tag: 'td',
				},
			],
		},
	],
	backgroundColor: 'subtle-pale-blue',
	caption: 'Material Data Table',
	className: 'is-style-material',
};

describe( 'Data Table Filters', () => {
	it( 'registerBlockStyle should be invoked', () => {
		expect( registerBlockStyle ).toHaveBeenCalledWith( 'core/table', {
			name: 'material',
			label: 'Material',
		} );
	} );

	it( 'filters should be added', () => {
		expect( addFilter ).toHaveBeenCalledTimes( 2 );

		// eslint-disable-next-line jest/prefer-strict-equal
		expect( addFilter.mock.calls[ 0 ] ).toEqual( [
			'editor.BlockEdit',
			'material/data-table-edit',
			withDataTableEdit,
		] );

		// eslint-disable-next-line jest/prefer-strict-equal
		expect( addFilter.mock.calls[ 1 ] ).toEqual( [
			'blocks.getSaveElement',
			'material/data-table-save',
			save,
		] );
	} );

	it( 'isMaterialTableBlock should return correct value', () => {
		expect(
			isMaterialTableBlock( 'core/table', { className: 'is-style-material' } )
		).toStrictEqual( true );

		expect(
			isMaterialTableBlock( 'core/table', { className: 'is-style-regular' } )
		).toStrictEqual( false );

		expect(
			isMaterialTableBlock( 'core/paragraph', {
				className: 'is-style-material',
			} )
		).toStrictEqual( false );
	} );

	it( 'withDataTableEdit should include DataTableEdit', () => {
		const Component = withDataTableEdit( () => {
			return <div>Original Edit component</div>;
		} );
		let wrapper = render(
			<Component { ...{ name: 'core/table', attributes } } />
		);

		expect( wrapper ).toMatchSnapshot();

		wrapper = render(
			<Component { ...{ name: 'core/paragraph', attributes } } />
		);

		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'save should invoke DataTableSave', () => {
		const Component = () => {
			return <div>Original Save component</div>;
		};
		const element = <Component />;
		let saveElement = save( element, { name: 'core/table' }, attributes );

		expect( saveElement ).toMatchSnapshot();

		saveElement = save( element, { name: 'core/paragraph' }, attributes );

		expect( saveElement ).toMatchSnapshot();
	} );
} );
