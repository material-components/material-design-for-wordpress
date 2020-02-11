module.exports = {
	verbose: true,
	preset: '@wordpress/jest-preset-default',
	collectCoverageFrom: [ 'assets/src/**/*.js', '!assets/src/polyfills/**' ],
	testPathIgnorePatterns: [ '/node_modules/', '/vendor/', '/bin/' ],
};
