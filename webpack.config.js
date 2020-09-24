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
} = require( '@wordpress/dependency-extraction-webpack-plugin/util' );

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

// These packages need to be bundled and not extracted to `wp.*`.
const PACKAGES_TO_BUNDLE = [ '@wordpress/rich-text' ];

const blockEditor = {
	...defaultConfig,
	...sharedConfig,
	entry: {
		'block-editor': [
			'./assets/src/block-editor',
			'./assets/css/src/block-editor.css',
		],
		button: './assets/src/block-editor/blocks/button/style.css',
		'button-editor': [
			'./assets/src/block-editor/blocks/button/register',
			'./assets/src/block-editor/blocks/button/editor.css',
		],
		buttons: [
			'./assets/src/block-editor/blocks/buttons/style.css',
			'./assets/src/block-editor/blocks/buttons/frontend',
		],
		'buttons-editor': [
			'./assets/src/block-editor/blocks/buttons/register',
			'./assets/src/block-editor/blocks/buttons/editor.css',
		],
		card: './assets/src/block-editor/blocks/card/style.css',
		'card-editor': [
			'./assets/src/block-editor/blocks/card/register',
			'./assets/src/block-editor/blocks/card/editor.css',
		],
		'cards-collection-editor': [
			'./assets/src/block-editor/blocks/cards-collection/register',
			'./assets/src/block-editor/blocks/cards-collection/editor.css',
		],
		'contact-form': './assets/src/block-editor/blocks/contact-form/frontend',
		'contact-form-editor': [
			'./assets/src/block-editor/blocks/contact-form/register',
			'./assets/src/block-editor/blocks/contact-form/editor.css',
			'./assets/src/block-editor/blocks/contact-form/inner-blocks/email-input-field',
			'./assets/src/block-editor/blocks/contact-form/inner-blocks/message-input-field',
			'./assets/src/block-editor/blocks/contact-form/inner-blocks/name-input-field',
			'./assets/src/block-editor/blocks/contact-form/inner-blocks/short-text-input-field',
			'./assets/src/block-editor/blocks/contact-form/inner-blocks/website-input-field',
		],
		'data-table': './assets/src/block-editor/blocks/data-table/style.css',
		'data-table-editor': [
			'./assets/src/block-editor/blocks/data-table/register',
			'./assets/src/block-editor/blocks/data-table/editor.css',
		],
		'hand-picked-posts': [
			'./assets/src/block-editor/blocks/hand-picked-posts/style.css',
		],
		'hand-picked-posts-editor': [
			'./assets/src/block-editor/blocks/hand-picked-posts/register',
			'./assets/src/block-editor/blocks/hand-picked-posts/editor.css',
		],
		'image-list': './assets/src/block-editor/blocks/image-list/style.css',
		'image-list-editor': [
			'./assets/src/block-editor/blocks/image-list/register',
			'./assets/src/block-editor/blocks/image-list/editor.css',
		],
		list: [ './assets/src/block-editor/blocks/list/style.css' ],
		'list-editor': [
			'./assets/src/block-editor/blocks/list/register',
			'./assets/src/block-editor/blocks/list/editor.css',
		],
		'recent-posts': './assets/src/block-editor/blocks/recent-posts/style.css',
		'recent-posts-editor': [
			'./assets/src/block-editor/blocks/recent-posts/register',
		],
		'tab-bar': [
			'./assets/src/block-editor/blocks/tab-bar/frontend',
			'./assets/src/block-editor/blocks/tab-bar/style.css',
		],
		'tab-bar-editor': [
			'./assets/src/block-editor/blocks/tab-bar/register',
			'./assets/src/block-editor/blocks/tab-bar/editor.css',
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

const materialCssPackages = [
	'@material/button/dist/mdc.button.css',
	'@material/card/dist/mdc.card.css',
	'@material/data-table/dist/mdc.data-table.css',
	'@material/icon-button/dist/mdc.icon-button.css',
	'@material/image-list/dist/mdc.image-list.css',
	'@material/layout-grid/dist/mdc.layout-grid.css',
	'@material/list/dist/mdc.list.css',
	'@material/tab/dist/mdc.tab.css',
	'@material/tab-bar/dist/mdc.tab-bar.css',
	'@material/tab-indicator/dist/mdc.tab-indicator.css',
	'@material/tab-scroller/dist/mdc.tab-scroller.css',
	'@material/textfield/dist/mdc.textfield.css',
	'@material/typography/dist/mdc.typography.css',
];
const materialCss = {
	...defaultConfig,
	...sharedConfig,
	entry: materialCssPackages.reduce( ( entryConfig, packagePath ) => {
		const packageHandle = `mdc-${ packagePath
			.split( 'mdc.' )[ 1 ]
			.replace( '.css', '' ) }`;
		return {
			...entryConfig,
			[ packageHandle ]: packagePath,
		};
	}, {} ),
	plugins: [
		...sharedConfig.plugins,
		new WebpackBar( {
			name: 'Material CSS',
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
	materialCss,
];
