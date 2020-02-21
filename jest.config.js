module.exports = {
	verbose: true,
	preset: '@wordpress/jest-preset-default',
	collectCoverageFrom: [ 'assets/src/**/*.js' ],
	testPathIgnorePatterns: [ '/node_modules/', '/vendor/', '/bin/' ],
	moduleNameMapper: {
		'^!!json-loader!(.*).ijmap$': '<rootDir>/tests/js/utils/ijmap-mock.js',
	},
};
