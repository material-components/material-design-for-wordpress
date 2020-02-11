<?php
/**
 * Instantiates the Material Theme Builder plugin
 *
 * @package MaterialThemeBuilder
 */

namespace MaterialThemeBuilder;

global $material_theme_builder_plugin;

require_once __DIR__ . '/php/class-plugin-base.php';
require_once __DIR__ . '/php/class-plugin.php';

$material_theme_builder_plugin = new Plugin();

/**
 * Material Theme Builder Plugin Instance
 *
 * @return Plugin
 */
function get_plugin_instance() {
	global $material_theme_builder_plugin;
	return $material_theme_builder_plugin;
}
