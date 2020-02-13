module.exports = {
	verbose: true,
	preset: '@wordpress/jest-preset-default',
	collectCoverageFrom: [ 'assets/src/**/*.js' ],
	testPathIgnorePatterns: [ '/node_modules/', '/vendor/', '/bin/' ],
};
