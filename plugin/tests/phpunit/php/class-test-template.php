<?php
/**
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @package MaterialDesign
 */

/**
 * Tests for Template class.
 *
 * @package MaterialDesign
 */

namespace MaterialDesign\Plugin;

use MaterialDesign\Plugin\Template;
use function MaterialDesign\Plugin\get_plugin_instance;

/**
 * Tests for Template class.
 */
class Test_Template extends \WP_UnitTestCase {

	/**
	 * Theme dir path.
	 *
	 * @var string
	 */
	protected $theme_dir;

	/**
	 * Create template dir in default theme.
	 *
	 * @return void
	 */
	public function setUp() {
		parent::setUp();

		$this->theme_dir = DIR_TESTDATA . '/themedir1/default/';
		mkdir( $this->theme_dir . 'material-design' ); //phpcs:ignore
		mkdir( $this->theme_dir . 'custom-templates' ); //phpcs:ignore

		$content = '<h1>A simple card in material template. Vars: <?php echo wp_json_encode( $params ); ?></h1>';

		file_put_contents( $this->theme_dir . 'material-design/card.php', $content ); //phpcs:ignore
		file_put_contents( $this->theme_dir . 'custom-templates/card.php', $content ); //phpcs:ignore
	}

	/**
	 * Remove the template dir and the templates.
	 *
	 * @return void
	 */
	public function tearDown() {
		parent::tearDown();

		array_map( 'unlink', glob( $this->theme_dir . 'material-design/*.*' ) );
		array_map( 'unlink', glob( $this->theme_dir . 'custom-templates/*.*' ) );

		rmdir( $this->theme_dir . 'material-design' ); //phpcs:ignore
		rmdir( $this->theme_dir . 'custom-templates' ); //phpcs:ignore
	}

	/**
	 * Test get_template.
	 *
	 * @see Template::get_template()
	 */
	public function test_get_template() {
		$params = [
			'a' => 1,
			'b' => 2,
			'c' => [
				'd' => 4,
				'e' => 'E',
			],
		];

		ob_start();
		// Get template with dummy params.
		Template::get_template(
			'card.php',
			[
				'params' => $params,
			]
		);
		$content = ob_get_clean();

		// Assert template is included.
		$this->assertContains( '<h1>A simple card in material template.', $content );

		// Assert vars are extracted and passed to the template.
		$this->assertContains( wp_json_encode( $params ), $content );

		ob_start();
		// Get non-existing template.
		Template::get_template( 'card-does-not-exist.php' );
		$content = ob_get_clean();

		// Assert the template is not included.
		$this->assertEmpty( $content );
	}

	/**
	 * Test locate_template.
	 *
	 * @see Template::locate_template()
	 */
	public function test_locate_template() {
		// Assert the template is located from `theme/material-design/`.
		$template = Template::locate_template( 'card.php' );
		$this->assertEquals( $this->theme_dir . 'material-design/card.php', $template );

		// Assert the template is located from `theme/custom-templates/`.
		$template = Template::locate_template( 'card.php', 'custom-templates' );
		$this->assertEquals( $this->theme_dir . 'custom-templates/card.php', $template );

		// Assert the template is located from `plugin/php/templates/` as the template does not exist in the theme.
		$template = Template::locate_template( 'posts-list-grid.php' );
		$this->assertEquals( get_plugin_instance()->dir_path . '/php/templates/posts-list-grid.php', $template );

		// Assert the template is located from default_path if it's passed.
		$template = Template::locate_template( 'index.php', '', WP_CONTENT_DIR );
		$this->assertEquals( WP_CONTENT_DIR . '/index.php', $template );
	}

	/**
	 * Test template_path.
	 *
	 * @see Template::template_path()
	 */
	public function test_template_path() {
		$this->assertEquals( 'material-design/', Template::template_path() );
	}

	/**
	 * Test classnames.
	 *
	 * @see Template::classnames()
	 */
	public function test_classnames() {
		$classnames = [
			'class-1',
			'class-2' => true,
			'class-3' => false,
		];

		// Assert only classnames passing check condition or without the check condition are returned.
		$this->assertEquals( 'class-1 class-2', Template::classnames( $classnames ) );

		// Assert empty.
		$this->assertEmpty( Template::classnames( '' ) );
	}
}
