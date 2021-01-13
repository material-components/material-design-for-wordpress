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

/**
 * External dependencies
 */
const path = require( 'path' );
const CopyWebpackPlugin = require( 'copy-webpack-plugin' );
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );
const OptimizeCSSAssetsPlugin = require( 'optimize-css-assets-webpack-plugin' );
const RtlCssPlugin = require( 'rtlcss-webpack-plugin' );
const TerserPlugin = require( 'terser-webpack-plugin' );
const WebpackBar = require( 'webpackbar' );
const FixStyleOnlyEntriesPlugin = require( 'webpack-fix-style-only-entries' );
const { escapeRegExp } = require( 'lodash' );

/**
 * WordPress dependencies
 */
const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );
const DependencyExtractionWebpackPlugin = require( '@wordpress/dependency-extraction-webpack-plugin' );
const {
	defaultRequestToExternal,
	defaultRequestToHandle,
} = require( '@wordpress/dependency-extraction-webpack-plugin/lib/util' );

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
			// Remove the css/postcss loaders from `@wordpress/scripts` due to version conflicts.
			...defaultConfig.module.rules.filter(
				rule => ! rule.test.toString().match( '.css' )
			),
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
		// Remove the CleanWebpackPlugin and FixStyleWebpackPlugin plugins from `@wordpress/scripts` due to version conflicts.
		...defaultConfig.plugins.filter(
			plugin =>
				! [ 'CleanWebpackPlugin', 'FixStyleWebpackPlugin' ].includes(
					plugin.constructor.name
				)
		),
		new MiniCssExtractPlugin( {
			filename: '../css/[name]-compiled.css',
		} ),
		new RtlCssPlugin( {
			filename: '../css/[name]-compiled-rtl.css',
		} ),
	],
	resolve: {
		alias: {
			'bn.js': path.resolve( __dirname, 'node_modules/bn.js' ),
		},
	},
};

// These packages need to be bundled and not extracted to `wp.*`.
const PACKAGES_TO_BUNDLE = [];

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
		...sharedConfig.plugins.filter(
			// Remove the `DependencyExtractionWebpackPlugin` if it already exists.
			plugin => ! ( plugin instanceof DependencyExtractionWebpackPlugin )
		),
		new CopyWebpackPlugin( {
			patterns: [
				{
					from: './assets/src/block-editor/blocks/*/block.json',
					to: './blocks/[1]/block.json',
					transformPath( targetPath, absolutePath ) {
						const matches = absolutePath.match(
							new RegExp(
								`([\\w-]+)${ escapeRegExp( path.sep ) }block\\.json$`
							)
						);

						if ( matches ) {
							return targetPath.replace( '[1]', matches[ 1 ] );
						}

						return targetPath;
					},
				},
			],
		} ),
		new DependencyExtractionWebpackPlugin( {
			useDefaults: false,
			requestToExternal( request ) {
				if ( PACKAGES_TO_BUNDLE.includes( request ) ) {
					return undefined;
				}

				return defaultRequestToExternal( request );
			},
			requestToHandle( request ) {
				if ( PACKAGES_TO_BUNDLE.includes( request ) ) {
					return 'wp-block-editor'; // Return block-editor as a dep.
				}

				return defaultRequestToHandle( request );
			},
		} ),
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
		...defaultConfig.plugins,
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

const admin = {
	...defaultConfig,
	...sharedConfig,
	entry: {
		admin: [ './assets/src/admin/index.js', './assets/css/src/admin.css' ],
	},
	plugins: [
		...sharedConfig.plugins,
		new WebpackBar( {
			name: 'admin',
			color: '#36f271',
		} ),
	],
};

const overrides = {
	...defaultConfig,
	...sharedConfig,
	entry: {
		overrides: [ './assets/css/src/overrides.css' ],
	},
	plugins: [
		...sharedConfig.plugins,
		new FixStyleOnlyEntriesPlugin(),
		new WebpackBar( {
			name: 'Overrides',
			color: '#a81773',
		} ),
	],
};

const wizard = {
	...defaultConfig,
	...sharedConfig,
	entry: {
		wizard: [ './assets/src/wizard/index.js', './assets/css/src/wizard.css' ],
	},
	plugins: [
		...sharedConfig.plugins,
		new WebpackBar( {
			name: 'wizard',
			color: '#707a8a', // 🧙🏼‍♂️
		} ),
	],
};

// Getting Started Module.
const gsm = {
	...defaultConfig,
	...sharedConfig,
	entry: {
		'getting-started': [
			'./assets/src/getting-started/index.js',
			'./assets/css/src/getting-started.css',
		],
	},
	plugins: [
		...sharedConfig.plugins,
		new WebpackBar( {
			name: 'Getting Started',
			color: '#3ce1bb',
		} ),
	],
};

module.exports = [
	// prettier-ignore
	blockEditor,
	customizer,
	frontEnd,
	admin,
	overrides,
	wizard,
	gsm,
];
