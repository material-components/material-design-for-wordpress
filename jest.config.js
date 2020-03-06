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
	moduleNameMapper: {
		'^!!json-loader!(.*).ijmap$': '<rootDir>/tests/mocks/ijmap.js',
	},
};
