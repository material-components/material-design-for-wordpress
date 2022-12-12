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
 * Bootstraps migration scripts.
 *
 * @package MaterialDesign
 */

namespace MaterialDesign\Plugin;

/**
 * Migration class from m2 to m3.
 */
class Migration extends Module_Base {

	const MIGRATION_KEY = 'material_m2_to_m3_migration';

	/**
	 * Control slug key.
	 *
	 * @var string
	 */
	private $slug = '';

	/**
	 * Initiate the class and hooks.
	 */
	public function init() {
		$this->slug = $this->plugin->customizer_controls->slug;

		add_action( 'admin_init', [ $this, 'migrate_m2_typography_settings_to_m3' ] );
		add_action( 'admin_init', [ $this, 'migrate_m2_corner_radius' ] );
		add_action( 'admin_init', [ $this, 'migrate_colors' ] );
		add_action( 'admin_notices', [ $this, 'admin_notice_m3_migration' ] );

		add_action( 'wp_ajax_m3_migrate_colors', [ $this, 'ajax_migrate_colors' ] );
		add_action( 'wp_ajax_material_m3_notice', [ $this, 'notice_click' ] );
	}

	/**
	 * Get customizer option.
	 *
	 * @return array
	 */
	public function get_customizer_option() {
		return get_option( $this->slug, [] );
	}

	/**
	 * Get option for a given key.
	 *
	 * @param string $key Sub key.
	 *
	 * @return false|mixed
	 */
	public function get( $key ) {
		$migration_option = get_option( self::MIGRATION_KEY, [] );

		return isset( $migration_option[ $key ] ) ? $migration_option[ $key ] : false;
	}

	/**
	 * Update option.
	 *
	 * @param string $key Sub key.
	 *
	 * @return void
	 */
	public function update( $key ) {
		$migration_option         = get_option( self::MIGRATION_KEY, [] );
		$migration_option[ $key ] = true;
		update_option( self::MIGRATION_KEY, $migration_option );
	}

	/**
	 * Migrate m2 typography settings to m3.
	 *
	 * @return void
	 */
	public function migrate_m2_typography_settings_to_m3() {
		if ( $this->get( 'typography' ) ) {
			return;
		}

		$map = [
			'headline_1'       => 'display_small',
			'headline_2'       => 'headline_large',
			'headline_3'       => 'headline_medium',
			'headline_4'       => 'headline_small',
			'headline_5'       => 'title_large',
			'headline_6'       => 'title_large',
			'subhead_1'        => 'title_medium',
			'subhead_2'        => 'title_small',
			'body_1'           => 'body_large',
			'body_2'           => 'body_medium',
			'caption'          => 'body_small',
			'button'           => 'label_large',
			'overline'         => 'label_medium',
			'subtitle_1'       => 'label_large',
			'subtitle_2'       => 'label_medium',
			'head_font_family' => [ 'display_font_family', 'headline_font_family' ],
		];

		$option = $this->get_customizer_option();

		foreach ( $map as $m2_key => $m3_key ) {
			if ( is_array( $m3_key ) ) {
				foreach ( $m3_key as $sub_m3_key ) {
					if ( isset( $option[ $m2_key ] ) ) {
						$option[ $sub_m3_key ] = $option[ $m2_key ];
					}
				}
				unset( $option[ $m2_key ] );
			} else {
				if ( isset( $option[ $m2_key ] ) ) {
					$option[ $m3_key ] = $option[ $m2_key ];
					unset( $option[ $m2_key ] );
				}
			}
		}

		update_option( $this->slug, $option );

		$this->update( 'typography' );
	}

	/**
	 * Migrate m2 corner radius to m3.
	 *
	 * @return void
	 */
	public function migrate_m2_corner_radius() {
		if ( $this->get( 'corner_radius' ) ) {
			return;
		}
		$slug   = $this->plugin->customizer_controls->slug;
		$option = get_option( $slug, [] );
		$radius = [
			'button_radius'     => '36',
			'card_radius'       => '12',
			'chip_radius'       => '8',
			'data_table_radius' => '24',
			'image_list_radius' => '12',
			'nav_drawer_radius' => '4',
			'text_field_radius' => '4',
		];
		$option = array_merge( $option, $radius );
		update_option( $slug, $option );
		$this->update( 'corner_radius' );
	}

