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

module.exports = function ( grunt ) {
	'use strict';

	// prettier-ignore
	grunt.initConfig( {
		// Build a deploy-able plugin.
		copy: {
			plugin: {
				src: [
					'plugin/**',
					'!plugin/.*',
					'!plugin/.*/**',
					'!plugin/**/._.DS_Store',
					'!plugin/**/.DS_Store',
					'!plugin/assets/css/src/**',
					'!plugin/assets/css/*.map',
					'!plugin/assets/js/.gitignore',
					'!plugin/assets/js/*.css',
					'!plugin/assets/js/*.map',
					'!plugin/assets/src/**',
					'!plugin/assets/images/png/**',
					'!plugin/assets/images/jpg/**',
					'!plugin/tests/**',
					'!plugin/composer*',
					'!plugin/readme.md',
					'!plugin/vendor/**',
					'!plugin/phpunit.xml',
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
					'!vendor/**',
					'!webpack.config.js',
					'!webpack/**',
				],
				dest: 'build',
				expand: true,
				dot: true,
			},
			theme: {
				src: [
					'theme/**',
					'!theme/.*',
					'!theme/.*/**',
					'!theme/**/._.DS_Store',
					'!theme/**/.DS_Store',
					'!theme/assets/css/src/**',
					'!theme/assets/css/*.map',
					'!theme/assets/js/.gitignore',
					'!theme/assets/js/*.css',
					'!theme/assets/js/*.map',
					'!theme/assets/js/editor*',
					'!theme/assets/src/**',
					'!theme/tests/**',
					'!theme/wp-assets/**',
					'!theme/composer*',
					'!theme/readme.md',
					'!theme/vendor/**',
					'!theme/phpunit.xml',
					'!bin/**',
					'!build/**',
					'!built/**',
					'!code_of_conduct.md',
					'!CONTRIBUTING.md',
					'!contributing/**',
					'!composer.json',
					'!composer.lock',
					'!contributing.md',
					'!docker-compose.yml',
					'!docker-compose-plugin-dev.yml',
					'!material-design-google.zip',
					'!Gruntfile.js',
					'!jest.config.js',
					'!node_modules/**',
					'!npm-debug.log',
					'!package.json',
					'!package-lock.json',
					'!phpcs.xml',
					'!phpcs.xml.dist',
					'!phpunit.xml',
					'!postcss.config.js',
					'!README.md',
					'!renovate.json',
					'!vendor/**',
					'!webpack.config.js',
					'!webpack/**',
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
					'plugin/assets/js/*.js',
					'plugin/assets/js/*.js.map',
					'plugin/assets/js/*.asset.php',
					'plugin/assets/css/*.css',
					'!plugin/assets/css/src/*',
					'plugin/assets/css/*.css.map',
					'theme/assets/js/*.js',
					'theme/assets/js/*.js.map',
					'theme/assets/js/*.asset.php',
					'theme/assets/css/*.css',
					'!theme/assets/css/src/*',
					'theme/assets/css/*.css.map',
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
			create_plugin_zip: {
				command: 'if [ ! -e build ]; then echo "Run grunt build first."; exit 1; fi; if [ -e material-design.zip ]; then rm material-design.zip; fi; mv build/plugin ./material-design; zip -r ./material-design.zip ./material-design; mv ./material-design build/plugin; echo; echo "ZIP of build: $(pwd)/material-design.zip"',
			},
			create_theme_zip: {
				command: 'if [ ! -e build ]; then echo "Run grunt build first."; exit 1; fi; if [ -e material-design-google.zip ]; then rm material-design-google.zip; fi; mv build/theme ./material-design-google; zip -r ./material-design-google.zip ./material-design-google; mv ./material-design-google build/theme; echo; echo "ZIP of build: $(pwd)/material-design-google.zip"',
			},
		},

		// Deploys a git Repo to the WordPress SVN repo.
		wp_deploy: {
			deploy: {
				options: {
					plugin_slug: 'material-design',
					build_dir: 'build/plugin',
				  	assets_dir: 'plugin/wp-assets',
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
		const filePath = 'plugin/assets/fonts/icons.json';
		const iconFile = grunt.file.read(
			'plugin/assets/fonts/icons.codepoints'
		);
		const iconItems = iconFile.split( /\r?\n/g );
		const icons = {
			icons: {},
		};

		if ( iconItems ) {
			iconItems.forEach( item => {
				const iconArray = item.split( /\s/g );

				icons.icons[ iconArray[ 1 ] ] = {
					id: iconArray[ 1 ],
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

	grunt.registerTask( 'build', [ 'readme', 'icon_mapping', 'copy' ] );

	grunt.registerTask( 'create-build-zip', [
		'shell:create_plugin_zip',
		'shell:create_theme_zip',
	] );

	grunt.registerTask( 'deploy', [ 'build', 'wp_deploy', 'clean' ] );
};
