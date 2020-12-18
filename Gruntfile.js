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

/* eslint-env node */

module.exports = function( grunt ) {
	'use strict';

	// prettier-ignore
	grunt.initConfig( {
		// Build a deploy-able plugin.
		copy: {
			build: {
				src: [
					'**',
					'!.*',
					'!.*/**',
					'!**/._.DS_Store',
					'!**/.DS_Store',
					'!assets/css/src/**',
					'!assets/js/.gitignore',
					'!assets/src/**',
					'!assets/images/png/**',
					'!assets/images/jpg/**',
					'!bin/**',
					'!build/**',
					'!built/**',
					'!code_of_conduct.md',
					'!contributing/**',
					'!composer.json',
					'!composer.lock',
					'!contributing.md',
					'!docker-compose.yml',
					'!material-design.zip',
					'!Gruntfile.js',
					'!jest.config.js',
					'!node_modules/**',
					'!npm-debug.log',
					'!package.json',
					'!package-lock.json',
					'!phpcs.xml',
					'!phpunit.xml',
					'!postcss.config.js',
					'!readme.md',
					'!renovate.json',
					'!tests/**',
					'!vendor/**',
					'!webpack.config.js',
				],
				dest: 'build',
				expand: true,
				dot: true,
			},
		},

		// Clean up the build.
		clean: {
			compiled: {
				src: [
					'assets/js/*.js',
					'assets/js/*.js.map',
					'assets/js/*.asset.php',
					'assets/css/*.css',
					'!assets/css/src/*',
					'assets/css/*.css.map',
				],
			},
			build: {
				src: [ 'build' ],
			},
		},

		// Shell actions.
		shell: {
			options: {
				stdout: true,
				stderr: true,
			},
			readme: {
				command: './vendor/xwp/wp-dev-lib/scripts/generate-markdown-readme', // Generate the readme.md.
			},
			create_build_zip: {
				command: 'if [ ! -e build ]; then echo "Run grunt build first."; exit 1; fi; if [ -e material-design.zip ]; then rm material-design.zip; fi; mv build material-design; zip -r ./material-design.zip material-design; mv material-design build; echo; echo "ZIP of build: $(pwd)/material-design.zip"',
			},
		},

		// Deploys a git Repo to the WordPress SVN repo.
		wp_deploy: {
			deploy: {
				options: {
					plugin_slug: 'material-design',
					build_dir: 'build',
				  	assets_dir: 'wp-assets',
				},
			},
		},
	} );

	// Load tasks.
	grunt.loadNpmTasks( 'grunt-contrib-clean' );
	grunt.loadNpmTasks( 'grunt-contrib-copy' );
	grunt.loadNpmTasks( 'grunt-shell' );
	grunt.loadNpmTasks( 'grunt-wp-deploy' );

	// Register custom tasks.
	grunt.registerTask( 'icon_mapping', 'Turn codepoints into JSON', () => {
		const filePath = 'assets/fonts/icons.json';
		const iconFile = grunt.file.read( 'assets/fonts/icons.codepoints' );
		const iconItems = iconFile.split( /\r?\n/g );
		const icons = {
			icons: {},
		};

		if ( iconItems ) {
			iconItems.forEach( item => {
				const iconArray = item.split( /\s/g );

				icons.icons[ iconArray[ 1 ] ] = {
					name: iconArray[ 0 ],
				};
			} );
		}

		grunt.file.delete( filePath );
		grunt.file.write( filePath, JSON.stringify( icons ) );
	} );

	// Register tasks.
	grunt.registerTask( 'default', [ 'build' ] );

	grunt.registerTask( 'readme', [ 'shell:readme' ] );

	grunt.registerTask( 'build', [ 'readme', 'copy', 'icon_mapping' ] );

	grunt.registerTask( 'create-build-zip', [ 'shell:create_build_zip' ] );

	grunt.registerTask( 'deploy', [ 'build', 'wp_deploy', 'clean' ] );
};