	/**
	 * Migrate colors.
	 *
	 * @return void
	 */
	public function migrate_colors() {
		if ( $this->get( 'color_migration' ) ) {
			return;
		}
		add_action( 'admin_enqueue_scripts', [ $this, 'admin_enqueue_scripts' ] );
	}

	/**
	 * Admin enqueue script for color migration.
	 *
	 * @return void
	 */
	public function admin_enqueue_scripts() {
		$option = $this->get_customizer_option();

		if ( isset( $option['color_palette'] ) ) {
			return;
		}

		$version = include $this->plugin->dir_path . '/assets/js/admin-m3-color-migration.asset.php';

		wp_enqueue_script(
			'material-m3-migration-color',
			$this->plugin->asset_url( 'assets/js/admin-m3-color-migration.js' ),
			array_merge( $version['dependencies'], [ 'wp-util' ] ),
			$version['version'],
			true
		);

		wp_localize_script(
			'material-m3-migration-color',
			'material_m3_migration_color',
			[
				'nonce'        => wp_create_nonce( 'material_m3_migration_color' ),
				'primaryColor' => isset( $option['primary_color'] ) ? $option['primary_color'] : $this->plugin->customizer_controls->get_default( 'primary_color' ),
			]
		);
	}

	/**
	 * Ajax migrate colors.
	 *
	 * @return void
	 */
	public function ajax_migrate_colors() {
		if ( ! isset( $_POST['_wpnonce'] ) || ! wp_verify_nonce( $_POST['_wpnonce'], 'material_m3_migration_color' ) ) { // phpcs:ignore WordPress.Security.ValidatedSanitizedInput.InputNotSanitized
			return;
		}

		$option = $this->get_customizer_option();
		if ( isset( $option['color_palette'] ) ) {
			// We already got the palette, abort.
			wp_send_json_success();
		}

		$color_palette = json_decode( wp_unslash( isset( $_POST['colorPalette'] ) ? $_POST['colorPalette'] : [] ), true ); // phpcs:ignore WordPress.Security.ValidatedSanitizedInput.InputNotSanitized

		$sanitized_color = Helpers::sanitize_js_generated_colors( $color_palette );

		$option['color_palette'] = wp_json_encode( $sanitized_color );
		update_option( $this->slug, $option );
		$this->update( 'color_migration' );
		wp_send_json_success();
	}

	/**
	 * Show admin notice when migrated from m2 to m3.
	 *
	 * @return void
	 */
	public function admin_notice_m3_migration() {
		if ( $this->get( 'admin_notice' ) ) {
			return;
		}
		$version = include $this->plugin->dir_path . '/assets/js/admin-notice-m3-migration.asset.php';

		wp_enqueue_script(
			'material-m3-notice-migration-color',
			$this->plugin->asset_url( 'assets/js/admin-notice-m3-migration.js' ),
			array_merge( $version['dependencies'], [ 'wp-util' ] ),
			$version['version'],
			true
		);

		wp_localize_script(
			'material-m3-notice-migration-color',
			'material_m3_migration_notice',
			[
				'nonce' => wp_create_nonce( 'material_m3_migration_notice' ),
			]
		);

		$customizer_url = admin_url( 'customize.php?autofocus[panel]=' . $this->plugin->customizer_controls->slug );
		printf(
			'<div id="material-theme-m3-migration" class="notice notice-info is-dismissible" style="transition:opacity 1s; opacity: 1;"><p>%s</p>',
			esc_html__( 'Your site has been updated with Material Design 3. The color palette will be generated dynamically from primary color. You can preview the site and change the source color from customizer.', 'material-design' )
		);
		echo '<div class="button-group" style="padding-bottom: 5px;">';
		printf( '<a class="material-theme-m3-migration__primary" href="%s"><button class="button button-primary" style="margin-right: 7px;">%s</button></a> ', esc_url( $customizer_url ), esc_html__( 'Go to customizer', 'material-design' ) );
		echo '</div></div>';
	}

	/**
	 * Handle notice click.
	 *
	 * @return void
	 */
	public function notice_click() {
		if ( ! isset( $_POST['_wpnonce'] ) || ! wp_verify_nonce( $_POST['_wpnonce'], 'material_m3_migration_notice' ) ) { // phpcs:ignore WordPress.Security.ValidatedSanitizedInput.InputNotSanitized
			return;
		}
		$this->update( 'admin_notice' );
		wp_send_json_success();
	}

}
