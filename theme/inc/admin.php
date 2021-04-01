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
 * Admin features
 *
 * @package MaterialDesign
 */

namespace MaterialDesign\Theme\Admin;

/**
 * Attach hooks
 *
 * @return void
 */
function setup() {
	add_action( 'admin_notices', __NAMESPACE__ . '\plugin_not_installed_notice' );
	add_action( 'tgmpa_register', __NAMESPACE__ . '\register_recommended_plugins' );
}

/**
 * Show admin notice if plugin isn't installed.
 *
 * @return void
 */
function plugin_not_installed_notice() {
	$plugin = 'material-design';
	$action = false;
	$title  = '';
	$cta    = '';

	if ( ! file_exists( trailingslashit( WP_CONTENT_DIR ) . 'plugins/' . $plugin ) ) {
		$action = 'install';
		$title  = __( 'Install', 'material-design-google' );
		$cta    = __( 'Install and activate', 'material-design-google' );
	} elseif ( ! is_plugin_active( "$plugin/$plugin.php" ) ) {
		$action = 'activate';
		$cta    = __( 'Activate', 'material-design-google' );
		$title  = $cta;
	}

	// Plugin already installed and active or on the activation screen. Don't show the notice.
	if ( empty( $action ) ||
		(
			(
				'activate-plugin' === filter_input( INPUT_GET, 'tgmpa-activate', FILTER_SANITIZE_STRING ) ||
				'tgmpa-install-plugins' === filter_input( INPUT_GET, 'page', FILTER_SANITIZE_STRING )
			) &&
			filter_input( INPUT_GET, 'plugin', FILTER_SANITIZE_STRING ) === $plugin
		)
	) {
		return;
	}

	// Supress notice if WP_DEBUG is true.
	if ( defined( '\WP_DEBUG' ) && \WP_DEBUG ) {
		return;
	}

	$args = [
		'page'             => 'tgmpa-install-plugins',
		'plugin'           => $plugin,
		'tgmpa-' . $action => $action . '-plugin',
		'tgmpa-nonce'      => wp_create_nonce( 'tgmpa-' . $action ),
	];

	$action_link = sprintf(
		'<a href="%1$s">%2$s %3$s</a>',
		esc_url( add_query_arg( $args, admin_url( '/themes.php' ) ) ),
		esc_html( $cta ),
		esc_html__( ' the plugin', 'material-design-google' )
	);

	?>
	<style>
		.material-notice-container {
			display: flex;
			align-items: center;
			padding: 15px;
			background-color: #e7f5f9;
		}

		.material-notice-container__content {
			margin-left: 20px;
		}

		.material-notice-container__content__title {
			margin: 10px 0 5px;
		}

		.material-notice-container__content__text {
			margin: 0;
		}
	</style> <!-- styles required for notices -->
	<div class="notice notice-info is-dismissible  material-notice-container">
		<img
			src="<?php echo esc_url( get_template_directory_uri() . '/assets/images/plugin-logo.png' ); ?>"
			alt="<?php esc_attr_e( 'Material Design', 'material-design-google' ); ?>"
		/>

		<div class="material-notice-container__content">
			<h3 class="material-notice-container__content__title">
				<?php
				printf(
					'%s %s',
					esc_html( $title ),
					esc_html__(
						' the Material Design plugin to customize your Material Design theme',
						'material-design-google'
					)
				)
				?>
			</h3>
			<p class="material-notice-container__content__text">
				<?php
				echo wp_kses(
					sprintf(
						/* translators: %s: url to the plugin install/active action */
						esc_html__(
							'To take full advantage of this theme you will need the Material Design plugin. %s',
							'material-design-google'
						),
						$action_link
					),
					array( 'a' => array( 'href' => array() ) )
				)
				?>
			</p>
		</div>
	</div>
	<?php
}

/**
 * Register the recommended plugins for this theme.
 */
function register_recommended_plugins() {
	$plugins = array(
		array(
			'name'     => esc_html__( 'Material Design', 'material-design-google' ),
			'slug'     => 'material-design',
			'required' => false,
		),
	);

	$config = array(
		'id'           => 'tgmpa-material-design',
		'default_path' => '',
		'menu'         => 'tgmpa-install-plugins',
		'parent_slug'  => 'themes.php',
		'capability'   => 'edit_theme_options',
		'has_notices'  => false,
		'is_automatic' => false,
	);

	tgmpa( $plugins, $config );
}
