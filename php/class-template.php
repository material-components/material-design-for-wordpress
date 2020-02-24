<?php
/**
 * Template functions.
 *
 * @package MaterialThemeBuilder
 */

namespace MaterialThemeBuilder;

/**
 * Template functions.
 */
class Template {

	/**
	 * Include template from plugin.
	 *
	 * @param string $template_name Name of the template.
	 * @param array  $args Vars to be passed to the template.
	 * @param string $template_path Template path in the theme.
	 * @param string $default_path  Default path.
	 * @return void
	 */
	public static function get_template( $template_name, $args = [], $template_path = '', $default_path = '' ) {
		if ( is_array( $args ) && isset( $args ) ) {
			extract( $args );
		}

		$template_file = self::locate_template( $template_name, $template_path, $default_path );

		if ( file_exists( $template_file ) ) {
			include $template_file;
		}
	}

	/**
	 * Locate a template file and retunr the path.
	 *
	 * This is the load order:
	 *
	 * yourtheme/{$template_path OR material-theme}/$template_name
	 * yourtheme/$template_name
	 * $default_path/$template_name
	 *
	 * @param  string $template_name Name of the template.
	 * @param string $template_path Template path.
	 * @param string $default_path  Default path.
	 * @return string
	 */
	public static function locate_template( $template_name, $template_path = '', $default_path = '' ) {

		if ( empty( $template_path ) ) {
			$template_path = self::template_path();
		}

		if ( empty( $default_path ) ) {
			$default_path = plugin_dir_path( __FILE__ ) . 'templates/';
		}

		// Look within passed path within the theme - this is priority.
		$template = locate_template(
			array(
				trailingslashit( $template_path ) . $template_name,
				$template_name,
			)
		);

		if ( empty( $template ) ) {
			$template = $default_path . $template_name;
		}

		return apply_filters( 'mtb_locate_template', $template, $template_name, $default_path );
	}

	/**
	 * Get the template path.
	 *
	 * @return string
	 */
	public static function template_path() {
		return apply_filters( 'mtb_template_path', 'material-theme/' );
	}
}
