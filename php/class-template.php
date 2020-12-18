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
 * Template functions.
 *
 * @package MaterialDesign
 */

namespace MaterialDesign\Plugin;

/**
 * Template functions.
 */
class Template {

	/**
	 * Include template from theme or plugin.
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
	 * Locate a template file and return the path.
	 *
	 * This is the load order:
	 *
	 * yourtheme/{$template_path OR material-design}/$template_name
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
		$template = locate_template( trailingslashit( $template_path ) . $template_name );

		if ( empty( $template ) ) {
			$template = trailingslashit( $default_path ) . $template_name;
		}

		return apply_filters( 'material_design_locate_template', $template, $template_name, $default_path );
	}

	/**
	 * Get the template path.
	 *
	 * @return string
	 */
	public static function template_path() {
		return apply_filters( 'material_design_template_path', 'material-design/' );
	}

	/**
	 * Conditionally return classnames.
	 *
	 * @param  array $classes Array of classnames or class => condition checks.
	 * @return string
	 */
	public static function classnames( $classes ) {

		if ( empty( $classes ) || ! is_array( $classes ) ) {
			return (string) $classes;
		}

		$classnames = [];
		foreach ( $classes as $key => $value ) {
			if ( is_numeric( $key ) ) {
				$classnames[] = $value;
			} elseif ( ! empty( $value ) ) {
				$classnames[] = $key;
			}
		}

		return implode( ' ', $classnames );
	}
}
