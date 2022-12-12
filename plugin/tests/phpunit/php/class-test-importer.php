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
 * Tests for Importer class.
 *
 * @package MaterialDesign
 */

namespace MaterialDesign\Plugin;

use WP_UnitTest_Factory;
use MaterialDesign\Plugin\Plugin;

/**
 * Tests for Importer class.
 */
class Test_Importer extends \WP_UnitTestCase {
	/**
	 * Importer instance
	 *
	 * @var Importer
	 */
	private $importer;

	/**
	 * Plugin instance
	 *
	 * @var Plugin
	 */
	private $plugin;

	/**
	 * Setup.
	 *
	 * @inheritdoc
	 */
	public function setUp() {
		parent::setUp();
		$this->plugin   = get_plugin_instance();
		$this->importer = new Importer( $this->plugin );

		$this->importer->xml = \simplexml_load_file( $this->get_demo_test_file() );
	}

	/**
	 * Test get_import_file
	 *
	 * @see Importer::get_import_file()
	 */
	public function test_get_import_file() {
		$file = $this->importer->get_import_file();

		$this->assertEquals( $this->plugin->dir_path . '/assets/importer/demo-content.xml', $file );
	}

	/**
	 * Test get_menu_items
	 *
	 * @see Importer::get_menu_items()
	 */
	public function test_get_menu_items() {
		$items = $this->importer->get_menu_items();

		$this->assertCount( 5, $items );
	}

	/**
	 * Test import_terms
	 *
	 * @see Importer::import_terms()
	 */
	public function test_import_terms() {
		$this->importer->import_terms();

		$term = get_term_by( 'name', 'Primary', 'nav_menu' );

		$this->assertEquals( 'Primary', $term->name );
	}

	/**
	 * Test attach_meta_data
	 *
	 * @see Importer::attach_meta_data()
	 */
	public function test_attach_meta_data() {
		$post = $this->importer->xml->channel->item[0];

		$postmeta = $this->importer->attach_meta_data( $post );

		$this->assertArrayHasKey( '_material-design-demo-content', $postmeta );
	}

	/**
	 * Test insert_comments
	 *
	 * @see Importer::insert_comments()
	 */
	public function test_insert_comments() {
		$post = $this->importer->xml->channel->item[0];

		$test_post_id = $this->factory->post->create( [ 'post_title' => 'Test Post' ] );

		$comments = $this->importer->insert_comments( $post, $test_post_id );

		$this->assertNotEmpty( $comments );
	}

	/**
	 * Test insert_post
	 *
	 * @see Importer::insert_post()
	 */
	public function test_insert_post() {
		$post_data = [
			'post_title' => 'Test Post',
		];

		$post = $this->importer->xml->channel->item[0];

		$created_post = $this->importer->insert_post( $post_data, $post );

		$this->assertInternalType( 'int', $created_post );
		$this->assertNotEquals( 0, $created_post );
	}

	/**
	 * Test update_blog_info
	 *
	 * @see Importer::update_blog_info()
	 */
	public function test_update_blog_info() {
		$home_page = $this->factory->post->create(
			[
				'post_title' => 'Home',
				'post_type'  => 'page',
			]
		);
		$blog_page = $this->factory->post->create(
			[
				'post_title' => 'Blog',
				'post_type'  => 'page',
			]
		);

		$this->importer->update_blog_info();

		$this->assertEquals( 'page', get_option( 'show_on_front' ) );
		$this->assertEquals( $home_page, get_option( 'page_on_front' ) );
		$this->assertEquals( $blog_page, get_option( 'page_for_posts' ) );
	}

	/**
	 * Test kses_post
	 *
	 * @see Importer::kses_post()
	 */
	public function test_kses_post() {
		$content = '<div class="mdc-text-field-container"><div class="mdc-text-field mdc-text-field--outlined mdc-text-field--custom-full"><input id="material-design-name-0" name="material-design-name-0" type="text" required class="mdc-text-field__input" aria-labelledby="label-material-design-name-0" data-form="contact" data-meta="name" data-label="Name" /><div class="mdc-notched-outline"><div class="mdc-notched-outline__leading"></div><div class="mdc-notched-outline__notch"><label for="material-design-name-0" class="mdc-floating-label" id="label-material-design-name-0">Name</label></div><div class="mdc-notched-outline__trailing"></div></div></div></div>';

		$this->assertEquals( $content, $this->importer->kses_post( $content ) );

		$content = '<div class="wp-block-material-cards-collection alignwide" id="block-material-cards-collection-0"><div class="mdc-layout-grid layout-grid"><div class="mdc-layout-grid__inner"><div class="card-container mdc-layout-grid__cell--span-6"><div class="mdc-card material-design-card" style="border-radius:4px"><div class="mdc-card__primary-action material-design-card__primary-action mdc-ripple-upgraded" tabindex="0"><div tabindex="0" class="mdc-card__media mdc-card__media--16-9 material-design-card__media material-design-card-with-text-under-media" style="background-image:url(/wp-content/plugins/material-design/assets/images/featured.png)"></div><div class="material-design-card__primary"><h2 class="material-design-card__title title-large">Nulla libero ex</h2></div><div class="material-design-card__supporting-text material-design-card__supporting-text_text-under-media body-medium">Praesent non convallis tortor. Sed bibendum mauris vel nunc gravida ultrices. Sed elementum augue quis maximus ultrices quisque.</div></div></div></div><div class="card-container mdc-layout-grid__cell--span-6"><div class="mdc-card material-design-card" style="border-radius:4px"><div class="mdc-card__primary-action material-design-card__primary-action mdc-ripple-upgraded" tabindex="0"><div tabindex="0" class="mdc-card__media mdc-card__media--16-9 material-design-card__media material-design-card-with-text-under-media" style="background-image:url(/wp-content/plugins/material-design/assets/images/featured.png)"></div><div class="material-design-card__primary"><h2 class="material-design-card__title title-medium">Praesent non convallis</h2></div><div class="material-design-card__supporting-text material-design-card__supporting-text_text-under-media body-medium">Nullam suscipit, quam eget hendrerit dignissim, ante urna cursus felis, sit amet volutpat mauris arcu eget ante. Sed bibendum mauris vel nunc gravida ultrices.</div></div></div></div></div></div></div>';

		$this->assertEquals( $content, $this->importer->kses_post( $content ) );
	}

	/**
	 * Load a minified version of our demo content
	 *
	 * @return string path to demo test file
	 */
	private function get_demo_test_file() {
		return trailingslashit( $this->plugin->dir_path ) . 'assets/importer/demo-content.test.xml';
	}

	/**
	 * Test add_custom_css
	 *
	 * @see Importer::add_custom_css()
	 */
	public function test_add_custom_css() {
		$response = $this->importer->add_custom_css();

		$this->assertInternalType( 'int', $response );

		$added_css = wp_get_custom_css( Plugin::THEME_SLUG );

		$this->assertContains( '.home .entry-title { display: none; }', $added_css );
	}
}
