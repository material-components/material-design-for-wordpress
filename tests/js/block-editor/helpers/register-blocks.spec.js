/**
 * Internal dependencies
 */
import { registerBlocks } from '../../../../assets/src/block-editor/helpers';

const mockRegisterBlockType = jest.fn();
jest.mock( '@wordpress/blocks', () => {
	return {
		registerBlockType: ( ...args ) => mockRegisterBlockType( ...args ),
	};
} );

const blocks = {
	biz: {
		name: 'material/biz',
		settings: {
			title: 'Biz',
		},
	},
	baz: {
		name: 'material/baz',
		settings: {
			title: 'Baz',
		},
	},
};

const mockBlocks = {
	'./blocks/biz/index.js': {
		...blocks.biz,
	},
	'./blocks/baz/index.js': {
		...blocks.baz,
	},
};

// Mocks the return value of the require.context() Webpack function.
const mockBlocksToRegister = modulePath => {
	return mockBlocks[ modulePath ];
};

mockBlocksToRegister.keys = () => {
	return Object.keys( mockBlocks );
};

describe( 'helpers: registerBlocks', () => {
	it( 'should register all of the expected blocks, with the expected arguments', () => {
		registerBlocks( mockBlocksToRegister );

		expect( mockRegisterBlockType ).toHaveBeenNthCalledWith(
			1,
			blocks.biz.name,
			blocks.biz.settings
		);

		expect( mockRegisterBlockType ).toHaveBeenNthCalledWith(
			2,
			blocks.baz.name,
			blocks.baz.settings
		);
	} );
} );
