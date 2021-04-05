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
	rootDir: '../../../',
	...require( '@wordpress/scripts/config/jest-e2e.config' ),
	transform: {
		'^.+\\.[jt]sx?$':
			'<rootDir>/node_modules/@wordpress/scripts/config/babel-transform',
	},
	transformIgnorePatterns: [ 'node_modules' ],
	setupFilesAfterEnv: [
		'<rootDir>/plugin/tests/e2e/config/bootstrap.js',
		'@wordpress/jest-puppeteer-axe',
		'expect-puppeteer',
		'jest-puppeteer-istanbul/lib/setup',
	],
	testPathIgnorePatterns: [
		'<rootDir>/.git',
		'<rootDir>/node_modules',
		'<rootDir>/bin',
		'<rootDir>/build',
		'<rootDir>/plugin/tests/coverage',
		'<rootDir>/plugin/tests/js',
		'<rootDir>/vendor',
	],
	collectCoverageFrom: [ '<rootDir>/plugin/assets/src/**/*.js' ],
	reporters: [ 'default', 'jest-puppeteer-istanbul/lib/reporter' ],
};
