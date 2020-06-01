<?php
/**
 * Class Onboarding_REST_Controller.
 *
 * @package MaterialThemeBuilder
 */

namespace MaterialThemeBuilder;

use MaterialThemeBuilder\Plugin;

/**
 * Class Onboarding_REST_Controller.
 */
class Importer_REST_Controller extends \WP_REST_Controller {
	/**
	 * Constructor.
	 *
	 * @param Plugin $plugin Instance of the plugin abstraction.
	 */
	public function __construct( $plugin ) {
		$this->plugin    = $plugin;
		$this->namespace = 'material-theme-builder/v1';
		$this->rest_base = 'importer';
	}

	/**
	 * Initiate the class.
	 */
	public function init() {
		$this->plugin->add_doc_hooks( $this );
	}

	/**
	 * Get the base URL for this controller.
	 *
	 * @return string
	 */
	public function get_rest_base_url() {
		return esc_url( rest_url( "/{$this->namespace}/{$this->rest_base}/" ) );
	}

	/**
	 * Registers the routes for the Theme API.
	 *
	 * @action rest_api_init
	 */
	public function register_routes() {
		register_rest_route(
			$this->namespace,
			'/' . $this->rest_base . '/install-content',
			[
				[
					'methods'             => \WP_REST_Server::EDITABLE,
					'callback'            => [ $this, 'import_content' ],
					'permission_callback' => [ $this, 'update_item_permissions_check' ],
				],
				'schema' => [ $this, 'get_item_schema' ],
			]
		);
	}

	/**
	 * Check if a given request has access to update options.
	 *
	 * @param  WP_REST_Request $request Full details about the request.
	 * @return WP_Error|boolean
	 */
	public function update_item_permissions_check( $request ) {
		if ( ! current_user_can( 'manage_options' ) ) {
			return new \WP_Error( 'material_rest_cannot_update', __( 'Sorry, you cannot update options.', 'material-theme-builder' ), [ 'status' => rest_authorization_required_code() ] );
		}

		return true;
	}

	/**
	 * Call to importer
	 *
	 * @param  WP_REST_Request $request Full details about the request.
	 * @return WP_Error|array Theme installation status.
	 */
	public function import_content( $request ) {
		include_once ABSPATH . 'wp-admin/includes/media.php';
		include_once ABSPATH . 'wp-admin/includes/file.php';
		include_once ABSPATH . 'wp-admin/includes/image.php';

		$result = $this->plugin->importer->init_import();

		if ( is_wp_error( $result ) || is_null( $result ) ) {
			return new \WP_Error(
				'material_importer',
				__( 'Material demo content could not be installed.', 'material-theme-builder' ),
				[ 'status' => 500 ]
			);
		}

		return [
			'slug'   => 'demo-importer',
			'name'   => 'Demo Importer',
			'status' => esc_html( $result ),
		];
	}

	/**
	 * Get the schema, conforming to JSON Schema.
	 *
	 * @return array
	 */
	public function get_item_schema() {
		$schema = [
			'$schema'    => 'http://json-schema.org/draft-04/schema#',
			'title'      => 'onboaring-import',
			'type'       => 'object',
			'properties' => [
				'slug'   => [
					'description' => __( 'Action slug.', 'material-theme-builder' ),
					'type'        => 'string',
					'context'     => [ 'view', 'edit' ],
					'readonly'    => true,
				],
				'name'   => [
					'description' => __( 'Action readable name.', 'material-theme-builder' ),
					'type'        => 'string',
					'context'     => [ 'view', 'edit' ],
					'readonly'    => true,
				],
				'status' => [
					'description' => __( 'Success status.', 'material-theme-builder' ),
					'type'        => 'string',
					'context'     => [ 'view', 'edit' ],
					'readonly'    => true,
				],
			],
		];

		return $this->add_additional_fields_schema( $schema );
	}
}
