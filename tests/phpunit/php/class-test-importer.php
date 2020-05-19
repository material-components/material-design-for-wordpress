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
}
