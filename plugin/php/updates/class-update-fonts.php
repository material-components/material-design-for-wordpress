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
 * Class Update_Fonts.
 *
 * @package MaterialDesign
 */

namespace MaterialDesign\Plugin\Updates;

use Exception;
use stdClass;
use function json_decode;
use function MaterialDesign\Plugin\get_plugin_instance;

/**
 * Class Update_Fonts
 *
 * @package MaterialDesign\Plugin\Updates
 */
class Update_Fonts extends Updates_API_Base {

	const TRANSIENT = 'google-fonts-json';

	const LAST_UPDATED = 'google-fonts-last-updated';

	const AUTO_UPDATE_SLUG = 'google-fonts-auto-update';

	/**
	 * API option name
	 *
	 * @var string
	 */
	const API_KEY_SLUG = 'google_fonts_api_key';

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
		} elseif ( ! empty( get_option( self::get_api_slug() ) ) ) {
			$this->api_key = get_option( self::get_api_slug() );
		} else {
			$this->api_key = '';
		}

		if ( empty( $this->api_key ) ) {
			_material_design_error( [ $this, 'material_design_no_apikey_textonly' ], [ $this, 'material_design_no_apikey' ] );
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

			// Save last updated, never expire.
			set_transient( self::LAST_UPDATED, time() );
		}

		// If we still don't have fonts, fetch from local.
		if ( empty( $new ) && ! $this->force_http ) {
			$new = file_get_contents( get_plugin_instance()->dir_path . '/assets/fonts/google-fonts.json' );
			$new = json_decode( $new );
		}

		if ( empty( $new ) ) {
			return $data;
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
	 * Update fonts from Google Font API.
	 *
	 * @param boolean $write_response Shoud write the reponse to file.
	 * @return mixed
	 */
	public function update( $write_response = false ) {
		if ( $this->should_check_for_updates() ) {
			return $this->get_fonts( $write_response );
		}

		return false;
	}

	/**
	 * Returns error message
	 *
	 * @return string|void
	 */
	public function material_design_no_apikey() {
		/*
		 * translators: %s is material admin page url.
		 */
		$error = sprintf( __( 'No Google API Key defined. Please add it in <a href="%s">Material Settings</a>.', 'material-design' ), esc_url( admin_url( 'admin.php?page=material-settings-page' ) ) );

		return wp_kses(
			$error,
			[
				'a' => [
					'href' => [],
				],
			]
		);
	}

	/**
	 * Returns error message
	 *
	 * @return string
	 */
	public function material_design_no_apikey_textonly() {
		return wp_strip_all_tags( $this->material_design_no_apikey() );
	}

	/**
	 * Displays HTML error message
	 */
	public function material_design_no_apikey_error() {
		printf( '<div class="error"><p>%s</p></div>', wp_kses_post( $this->material_design_no_apikey() ) );
	}

	/**
	 * Check for existance of api key
	 *
	 * @return bool Whether api key has been added
	 */
	public function has_api_key() {
		return ! empty( $this->api_key );
	}

	/**
	 * Get last updated timestamp
	 *
	 * @return int timestamp
	 */
	public static function get_last_updated() {
		return get_transient( self::LAST_UPDATED );
	}

	/**
	 * Get Google fonts API key option slug
	 *
	 * @return string
	 */
	public static function get_api_slug() {
		return self::API_KEY_SLUG;
	}

	/**
	 * Add auto update option in database
	 * Allow or restrict auto updates
	 *
	 * @param bool $activate Wheter to auto update items. Defaults to false.
	 */
	public function toggle_auto_updates( $activate = false ) {
		return update_option( self::AUTO_UPDATE_SLUG, $activate );
	}
}
