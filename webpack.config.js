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
const OptimizeCSSAssetsPlugin = require( 'css-minimizer-webpack-plugin' );
const RtlCssPlugin = require( 'rtlcss-webpack-plugin' );
const TerserPlugin = require( 'terser-webpack-plugin' );
const WebpackBar = require( 'webpackbar' );
const RemoveEmptyScriptsPlugin = require( 'webpack-remove-empty-scripts' );
const FixLineEndingsPlugin = require( './webpack/fix-line-endings-plugin' );
const { escapeRegExp } = require( 'lodash' );
const randomColor = require( 'randomcolor' );
const PROD = process.env.NODE_ENV === 'production';

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
	defaultConfig.module.rules.some( function ( rule ) {
		if ( rule.use && rule.use.includes( 'source-map-loader' ) ) {
			rule.exclude = /node_modules/;
			return true;
		}

		return false;
	} );
}

const assets = {
	plugin: [
		{
			name: 'Block Editor',
			chunk: 'block-editor',
			entry: [
				'./plugin/assets/src/block-editor/index.js',
				'./plugin/assets/css/src/block-editor.css',
			],
		},
		{
			name: 'Customizer',
			chunk: 'customizer',
			entry: {
				'customize-controls': [
					'./plugin/assets/src/customizer/customize-controls.js',
					'./plugin/assets/css/src/customize-controls.css',
				],
				'customize-preview': [
					'./plugin/assets/src/customizer/customize-preview.js',
					'./plugin/assets/css/src/customize-preview.css',
				],
			},
		},
		{
			name: 'Front End',
			chunk: 'front-end',
			entry: [
				'./plugin/assets/src/front-end/index.js',
				'./plugin/assets/css/src/front-end.css',
			],
		},
		{
			name: 'Front End with material theme ', // Remove duplicate css from theme when theme is active.
			chunk: 'front-end-w-theme',
			entry: [
				'./plugin/assets/src/front-end/index.js',
				'./plugin/assets/css/src/front-end-with-active-theme.css',
			],
		},
		{
			name: 'Admin',
			chunk: 'admin',
			entry: [
				'./plugin/assets/src/admin/index.js',
				'./plugin/assets/css/src/admin.css',
			],
		},
		{
			name: 'Overrides',
			chunk: 'overrides',
			entry: [ './plugin/assets/css/src/overrides.css' ],
		},
		{
			name: 'Wizard',
			chunk: 'wizard',
			entry: [
				'./plugin/assets/src/wizard/index.js',
				'./plugin/assets/css/src/wizard.css',
			],
		},
		{
			name: 'Getting Started',
			chunk: 'getting-started',
			entry: [
				'./plugin/assets/src/getting-started/index.js',
				'./plugin/assets/css/src/getting-started.css',
			],
		},
		{
			name: 'Settings',
			chunk: 'settings',
			entry: [
				'./plugin/assets/src/settings/index.js',
				'./plugin/assets/css/src/settings.css',
			],
		},
		{
			name: 'Admin M3 Color Migration',
			chunk: 'admin-m3-color-migration',
			entry: [ './plugin/assets/src/admin-m3-color-migration/index.js' ],
		},
		{
			name: 'Admin Notice M3 Migration',
			chunk: 'admin-notice-m3-migration',
			entry: [
				'./plugin/assets/src/admin-m3-color-migration/admin-notice',
			],
		},
	],
	theme: [
		{
			name: 'Customizer',
			chunk: 'customizer',
			entry: {
				'customize-controls': [
					'./theme/assets/src/customizer/customize-controls.js',
					'./theme/assets/css/src/customize-controls.css',
				],
				'customize-preview': [
					'./theme/assets/src/customizer/customize-preview.js',
					'./theme/assets/css/src/customize-preview.css',
				],
			},
		},
		{
			name: 'Block Editor',
			chunk: 'block-editor',
			entry: [ './theme/assets/src/block-editor/index.js' ],
		},
		{
			name: 'Front End',
			chunk: 'front-end',
			entry: [
				'./theme/assets/src/front-end/index.js',
				'./theme/assets/css/src/front-end.css',
			],
		},
		{
			name: 'Editor',
			chunk: 'editor',
			entry: [ './theme/assets/css/src/editor.css' ],
		},
	],
};

