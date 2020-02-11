<?php
/**
 * Sample class.
 *
 * @package MaterialThemeBuilder
 */

namespace MaterialThemeBuilder\BazBar;

use MaterialThemeBuilder\Plugin;

/**
 * Sample class.
 */
class Sample {

	/**
	 * Plugin class.
	 *
	 * @var Plugin
	 */
	public $plugin;

	/**
	 * Constructor.
	 *
	 * @access public
	 *
	 * @param Plugin $plugin Plugin instance.
	 */
	public function __construct( Plugin $plugin ) {
		$this->plugin = $plugin;
	}

	/**
	 * Initiate the class.
	 *
	 * @access public
	 */
	public function init() {
		$this->plugin->add_doc_hooks( $this );
	}

	/**
	 * Demonstrate doc hooks.
	 *
	 * @filter body_class, 99, 1
	 *
	 * @param array $classes Body classes.
	 *
	 * @return array
	 */
	public function body_class( $classes ) {
		return array_merge( $classes, [ 'custom-class-name' ] );
	}
}
