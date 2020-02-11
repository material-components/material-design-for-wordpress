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
const DependencyExtractionWebpackPlugin = require( '@wordpress/dependency-extraction-webpack-plugin' );
const {
	defaultRequestToExternal,
	defaultRequestToHandle,
} = require( '@wordpress/dependency-extraction-webpack-plugin/util' );

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
};

const blockEditor = {
	...defaultConfig,
	...sharedConfig,
	entry: {
		'block-editor': './assets/src/block-editor/index.js',
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
		new WebpackBar( {
			name: 'Block Editor',
			color: '#1773a8',
		} ),
	],
};

const classicEditor = {
	...defaultConfig,
	...sharedConfig,
	entry: {
		'classic-editor': './assets/src/classic-editor/index.js',
	},
	plugins: [
		...defaultConfig.plugins,
		new WebpackBar( {
			name: 'Classic Editor',
			color: '#dc3232',
		} ),
	],
};

const customizer = {
	...defaultConfig,
	...sharedConfig,
	entry: {
		'customize-controls': './assets/src/customizer/customize-controls.js',
		'customize-preview': './assets/src/customizer/customize-preview.js',
	},
	plugins: [
		...defaultConfig.plugins,
		new WebpackBar( {
			name: 'Customizer',
			color: '#f27136',
		} ),
	],
};

const wpPolyfills = {
	...defaultConfig,
	...sharedConfig,
	externals: {},
	plugins: [
		new DependencyExtractionWebpackPlugin( {
			useDefaults: false,
			requestToHandle: request => {
				switch ( request ) {
					case '@wordpress/dom-ready':
					case '@wordpress/i18n':
					case '@wordpress/polyfill':
					case '@wordpress/server-side-render':
					case '@wordpress/url':
						return undefined;

					default:
						return defaultRequestToHandle( request );
				}
			},
			requestToExternal: request => {
				switch ( request ) {
					case '@wordpress/dom-ready':
					case '@wordpress/i18n':
					case '@wordpress/polyfill':
					case '@wordpress/server-side-render':
					case '@wordpress/url':
						return undefined;

					default:
						return defaultRequestToExternal( request );
				}
			},
		} ),
		new WebpackBar( {
			name: 'WordPress Polyfills',
			color: '#21a0d0',
		} ),
	],
	entry: {
		'wp-i18n': './assets/src/polyfills/wp-i18n.js',
		'wp-dom-ready': './assets/src/polyfills/wp-dom-ready.js',
		'wp-polyfill': './assets/src/polyfills/wp-polyfill.js',
		'wp-server-side-render': './assets/src/polyfills/wp-server-side-render.js',
		'wp-url': './assets/src/polyfills/wp-url.js',
	},
};

module.exports = [
	// prettier-ignore
	blockEditor,
	classicEditor,
	customizer,
	wpPolyfills,
];
