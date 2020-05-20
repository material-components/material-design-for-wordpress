<?php
/**
 * Tests for Importer class.
 *
 * @package MaterialThemeBuilder
 */

namespace MaterialThemeBuilder;

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
	}

	/**
	 * Test get_import_file
	 *
	 * @see Importer::get_import_file()
	 */
	public function test_get_import_file() {
		$file = $this->importer->get_import_file();

		$this->assertEquals( $this->plugin->dir_path . '/assets/demo-content.xml', $file );
	}

	/**
	 * Test get_image_file
	 *
	 * @see Importer::get_image_file()
	 */
	public function get_image_file() {
		$file = $this->importer->get_image_file();

		$this->assertEquals( $this->plugin->dir_url . '/assets/images/featured.png', $file );
	}
	
	/**
	 * Test render_page
	 *
	 * @see Importer::render_page()
	 */
	public function test_render_page() {
		$output = $this->importer->render_page();

		$this->assertContains( '<div class="notice notice-warning material-notice-container">', $output );
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
	 * Test get_left_widgets
	 *
	 * @see Importer::get_left_widgets()
	 */
	public function test_get_left_widgets() {
		$widgets = $this->importer->get_left_widgets();

		$this->assertCount( 1, $widgets );
	}

	/**
	 * Test get_right_widgets
	 *
	 * @see Importer::get_right_widgets()
	 */
	public function test_get_right_widgets() {
		$widgets = $this->importer->get_right_widgets();

		$this->assertCount( 2, $widgets );
	}
	
	/**
	 * Test build_widget_ids
	 *
	 * @see Importer::build_widget_ids()
	 */
	public function test_build_widget_ids() {
		$widgets = [
			[
				'title' => '',
			],
			[
				'title' => '',
			],
		];

		$expected = [
			'search-0',
			'search-1',
		];

		$this->assertEquals( $expected, $this->importer->build_widget_ids( $widgets, 'search' ) );
	}
}
