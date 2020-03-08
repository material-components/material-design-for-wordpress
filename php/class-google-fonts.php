<?php
/**
 * Class Google_Fonts.
 *
 * @package MaterialThemeBuilder
 */

namespace MaterialThemeBuilder;

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

		if ( ! empty( self::$list ) ) {
			return self::$list;
		}

		$json_file = get_plugin_instance()->dir_path . '/assets/fonts/google-fonts.json';

		if ( file_exists( $json_file ) ) {
			$json       = file_get_contents( $json_file ); // phpcs:ignore
			self::$list = json_decode( $json, true );
		}

		return self::$list;
	}

	/**
	 * Get list of all google font choices for select2 dropdown.
	 *
	 * @return array
	 */
	public static function get_font_choices() {
		return array_map(
			__CLASS__ . '::prepare_font_choice',
			array_keys( self::get_fonts() )
		);
	}

	/**
	 * Prepare a font choice to a select2 understandable format.
	 *
	 * @param  string $font Font to be prepared.
	 * @return array
	 */
	public static function prepare_font_choice( $font ) {
		return [
			'id'   => $font,
			'text' => $font,
		];
	}
}
