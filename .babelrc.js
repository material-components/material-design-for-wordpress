module.exports = {
	presets: [ '@wordpress/default' ],
	plugins: [
		'@wordpress/babel-plugin-import-jsx-pragma',
		'@babel/transform-react-jsx',
		'@babel/plugin-proposal-optional-chaining',
	],
	env: {
		test: {
			plugins: [ 'transform-require-context' ],
		},
	},
};
