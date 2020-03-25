module.exports = {
	verbose: true,
	rootDir: '../../',
	...require( '@wordpress/scripts/config/jest-e2e.config' ),
	transform: {
		'^.+\\.[jt]sx?$':
			'<rootDir>/node_modules/@wordpress/scripts/config/babel-transform',
	},
	transformIgnorePatterns: [ 'node_modules' ],
	setupFilesAfterEnv: [
		'<rootDir>/tests/e2e/config/bootstrap.js',
		'@wordpress/jest-puppeteer-axe',
		'expect-puppeteer',
		'jest-puppeteer-istanbul/lib/setup',
	],
	testPathIgnorePatterns: [
		'<rootDir>/.git',
		'<rootDir>/node_modules',
		'<rootDir>/bin',
		'<rootDir>/build',
		'<rootDir>/tests/coverage',
		'<rootDir>/tests/js',
		'<rootDir>/vendor',
	],
	collectCoverageFrom: [ '<rootDir>/assets/src/**/*.js' ],
	reporters: [ 'default', 'jest-puppeteer-istanbul/lib/reporter' ],
};
