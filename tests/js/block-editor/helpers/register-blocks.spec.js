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
