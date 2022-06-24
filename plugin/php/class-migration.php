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
 * Migration class.
 */
class Migration extends Module_Base {

	const MIGRATION_KEY = 'material_m2_to_m3_migration';

	/**
	 * Initiate the class and hooks.
	 */
	public function init() {
		add_action( 'admin_init', [ $this, 'migrate_m2_typography_settings_to_m3' ], 10, 2 );
	}

	/**
	 * Migrate m2 typography settings to m3.
	 *
	 * @return void
	 */
	public function migrate_m2_typography_settings_to_m3() {
		$migration_option = get_option( self::MIGRATION_KEY, [] );

		if ( ! empty( $migration_option['typography'] ) ) {
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

		$slug = $this->plugin->customizer_controls->slug;

		$option = get_option( $slug, [] );

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

		update_option( $slug, $option );

		$migration_option['typography'] = true;
		update_option( self::MIGRATION_KEY, $migration_option );
	}

}