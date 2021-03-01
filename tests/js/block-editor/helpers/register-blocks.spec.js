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
