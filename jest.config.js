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

module.exports = {
	verbose: true,
	testMatch: [ '**/?(*.)+(spec|test).[jt]s?(x)' ],
	preset: '@wordpress/jest-preset-default',
	collectCoverageFrom: [ 'plugin/assets/src/**/*.js' ],
	testPathIgnorePatterns: [
		'/node_modules/',
		'/vendor/',
		'/bin/',
		'/plugin/tests/e2e/',
	],
	moduleNameMapper: {
		'^!!json-loader!(.*).ijmap$': '<rootDir>/plugin/tests/mocks/ijmap.js',
		'@wordpress/block-editor':
			'<rootDir>/plugin/tests/mocks/@wordpress/block-editor.js',
		'@wordpress/rich-text':
			'<rootDir>/plugin/tests/mocks/@wordpress/rich-text.js',
		'icon-picker*': '<rootDir>/plugin/tests/mocks/icon-picker.js',
	},
};
