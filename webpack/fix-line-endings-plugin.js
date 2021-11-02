const sources = require( 'webpack-sources' );

module.exports = class FixLineEndingsPlugin {
	constructor() {
		this.pluginOptions = {
			name: FixLineEndingsPlugin.name,
		};
	}

	apply( compiler ) {
		compiler.hooks.compilation.tap( this.pluginOptions, compilation => {
			compilation.hooks.afterOptimizeAssets.tap(
				this.pluginOptions,
				assets => {
					Object.keys( assets ).forEach( fileName => {
						if ( ! fileName || '*' === fileName ) {
							return;
						}

						let content = assets[ fileName ].source();
						content = content.replace( /\r/g, '' ); // Replace any CRLF to LF endings.
						assets[ fileName ] = new sources.RawSource( content );
					} );
				}
			);
		} );
	}
};
