<?php
/**
 * Material Theme Builder Importer.
 *
 * @package MaterialThemeBuilder
 */

namespace MaterialThemeBuilder;

use MaterialThemeBuilder\Plugin;

/**
 * Plugin Importer class.
 *
 * @package MaterialThemeBuilder
 */
class Importer extends Module_Base {
	/**
	 * XML markup
	 *
	 * @var DOMDocument
	 */
	public $xml;

	/**
	 * Featured image ID to attach
	 *
	 * @var int
	 */
	private $featured_image;

	/**
	 * Images to import
	 *
	 * @var array
	 */
	public $images = [];

	/**
	 * Imported images lookup.
	 *
	 * @var array
	 */
	public $imported_images = [];


	/**
	 * Location of demo content file
	 *
	 * @var string
	 */
	public $import_file;

	/**
	 * Assign properties
	 *
	 * @param Plugin $plugin Plugin instance.
	 * @return void
	 */
	public function __construct( Plugin $plugin ) {
		parent::__construct( $plugin );
		$this->import_file = $this->get_import_file();

		$this->images = [
			'https://images.unsplash.com/photo-1531306760863-7fb02a41db12' => 34,
			'https://images.unsplash.com/photo-1531307119710-accdb402fe03' => 39,
			'https://images.unsplash.com/photo-1558905585-24d5d344c91d'    => 36,
			'https://images.unsplash.com/photo-1558905586-b023029262f1'    => 35,
			'https://images.unsplash.com/photo-1558905586-d9bc8798d488'    => 41,
			'https://images.unsplash.com/photo-1558906217-021abc4ab788'    => 37,
			'https://images.unsplash.com/photo-1558906217-200fade11db0'    => 27,
			'https://images.unsplash.com/photo-1558906217-665a4e06f741'    => 40,
			'https://images.unsplash.com/photo-1565314912546-0d18918fdc8f' => 38,
			'https://images.unsplash.com/photo-1565315268183-4134b0eef6e2' => 43,
			'https://images.unsplash.com/photo-1565357153781-98bf8686488a' => 33,
			'https://images.unsplash.com/photo-1566964423430-3e52903303a5' => 42,
			'https://images.unsplash.com/photo-1574191942747-140df1f9c477' => 26,
			'https://images.unsplash.com/photo-1580699133608-082eae6052a8' => 46,
			'https://images.unsplash.com/photo-1582817954171-c3533fffde89' => 50,
			'https://images.unsplash.com/photo-1582817954180-3c17b7036409' => 47,
			'https://images.unsplash.com/photo-1591404789216-d03646c78f73' => 45,
		];
	}

	/**
	 * Return location of file to import
	 *
	 * @return string Path to demo file
	 */
	public function get_import_file() {
		return trailingslashit( $this->plugin->dir_path ) . 'assets/demo-content.xml';
	}

	/**
	 * Render form UI
	 *
	 * @TODO: Rename to Material Settings
	 *
	 * @return string Markup to display in page
	 */
	public function render_page() {
		$should_import = filter_input( INPUT_POST, 'mtb-install-demo', FILTER_SANITIZE_NUMBER_INT );

		if ( $should_import ) {
			return $this->import_demo();
		}

		ob_start();
		?>

		<h1><?php esc_html_e( 'Material Settings', 'material-theme-builder' ); ?></h1>

		<div class="material-settings-container material-notice-container">
			<div class="material-settings__logo">
				<img src="<?php echo esc_url( $this->plugin->asset_url( 'assets/images/plugin-logo.png' ) ); ?>" alt />
			</div>
			<div class="material-settings-container__content">
				<h3><?php esc_html_e( 'Setup Material plugin', 'material-theme-builder' ); ?></h3>

				<p>
					<a href="<?php echo esc_url( 'admin.php?page=material-theme-builder' ); ?>"><?php esc_html_e( 'Get started with the onboarding wizard', 'material-theme-builder' ); ?></a>
				</p>
			</div>
		</div>

		<?php
		return ob_get_clean();
	}

	/**
	 * Import content after nonce verification
	 *
	 * @return string Status message
	 */
	public function init_import() {
		$this->xml = \simplexml_load_file( $this->import_file );

		$taxonomies = $this->import_terms();

		$posts = $this->import_posts();

		$this->update_blog_info();

		$this->add_menu_items();

		$this->setup_widgets();

		$this->add_custom_css();

		$this->import_and_update_images();

		return 'success';
	}

