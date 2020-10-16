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
 * Class Google_Fonts.
 *
 * @package MaterialDesign
 */

namespace MaterialDesign\Plugin;

/**
 * Google Fonts control.
 */
class Google_Fonts {

	/**
	 * List of all google fonts.
	 *
	 * @var array
	 */
	public static $list = [];

	/**
	 * Get list of all google fonts.
	 *
	 * @return array
	 */
	public static function get_fonts() {

		if ( empty( self::$list ) ) {
			$json_file = get_plugin_instance()->dir_path . '/assets/fonts/google-fonts.json';

			if ( file_exists( $json_file ) ) {
				$json       = file_get_contents( $json_file ); // phpcs:ignore WordPressVIPMinimum.Performance.FetchingRemoteData.FileGetContentsUnknown
				self::$list = json_decode( $json, true );
			}
		}

		/**
		 * Filter Google Fonts list.
		 *
		 * @param array $list Google fonts list.
		 */
		return apply_filters( 'material_design_google_fonts_list', self::$list );
	}

	/**
	 * Get list of all google font choices for select2 dropdown.
	 *
	 * @return array
	 */
	public static function get_font_choices() {
		$choices = [];

		foreach ( self::get_fonts() as $key => $font ) {
			$choices[ $key ] = self::prepare_font_choice( $key, $font );
		}

		/**
		 * Filter Google Fonts choices.
		 *
		 * @param array $choices Google fonts choices.
		 */
		return apply_filters( 'material_design_google_fonts_choices', $choices );
	}

	/**
	 * Prepare a font choice to a select2 understandable format.
	 *
	 * @param  string $font_key Font to be prepared.
	 * @param  string $font Font information.
	 * @return array
	 */
	public static function prepare_font_choice( $font_key, $font ) {
		return [
			'id'       => $font_key,
			'text'     => $font_key,
			'variants' => ( ! empty( $font['variants'] ) ) ? $font['variants'] : [],
		];
	}
}
