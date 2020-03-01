const { defaults } = require( 'jest-config' );

module.exports = {
	verbose: true,
	testMatch: [ '**/?(*.)+(spec|test).[jt]s?(x)' ],
	preset: '@wordpress/jest-preset-default',
	collectCoverageFrom: [ 'assets/src/**/*.js' ],
	testPathIgnorePatterns: [
		'/node_modules/',
		'/vendor/',
		'/bin/',
		'/tests/e2e/',
	],
	moduleFileExtensions: [ ...defaults.moduleFileExtensions, 'ijmap' ],
};
