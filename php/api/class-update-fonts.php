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
 * Class Google Fonts API .
 *
 * @package MaterialDesign
 */

namespace MaterialDesign\Plugin\Api;

use Exception;
use stdClass;
use function json_decode;
use function MaterialDesign\Plugin\get_plugin_instance;

/**
 * Class Update_Fonts
 *
 * @package MaterialDesign\Plugin\Api
 */
class Update_Fonts extends Updates_API_Base {

	const TRANSIENT = 'google-fonts-json';

	/**
	 * Holds the Google Fonts API key.
	 *
	 * @var string|null
	 */
	protected $api_key;

	/**
	 * Whether to force loading from HTTP.
	 *
	 * @var bool
	 */
	public $force_http;

	/**
	 * Update_Fonts constructor.
	 *
	 * @param bool   $force_http Whether to force loading from HTTP. Defaults to false.
	 * @param string $api_key    Manually pass in a Google API key. Defaults to false.
	 */
	public function __construct( $force_http = false, $api_key = false ) {
		parent::__construct();

		$this->force_http = $force_http;

		if ( ! empty( $api_key ) ) {
			$this->api_key = $api_key;
		} elseif ( defined( 'GOOGLE_FONTS_API_KEY' ) && false !== GOOGLE_FONTS_API_KEY ) {
			$this->api_key = GOOGLE_FONTS_API_KEY;
		} else {
			$this->api_key = '';
		}

		if ( empty( $this->api_key ) ) {
			_material_design_error( '_material_design_no_apikey_textonly', $this->material_design_no_apikey() );
		}

		$this->endpoint        = sprintf( 'https://www.googleapis.com/webfonts/v1/webfonts?key=%s&fields=items(category,variants,family)', $this->api_key );
		$this->local_file_path = get_plugin_instance()->dir_path . '/assets/fonts/google-fonts.json';
	}

	/**
	 * Checks if transient exists. If it does, return the contents of `assets/fonts/google-fonts.json`. If transient doesn't
	 * exist or is expired, retrieve from Google Fonts API and store as `assets/fonts/google-fonts.json`
	 *
	 * @param bool $write_output Whether to short-circuit file writing.
	 *
	 * @return string
	 * @throws Exception An exception.
	 */
	public function get_fonts( $write_output = true ) {
		$data       = new stdClass();
		$data->data = [];
		$new        = null;

		if ( ! empty( $this->api_key ) && ( false === get_transient( self::TRANSIENT ) || true === $this->force_http ) ) {
			$json = $this->get_http_response();

			if ( ! empty( $json ) ) {
				$fonts = $this->json_to_file( $json, $write_output );
				$new   = json_decode( $fonts );
			}

			set_transient( self::TRANSIENT, time(), DAY_IN_SECONDS );
		}

		// If we still don't have fonts, fetch from local.
		if ( empty( $new ) ) {
			$new = file_get_contents( get_plugin_instance()->dir_path . '/assets/fonts/google-fonts.json' );
			$new = json_decode( $new );
		}

		foreach ( $new as $name => $font ) {
			$data->data[] = (object) [
				'id'   => esc_attr( strtolower( $name ) ),
				'name' => esc_html( $name ),
			];
		}

		return $data;
	}

	/**
	 * Take Google Fonts JSON and turns it into our local format, then write to local file store
	 *
	 * @param string $json           A JSON string.
	 * @param bool   $write_response Whether to write the file contents.
	 *
	 * @return false|stdClass|string
	 */
	public function json_to_file( $json, $write_response = true ) {
		$data = json_decode( $json );

		$fonts = new stdClass();

		// Bail if there are no items to prevent writing emptiness to the local file.
		if ( empty( $data->items ) ) {
			return '';
		}

		foreach ( $data->items as $font ) {
			$item['variants'] = $font->variants;

			if ( ! empty( $font->category ) ) {
				$item['category'] = $font->category;
			}

			$fonts->{$font->family} = (object) $item;
		}

		$fonts = wp_json_encode( $fonts, JSON_PRETTY_PRINT );
		if ( ! empty( $write_response ) ) {
			file_put_contents( get_plugin_instance()->dir_path . '/assets/fonts/google-fonts.json', $fonts ); //phpcs:ignore WordPressVIPMinimum.Functions.RestrictedFunctions.file_ops_file_put_contents
		}

		return $fonts;
	}

	/**
	 * Retrieves data from Fonts API
	 * *
	 *
	 * @return string|bool
	 * @throws Exception Generic exception.
	 */
	public function get_http_response() {
		$response = function_exists( 'vip_safe_wp_remote_get' ) ? vip_safe_wp_remote_get( $this->endpoint ) :
			wp_remote_get( $this->endpoint ); //phpcs:ignore WordPressVIPMinimum.Functions.RestrictedFunctions.wp_remote_get_wp_remote_get
		if ( is_wp_error( $response ) ) {
			throw new Exception( $response->get_error_message() );
		}

		$json = wp_remote_retrieve_body( $response );
		if ( is_wp_error( $json ) ) {
			throw new Exception( $response->get_error_message() );
		}

		return ! empty( $json ) ? $json : false;
	}

	/**
	 * Returns error message
	 *
	 * @return string|void
	 */
	public function material_design_no_apikey() {
		return __( 'No Google API Key defined. Please define as add <pre>define( "GOOGLE_FONTS_API_KEY", "your-key" );</pre> to <pre>wp-config.php</pre>', 'material-design' );
	}

	/**
	 * Returns error message
	 *
	 * @return string
	 */
	public function material_design_no_apikey_textonly() {
		return esc_html( wp_strip_all_tags( $this->material_design_no_apikey() ) );
	}

	/**
	 * Displays HTML error message
	 */
	public function material_design_no_apikey_error() {
		printf( '<div class="error"><p>%s</p></div>', wp_kses_post( $this->material_design_no_apikey() ) );
	}
}