	/**
	 * Verify nonce and init import process
	 *
	 * @return void
	 */
	public function import_demo() {
		$nonce = filter_input( INPUT_POST, '_wpnonce', FILTER_SANITIZE_STRING );

		if ( ! wp_verify_nonce( $nonce, 'mtb-install-demo' ) ) {
			wp_die( esc_html__( "There's been an error performing this action, please try again", 'material-theme-builder' ) );
		}

		$this->init_import();
	}

	/**
	 * Adds terms to db
	 *
	 * @return void
	 */
	public function import_terms() {
		$terms = $this->xml->channel->children( 'wp', true )->term;

		foreach ( $terms as $term ) {
			wp_insert_term(
				esc_html( $term->children( 'wp', true )->term_name ),
				esc_html( $term->children( 'wp', true )->term_taxonomy )
			);
		}
	}

	/**
	 * Add custom menu items to menu
	 *
	 * @return void
	 */
	public function add_menu_items() {
		$menu_name = esc_html__( 'Importer Primary', 'material-theme-builder' );
		wp_delete_nav_menu( $menu_name );

		$menu_id    = wp_create_nav_menu( $menu_name );
		$menu_items = $this->get_menu_items();

		foreach ( $menu_items as $menu_item ) {
			$page    = $this->plugin->get_page_by_title( $menu_item );
			$page_id = ! empty( $page ) ? $page->ID : null;

			wp_update_nav_menu_item(
				$menu_id,
				0,
				[
					'menu-item-title'     => $menu_item,
					'menu-item-status'    => 'publish',
					'menu-item-object'    => 'page',
					'menu-item-object-id' => $page->ID,
					'menu-item-type'      => 'post_type',
				]
			);
		}

		$menu_locations = get_theme_mod( 'nav_menu_locations' );

		// Set menu to "tabs" location.
		$menu_locations['menu-1'] = $menu_id;
		$menu_locations['menu-2'] = $menu_id;

		set_theme_mod( 'nav_menu_locations', $menu_locations );
	}

	/**
	 * Import demo images and update imported content.
	 *
	 * @return void
	 */
	public function import_and_update_images() {
		$this->prime_imported_images_cache();

		foreach ( array_keys( $this->images ) as $image_url ) {
			$image_url = add_query_arg( 'w', 1200, $image_url );
			$this->import_image( $image_url );
		}

		$query = new \WP_Query(
			[
				'post_status'            => 'publish',
				'post_type'              => [ 'page', 'post' ],
				'meta_key'               => '_mtb-demo-content',
				'meta_value'             => 1, // phpcs:ignore WordPress.DB.SlowDBQuery.slow_db_query_meta_value
				'no_found_rows'          => true,
				'update_post_meta_cache' => false,
				'update_post_term_cache' => false,
			]
		);

		if ( $query->have_posts() ) {
			foreach ( $query->posts as $post ) {
				$this->update_images( $post );
			}
		}
	}

	/**
	 * Update images in a demo post to reference imported image.
	 *
	 * @param  WP_Post $post Post to update.
	 * @return void
	 */
	public function update_images( $post ) {
		foreach ( $this->images as $url => $id ) {
			$attachment = $this->get_attachment( $url );

			if ( ! empty( $attachment ) ) {

				$id_formats = [
					'"id":%s',
					'data-id="%s"',
					'wp-image-%s',
					'"mediaId":%s',
				];

				if ( preg_match_all( '#"ids"\:\[([^\]]+)\]#', $post->post_content, $matches, PREG_SET_ORDER ) ) {
					foreach ( $matches as $match ) {
						$ids = array_map(
							function( $image_id ) use ( $id ) {
								if ( absint( $image_id ) === $id ) {
									return '%s';
								}
								return $image_id;
							},
							explode( ',', $match[1] )
						);

						$id_formats[] = implode( ',', $ids );
					}
				}

				foreach ( $id_formats as $format ) {
					$post->post_content = str_replace( sprintf( $format, $id ), sprintf( $format, $attachment['id'] ), $post->post_content );
				}

				if ( preg_match_all( '#("https://images.unsplash.com/[^"]+")|(\(https://images.unsplash.com/[^)]+\))#', $post->post_content, $matches, PREG_SET_ORDER ) ) {
					foreach ( $matches as $match ) {
						$image_url  = str_replace( [ '"', '(', ')' ], '', $match[0] );
						$attachment = $this->get_attachment( $image_url );

						if ( ! empty( $attachment ) ) {
							$post->post_content = str_replace( $image_url, $attachment['url'], $post->post_content );
						}
					}
				}
			}
		}

		wp_update_post( $post );
	}