const getSharedConfig = ( packageType, isBlockEditor ) => {
	const config = {
		...defaultConfig,
		...{
			output: {
				path: path.resolve(
					process.cwd(),
					packageType,
					'assets',
					'js'
				),
				filename: `[name]${
					packageType === 'theme' && PROD ? '.min' : ''
				}.js`,
				chunkFilename: `[name]${
					packageType === 'theme' && PROD ? '.min' : ''
				}.js`,
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
					{
						test: /\.m?js/,
						resolve: {
							fullySpecified: false,
						},
					},
				],
			},
			plugins: [
				// Remove the CleanWebpackPlugin and FixStyleWebpackPlugin plugins from `@wordpress/scripts` due to version conflicts.
				...defaultConfig.plugins.filter(
					plugin =>
						( isBlockEditor || packageType === 'plugin' ) &&
						! [
							'CleanWebpackPlugin',
							'FixStyleWebpackPlugin',
						].includes( plugin.constructor.name )
				),
				new MiniCssExtractPlugin( {
					filename: `../css/[name]-compiled${
						packageType === 'theme' && PROD ? '.min' : ''
					}.css`,
				} ),
				new RtlCssPlugin( {
					filename: `../css/[name]-compiled${
						packageType === 'theme' && PROD ? '.min' : ''
					}-rtl.css`,
				} ),
				new RemoveEmptyScriptsPlugin(),
				//				new FixStyleOnlyEntriesPlugin(),
			],
			resolve: {
				alias: {
					'bn.js': path.resolve( __dirname, 'node_modules/bn.js' ),
				},
			},
		},
	};

	if ( packageType === 'theme' ) {
		config.plugins = [ ...config.plugins, new FixLineEndingsPlugin() ];
	}

	return config;
};

const webpackConfigs = [];
Object.keys( assets ).forEach( packageType => {
	assets[ packageType ].forEach( asset => {
		const isBlockEditor = asset.chunk === 'block-editor';
		const config = getSharedConfig( packageType, isBlockEditor );
		config.entry = Array.isArray( asset.entry )
			? {
					[ asset.chunk ]: asset.entry,
			  }
			: asset.entry;

		config.plugins = [
			...config.plugins,
			new WebpackBar( {
				name: `${ packageType }: ${ asset.name }`,
				color: randomColor( { luminosity: 'light' } ),
			} ),
		];

		if (
			asset.hasOwnProperty( 'toBundle' ) &&
			Array.isArray( asset.toBundle )
		) {
			config.plugins = [
				...config.plugins.filter(
					// Remove the `DependencyExtractionWebpackPlugin` if it already exists.
					plugin =>
						! (
							plugin instanceof DependencyExtractionWebpackPlugin
						)
				),
				new DependencyExtractionWebpackPlugin( {
					useDefaults: false,
					requestToExternal( request ) {
						if ( asset.toBundle.includes( request ) ) {
							return undefined;
						}

						return defaultRequestToExternal( request );
					},
					requestToHandle( request ) {
						if ( asset.toBundle.includes( request ) ) {
							return 'wp-block-editor'; // Return block-editor as a dep.
						}

						return defaultRequestToHandle( request );
					},
				} ),
			];
		}

		if ( isBlockEditor && packageType === 'plugin' ) {
			config.plugins = [
				...config.plugins,
				new CopyWebpackPlugin( {
					patterns: [
						{
							from: `./${ packageType }/assets/src/block-editor/blocks/*/block.json`,
							to: './blocks/[1]/block.json',
							transformPath( targetPath, absolutePath ) {
								const matches = absolutePath.match(
									new RegExp(
										`([\\w-]+)${ escapeRegExp(
											path.sep
										) }block\\.json$`
									)
								);

								if ( matches ) {
									return targetPath.replace(
										'[1]',
										matches[ 1 ]
									);
								}

								return targetPath;
							},
						},
					],
				} ),
			];
		}

		webpackConfigs.push( config );
	} );
} );

module.exports = webpackConfigs;
