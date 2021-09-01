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
 * Class Plugin_Base
 *
 * @package MaterialDesign
 */

namespace MaterialDesign\Plugin;

/**
 * Class Plugin_Base
 *
 * @package MaterialDesign
 */
abstract class Plugin_Base {

	/**
	 * Plugin config.
	 *
	 * @var array
	 */
	public $config = [];

	/**
	 * Plugin slug.
	 *
	 * @var string
	 */
	public $slug;

	/**
	 * Plugin directory path.
	 *
	 * @var string
	 */
	public $dir_path;

	/**
	 * Plugin directory URL.
	 *
	 * @var string
	 */
	public $dir_url;

	/**
	 * Directory in plugin containing autoloaded classes.
	 *
	 * @var string
	 */
	protected $autoload_class_dir = 'php';

	/**
	 * Autoload matches cache.
	 *
	 * @var array
	 */
	protected $autoload_matches_cache = [];

	/**
	 * Required instead of a static variable inside the add_doc_hooks method
	 * for the sake of unit testing.
	 *
	 * @var array
	 */
	protected $_called_doc_hooks = [];

	/**
	 * Plugin version.
	 *
	 * @var string
	 */
	protected $version;

	/**
	 * Plugin_Base constructor.
	 */
	public function __construct() {
		$location       = $this->locate_plugin();
		$this->slug     = $location['dir_basename'];
		$this->dir_path = $location['dir_path'];
		$this->dir_url  = $location['dir_url'];
		spl_autoload_register( [ $this, 'autoload' ] );
		$this->add_doc_hooks();
	}

	/**
	 * Plugin_Base destructor.
	 */
	public function __destruct() {
		$this->remove_doc_hooks();
	}

	/**
	 * Get reflection object for this class.
	 *
	 * @return \ReflectionObject
	 */
	public function get_object_reflection() {
		static $reflection;
		if ( empty( $reflection ) ) {
			// @codeCoverageIgnoreStart
			$reflection = new \ReflectionObject( $this );
			// @codeCoverageIgnoreEnd
		}

		return $reflection;
	}

	/**
	 * Autoload for classes that are in the same namespace as $this.
	 *
	 * @codeCoverageIgnore
	 *
	 * @param string $class Class name.
	 *
	 * @return void
	 */
	public function autoload( $class ) {
		if ( ! isset( $this->autoload_matches_cache[ $class ] ) ) {
			if ( ! preg_match( '/^(?P<namespace>.+)\\\\(?P<class>[^\\\\]+)$/', $class, $matches ) ) {
				$matches = false;
			}

			$this->autoload_matches_cache[ $class ] = $matches;
		} else {
			$matches = $this->autoload_matches_cache[ $class ];
		}

		if ( empty( $matches ) ) {
			return;
		}

		$namespace = $this->get_object_reflection()->getNamespaceName();

		if ( strpos( $matches['namespace'], $namespace ) === false ) {
			return;
		}

		$class_name = $matches['class'];
		$class_path = \trailingslashit( $this->dir_path );

		if ( $this->autoload_class_dir ) {
			$class_path .= \trailingslashit( $this->autoload_class_dir );

			$sub_path = str_replace( $namespace . '\\', '', $matches['namespace'] );
			if ( ! empty( $sub_path ) && 'MaterialDesign\Plugin' !== $sub_path ) {
				$class_path .= str_replace( '\\-', '/', strtolower( preg_replace( '/(?<!^)([A-Z])/', '-\\1', $sub_path ) ) . '/' );
			}
		}

		$class_path .= sprintf( 'class-%s.php', strtolower( str_replace( '_', '-', $class_name ) ) );

		if ( is_readable( $class_path ) ) {
			require_once $class_path;
		}
	}