	/**
	 * Update block innerContent by replacing URL
	 *
	 * @param array  $inner_content InnerContent of a block.
	 * @param string $url_to_replace URL to replace.
	 * @param string $actual_url Replacement URL.
	 * @return array
	 */
	protected function update_block_inner_content( $inner_content, $url_to_replace, $actual_url ) {
		if ( ! empty( $inner_content ) && is_array( $inner_content ) ) {
			foreach ( $inner_content as $i => $content ) {
				$inner_content[ $i ] = str_replace( $url_to_replace, $actual_url, $content );
			}
		}

		return $inner_content;
	}

	/**
	 * Import image to a temp directory and move it into WP content directory.
	 *
	 * @param string $image_url URL of the image to import.
	 *
	 * @return array|string|WP_Error
	 */
	public function import_image( $image_url ) {
		// @codeCoverageIgnoreStart
		if ( ! function_exists( 'download_url' ) ) {
			require_once ABSPATH . 'wp-admin/includes/media.php';
			require_once ABSPATH . 'wp-admin/includes/file.php';
			require_once ABSPATH . 'wp-admin/includes/image.php';
		}
		// @codeCoverageIgnoreEnd

		if ( ! empty( $this->get_attachment( $image_url ) ) ) {
			return;
		}

		$file_array = [];
		$full_url   = explode( '?', $image_url )[0];
		$tmp        = download_url( $image_url );
		// If there was an error downloading, return the error.

		// @codeCoverageIgnoreStart
		if ( is_wp_error( $tmp ) ) {
			return $tmp;
		}
		// @codeCoverageIgnoreEnd

		$name                   = 'material-demo-' . wp_basename( $full_url );
		$file_array['name']     = $name . '.jpeg';
		$file_array['tmp_name'] = $tmp;
		$file_array['type']     = 'image/jpeg';
		$file_array['ext']      = 'jpeg';

		// Pass off to WP to handle the actual upload.
		$overrides = [
			'test_form' => false,
			'action'    => 'wp_handle_sideload',
		];

		// Bypasses is_uploaded_file() when running unit tests.
		if ( defined( 'DIR_TESTDATA' ) && DIR_TESTDATA ) {
			$overrides['action'] = 'wp_handle_mock_upload';
		}

		$file = wp_handle_upload( $file_array, $overrides );
		// @codeCoverageIgnoreStart
		if ( isset( $file['error'] ) ) {
			return new WP_Error(
				'rest_upload_unknown_error',
				$file['error']
			);
		}

		if ( is_wp_error( $file ) ) {
			return $file;
		}

		if ( empty( $file ) || ! is_array( $file ) ) {
			return new WP_Error( 'no_file_found', esc_html__( 'No file found', 'material-theme-builder' ) );
		}
		// @codeCoverageIgnoreEnd

		$url  = $file['url'];
		$file = $file['file'];

		$attachment = [
			'post_content'   => '',
			'post_title'     => $name,
			'post_mime_type' => 'image/jpeg',
			'guid'           => $url,
			'meta_input'     => [
				'original_link' => $full_url,
			],
		];

		$attachment_id = wp_insert_attachment( wp_slash( $attachment ), $file, 0, true );

		if ( ! empty( $attachment_id ) && ! is_wp_error( $attachment_id ) ) {
			$this->imported_images[ $full_url ] = [
				'id'  => $attachment_id,
				'url' => $url,
			];

			$file     = get_attached_file( $attachment_id );
			$new_meta = wp_generate_attachment_metadata( $attachment_id, $file );

			wp_update_attachment_metadata( $attachment_id, $new_meta );
		}

		return $attachment_id;
	}

