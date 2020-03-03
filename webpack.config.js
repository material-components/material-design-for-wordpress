/**
 * External dependencies
 */
const path = require( 'path' );
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );
const OptimizeCSSAssetsPlugin = require( 'optimize-css-assets-webpack-plugin' );
const RtlCssPlugin = require( 'rtlcss-webpack-plugin' );
const TerserPlugin = require( 'terser-webpack-plugin' );
const WebpackBar = require( 'webpackbar' );

/**
 * WordPress dependencies
 */
const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );

// Exclude `node_modules` folder from `source-map-loader` to prevent webpack warnings.
if ( defaultConfig.module && Array.isArray( defaultConfig.module.rules ) ) {
	defaultConfig.module.rules.some( function( rule ) {
		if ( rule.use && rule.use.includes( 'source-map-loader' ) ) {
			rule.exclude = /node_modules/;
			return true;
		}

		return false;
	} );
}

const sharedConfig = {
	output: {
		path: path.resolve( process.cwd(), 'assets', 'js' ),
		filename: '[name].js',
		chunkFilename: '[name].js',
	},
	optimization: {
		minimizer: [
			new TerserPlugin( {
				parallel: true,
				sourceMap: false,
				cache: true,
				terserOptions: {
					output: {
						comments: /translators:/i,
					},
				},
				extractComments: false,
			} ),
			new OptimizeCSSAssetsPlugin( {} ),
		],
	},
	module: {
		...defaultConfig.module,
		rules: [
			...defaultConfig.module.rules,
			{
				test: /\.css$/,
				use: [
					// prettier-ignore
					MiniCssExtractPlugin.loader,
					'css-loader',
					'postcss-loader',
				],
			},
		],
	},
	plugins: [
		...defaultConfig.plugins,
		new MiniCssExtractPlugin( {
			filename: '../css/[name]-compiled.css',
		} ),
		new RtlCssPlugin( {
			filename: '../css/[name]-compiled-rtl.css',
		} ),
	],
};

const blockEditor = {
	...defaultConfig,
	...sharedConfig,
	entry: {
		'block-editor': [
			'./assets/src/block-editor/index.js',
			'./assets/css/src/block-editor.css',
		],
	},
	plugins: [
		...sharedConfig.plugins,
		new WebpackBar( {
			name: 'Block Editor',
			color: '#1773a8',
		} ),
	],
};

const customizer = {
	...defaultConfig,
	...sharedConfig,
	entry: {
		'customize-controls': [
			'./assets/src/customizer/customize-controls.js',
			'./assets/css/src/customize-controls.css',
		],
		'customize-preview': [
			'./assets/src/customizer/customize-preview.js',
			'./assets/css/src/customize-preview.css',
		],
	},
	plugins: [
		...sharedConfig.plugins,
		new WebpackBar( {
			name: 'Customizer',
			color: '#f27136',
		} ),
	],
};

const frontEnd = {
	...defaultConfig,
	...sharedConfig,
	entry: {
		'front-end': [
			'./assets/src/front-end/index.js',
			'./assets/css/src/front-end.css',
		],
	},
	plugins: [
		...sharedConfig.plugins,
		new WebpackBar( {
			name: 'Front End',
			color: '#36f271',
		} ),
	],
};

module.exports = [
	// prettier-ignore
	blockEditor,
	customizer,
	frontEnd,
];