	/**
	 * Version of plugin_dir_url() which works for plugins installed in the plugins directory,
	 * and for plugins bundled with themes.
	 *
	 * @return array
	 * @throws Exception If the plugin is not located in the expected location.
	 */
	public function locate_plugin() {
		$file_name = $this->get_object_reflection()->getFileName();

		// Windows compat.
		if ( '/' !== \DIRECTORY_SEPARATOR ) {
			// @codeCoverageIgnoreStart
			$file_name = str_replace( \DIRECTORY_SEPARATOR, '/', $file_name );
			// @codeCoverageIgnoreEnd
		}

		$plugin_dir  = dirname( dirname( $file_name ) );
		$plugin_path = $this->relative_path( $plugin_dir, basename( content_url() ), '/' );

		$dir_url      = content_url( trailingslashit( $plugin_path ) );
		$dir_path     = $plugin_dir;
		$dir_basename = basename( $plugin_dir );

		return compact( 'dir_url', 'dir_path', 'dir_basename' );
	}

	/**
	 * Relative Path
	 *
	 * Returns a relative path from a specified starting position of a full path
	 *
	 * @param string $path  The full path to start with.
	 * @param string $start The directory after which to start creating the relative path.
	 * @param string $sep   The directory separator.
	 *
	 * @return string
	 */
	public function relative_path( $path, $start, $sep ) {
		$path = explode( $sep, untrailingslashit( $path ) );
		if ( count( $path ) > 0 ) {
			foreach ( $path as $p ) {
				array_shift( $path );
				if ( $p === $start ) {
					break;
				}
			}
		}

		return implode( $sep, $path );
	}

	/**
	 * Get the public URL to the asset file.
	 *
	 * @param string $path_relative Path relative to this plugin directory root.
	 *
	 * @return string The URL to the asset.
	 */
	public function asset_url( $path_relative ) {
		return $this->dir_url . $path_relative;
	}

	/**
	 * Call trigger_error() if not on VIP production.
	 *
	 * @param string $message Warning message.
	 * @param int    $code    Warning code.
	 */
	public function trigger_warning( $message, $code = \E_USER_WARNING ) {
		if ( ! $this->is_wpcom_vip_prod() ) {
			// phpcs:disable
			trigger_error( esc_html( get_class( $this ) . ': ' . $message ), $code );
			// phpcs:enable
		}
	}

	/**
	 * Return whether we're on WordPress.com VIP production.
	 *
	 * @return bool
	 */
	public function is_wpcom_vip_prod() {
		return ( defined( '\WPCOM_IS_VIP_ENV' ) && \WPCOM_IS_VIP_ENV );
	}

	/**
	 * Is WP debug mode enabled.
	 *
	 * @return boolean
	 */
	public function is_debug() {
		return ( defined( '\WP_DEBUG' ) && \WP_DEBUG );
	}

	/**
	 * Is WP script debug mode enabled.
	 *
	 * @return boolean
	 */
	public function is_script_debug() {
		return ( defined( '\SCRIPT_DEBUG' ) && \SCRIPT_DEBUG );
	}

	/**
	 * Return the current version of the plugin.
	 *
	 * @return mixed
	 */
	public function version() {
		if ( $this->version ) {
			return $this->version;
		}
		$args = [
			'Version' => 'Version',
		];
		$meta = get_file_data( $this->dir_path . '/material-design.php', $args );

		$this->version = isset( $meta['Version'] ) ? $meta['Version'] : time();

		return $this->version;
	}

	/**
	 * Sync the plugin version with the asset version.
	 *
	 * @return string
	 */
	public function asset_version() {
		if ( $this->is_debug() || $this->is_script_debug() ) {
			return time();
		}

		return $this->version();
	}

	/**
	 * Hooks a function on to a specific filter.
	 *
	 * @param string $name     The hook name.
	 * @param array  $callback The class object and method.
	 * @param array  $args     An array with priority and arg_count.
	 *
	 * @return mixed
	 */
	public function add_filter(
		$name,
		$callback,
		$args = [
			'priority'  => 10,
			'arg_count' => PHP_INT_MAX,
		]
	) {
		return $this->add_hook( 'filter', $name, $callback, $args );
	}