	/**
	 * Loops through post items and sets data for insertion
	 *
	 * @return void
	 */
	public function import_posts() {
		$posts = $this->xml->channel->item;

		$author = get_current_user_id();

		foreach ( $posts as $post ) {
			// Bail out if a published post already exists with the same title.
			$existing = $this->plugin->get_page_by_title( (string) $post->title, OBJECT, (string) $post->children( 'wp', true )->post_type );
			if ( ! empty( $existing ) && 'publish' === $existing->post_status ) {
				continue;
			}

			$post_data = [
				'post_title'     => esc_html( $post->title ),
				'post_date'      => esc_html( $post->children( 'wp', true )->post_date ),
				'post_parent'    => intval( $post->children( 'wp', true )->post_parent ),
				'post_type'      => esc_html( $post->children( 'wp', true )->post_type ),
				'post_content'   => $this->kses_post( $post->children( 'content', true )->encoded ),
				'post_status'    => 'publish',
				'post_author'    => intval( $author ),
				'meta_input'     => $this->attach_meta_data( $post ),
				'post_thumbnail' => esc_url( $post->image ),
			];

			$post_id = $this->insert_post( $post_data, $post );
		}
	}

	/**
	 * Get attachment using original link.
	 *
	 * @param  string $image_url Original image URL.
	 * @return mixed
	 */
	public function get_attachment( $image_url ) {
		$full_url = explode( '?', $image_url )[0];
		if ( isset( $this->imported_images[ $full_url ] ) ) {
			return $this->imported_images[ $full_url ];
		}

		return false;
	}

	/**
	 * Prime imported images cache.
	 *
	 * @return void
	 */
	public function prime_imported_images_cache() {
		$query = new \WP_Query(
			[
				'posts_per_page'         => 50,
				'post_status'            => 'any',
				'post_type'              => 'attachment',
				'meta_key'               => 'original_link',
				'no_found_rows'          => true,
				'update_post_meta_cache' => false,
				'update_post_term_cache' => false,
				'fields'                 => 'ids',
			]
		);

		if ( $query->have_posts() ) {
			foreach ( $query->posts as $attachment_id ) {
				$full_url                           = get_post_meta( $attachment_id, 'original_link', true );
				$this->imported_images[ $full_url ] = [
					'id'  => $attachment_id,
					'url' => wp_get_attachment_url( $attachment_id ),
				];
			}
		}
	}

	/**
	 * Loops through xml meta data and creates and array
	 * Add custom imported flag to our posts
	 *
	 * @param  SimpleXMLElement $post Current post.
	 * @return array Formatted data
	 */
	public function attach_meta_data( $post ) {
		$postmeta = [];

		foreach ( $post->children( 'wp', true )->postmeta as $meta ) {
			$postmeta[ (string) $meta->children( 'wp', true )->meta_key ] = esc_html( $meta->children( 'wp', true )->meta_value );
		}

		// Add a flag to know these were imported.
		$postmeta['_mtb-demo-content'] = 1;

		return $postmeta;
	}

	/**
	 * Attempt to create the post in database
	 *
	 * @param  array            $post_data Post data to use.
	 * @param  SimpleXMLElement $post Current post.
	 * @return bool|WP_Error The post ID on success, error on failure
	 */
	public function insert_post( $post_data, $post ) {
		$post_id = wp_insert_post( $post_data, true );

		$comments = $this->insert_comments( $post, $post_id );

		if ( ! empty( $post_data['post_thumbnail'] ) ) {
			$image_url     = add_query_arg( 'w', 1200, $post_data['post_thumbnail'] );
			$attachment_id = $this->import_image( $image_url );

			if ( ! is_wp_error( $attachment_id ) ) {
				set_post_thumbnail( $post_id, $attachment_id );
			}
		}

		return $post_id;
	}

	/**
	 * Insert comments to a certain post if any
	 *
	 * @param  SimpleXMLElement $post To import.
	 * @param  int              $post_id Created post to which attach comments.
	 * @return array Attached comments
	 */
	public function insert_comments( $post, $post_id ) {
		$comments = [];

		foreach ( $post->children( 'wp', true )->comment as $comment ) {
			$comment_data = [
				'comment_author'  => esc_html( $comment->children( 'wp', true )->comment_author ),
				'comment_content' => wp_kses_post( $comment->children( 'wp', true )->comment_content ),
				'comment_date'    => wp_kses_post( $comment->children( 'wp', true )->comment_date ),
				'comment_post_ID' => intval( $post_id ),
			];

			$comments[] = wp_insert_comment( $comment_data );
		}

		return $comments;
	}