	/**
	 * Hooks a function on to a specific action.
	 *
	 * @param string $name     The hook name.
	 * @param array  $callback The class object and method.
	 * @param array  $args     An array with priority and arg_count.
	 *
	 * @return mixed
	 */
	public function add_action(
		$name,
		$callback,
		$args = [
			'priority'  => 10,
			'arg_count' => PHP_INT_MAX,
		]
	) {
		return $this->add_hook( 'action', $name, $callback, $args );
	}

	/**
	 * Hooks a function on to a specific action/filter.
	 *
	 * @param string $type     The hook type. Options are action/filter.
	 * @param string $name     The hook name.
	 * @param array  $callback The class object and method.
	 * @param array  $args     An array with priority and arg_count.
	 *
	 * @return mixed
	 */
	protected function add_hook( $type, $name, $callback, $args = [] ) {
		$priority  = isset( $args['priority'] ) ? $args['priority'] : 10;
		$arg_count = isset( $args['arg_count'] ) ? $args['arg_count'] : PHP_INT_MAX;
		$fn        = sprintf( '\add_%s', $type );
		$retval    = \call_user_func( $fn, $name, $callback, $priority, $arg_count );

		return $retval;
	}

	/**
	 * Add actions/filters from the methods of a class based on DocBlocks.
	 *
	 * @param object $object The class object.
	 */
	public function add_doc_hooks( $object = null ) {
		if ( is_null( $object ) ) {
			$object = $this;
		}
		$class_name = get_class( $object );
		if ( isset( $this->_called_doc_hooks[ $class_name ] ) ) {
			$notice = sprintf( 'The add_doc_hooks method was already called on %s. Note that the Plugin_Base constructor automatically calls this method.', $class_name );
			if ( ! $this->is_wpcom_vip_prod() ) {
				// phpcs:disable
				trigger_error( esc_html( $notice ), \E_USER_NOTICE );
				// phpcs:enable
			}

			return;
		}
		$this->_called_doc_hooks[ $class_name ] = true;

		$reflector = new \ReflectionObject( $object );
		foreach ( $reflector->getMethods() as $method ) {
			$doc       = $method->getDocComment();
			$arg_count = $method->getNumberOfParameters();
			if ( preg_match_all( '#\* @(?P<type>filter|action)\s+(?P<name>[a-z0-9\-\._/=]+)(?:,\s+(?P<priority>\-?[0-9]+))?#', $doc, $matches, PREG_SET_ORDER ) ) {
				foreach ( $matches as $match ) {
					$type     = $match['type'];
					$name     = $match['name'];
					$priority = empty( $match['priority'] ) ? 10 : intval( $match['priority'] );
					$callback = [ $object, $method->getName() ];
					call_user_func( [ $this, "add_{$type}" ], $name, $callback, compact( 'priority', 'arg_count' ) );
				}
			}
		}
	}

	/**
	 * Removes the added DocBlock hooks.
	 *
	 * @param object $object The class object.
	 */
	public function remove_doc_hooks( $object = null ) {
		if ( is_null( $object ) ) {
			$object = $this;
		}
		$class_name = get_class( $object );

		$reflector = new \ReflectionObject( $object );
		foreach ( $reflector->getMethods() as $method ) {
			$doc = $method->getDocComment();
			if ( preg_match_all( '#\* @(?P<type>filter|action)\s+(?P<name>[a-z0-9\-\._/=]+)(?:,\s+(?P<priority>\-?[0-9]+))?#', $doc, $matches, PREG_SET_ORDER ) ) {
				foreach ( $matches as $match ) {
					$type     = $match['type'];
					$name     = $match['name'];
					$priority = empty( $match['priority'] ) ? 10 : intval( $match['priority'] );
					$callback = [ $object, $method->getName() ];
					call_user_func( "remove_{$type}", $name, $callback, $priority );
				}
			}
		}
		unset( $this->_called_doc_hooks[ $class_name ] );
	}
}