	/**
	 * Remove widgets
	 *
	 * @return void
	 */
	public function setup_widgets() {
		$existing_widgets = get_option( 'sidebars_widgets' );

		$widgets = [
			'footer'       => [],
			'footer-right' => [],
		];

		update_option( 'sidebars_widgets', $widgets );
	}

	/**
	 * Define menu links to create
	 *
	 * @return array Menu items
	 */
	public function get_menu_items() {
		return [
			esc_html__( 'Home', 'material-theme-builder' ),
			esc_html__( 'About', 'material-theme-builder' ),
			esc_html__( 'Projects', 'material-theme-builder' ),
			esc_html__( 'Blog', 'material-theme-builder' ),
			esc_html__( 'Contact', 'material-theme-builder' ),
		];
	}

	/**
	 * Update blog name, and frontpage
	 * Add search in header
	 *
	 * @return void
	 */
	public function update_blog_info() {
		$home_page = $this->plugin->get_page_by_title( __( 'Home', 'material-theme-builder' ) );
		$blog_page = $this->plugin->get_page_by_title( __( 'Blog', 'material-theme-builder' ) );

		set_theme_mod( 'material_header_search_display', true );

		if ( $home_page ) {
			update_option( 'page_on_front', $home_page->ID );
			update_option( 'show_on_front', 'page' );
		}

		if ( $blog_page ) {
			update_option( 'page_for_posts', $blog_page->ID );
		}

		set_theme_mod( 'material_header_search_display', true );
	}

	/**
	 * Filters out the same tags as wp_kses_post, but allows tabindex for <div>, <span> and <li> elements
	 * and allows input and textarea elements.
	 *
	 * @param string $content Content to filter through kses.
	 * @return string
	 */
	public function kses_post( $content ) {
		add_filter( 'safe_style_css', [ $this, 'safe_style_css' ] );

		$content = wp_kses(
			$content,
			array_replace_recursive(
				wp_kses_allowed_html( 'post' ),
				[
					'li'       => [
						'tabindex' => true,
					],
					'div'      => [
						'tabindex' => true,
					],
					'span'     => [
						'tabindex' => true,
					],
					'input'    => [
						'id'              => true,
						'name'            => true,
						'type'            => true,
						'required'        => true,
						'class'           => true,
						'aria-labelledby' => true,
						'aria-label'      => true,
						'data-form'       => true,
						'data-meta'       => true,
						'data-label'      => true,
					],
					'textarea' => [
						'id'              => true,
						'name'            => true,
						'rows'            => true,
						'required'        => true,
						'class'           => true,
						'aria-labelledby' => true,
						'aria-label'      => true,
						'data-form'       => true,
						'data-meta'       => true,
						'data-label'      => true,
					],
				]
			)
		);

		remove_filter( 'safe_style_css', [ $this, 'safe_style_css' ] );

		return $content;
	}

	/**
	 * Add `border-radius` css attr to safe list.
	 * required for back-compat for WP versions less than 5.2.
	 *
	 * @param array $attr Attribute list.
	 * @return array.
	 */
	public function safe_style_css( $attr ) {
		$attr[] = 'border-radius';
		return $attr;
	}

	/**
	 * Hide Page title in homepage
	 *
	 * @return int|WP_Error The post ID or false if the value could not be saved.
	 */
	public function add_custom_css() {
		$custom_css_post = wp_get_custom_css_post( Plugin::THEME_SLUG );
		$custom_css      = '.home .entry-title { display: none; }';

		if ( $custom_css_post ) {
			$custom_css = $custom_css_post->post_content . ' ' . $custom_css;
		}

		$css_post = wp_update_custom_css_post(
			$custom_css,
			[
				'stylesheet' => Plugin::THEME_SLUG,
			]
		);

		if ( $css_post instanceof WP_Error ) {
			return $css_post;
		}

		$post_id = $css_post->ID;

		// Cache post ID in theme mod for performance to avoid additional DB query.
		set_theme_mod( 'custom_css_post_id', $post_id );

		return $post_id;
	}
}
