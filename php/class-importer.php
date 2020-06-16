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
	 * Location where to download featured image
	 *
	 * @var string
	 */
	public $image_location;

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
		$this->import_file    = $this->get_import_file();
		$this->image_location = $this->get_image_file();
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
	 * Return location of image to import
	 *
	 * @return string path to image
	 */
	public function get_image_file() {
		return trailingslashit( $this->plugin->dir_url ) . 'assets/images/featured.png';
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
				<img src="<?php echo esc_url( $this->plugin->asset_url( 'assets/images/plugin-Icon.svg' ) ); ?>" alt />
			</div>
			<div class="material-settings-container__content">
				<h3><?php esc_html_e( 'Setup Material plugin', 'material-theme-builder' ); ?></h3>

				<p>
					<?php esc_html_e( 'lProin leo aenean arcu mollis class vivamus vel nostra tempus', 'material-theme-builder' ); ?>
				</p>

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
		$menu       = wp_get_nav_menu_object( 'primary' );
		$menu_items = $this->get_menu_items();

		foreach ( $menu_items as $menu_item ) {
			// phpcs:disable WordPressVIPMinimum.Functions.RestrictedFunctions.get_page_by_title_get_page_by_title
			$page = get_page_by_title( $menu_item );
			// phpcs:enable
			$page_id = ! empty( $page ) ? $page->ID : null;

			wp_update_nav_menu_item(
				$menu->term_id,
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
		$locations['menu-1'] = $menu->term_id;

		set_theme_mod( 'nav_menu_locations', $locations );
	}

	/**
	 * Loops through post items and sets data for insertion
	 *
	 * @return void
	 */
	public function import_posts() {
		$posts = $this->xml->channel->item;

		$author = get_current_user_id();

		$this->featured_image = $this->upload_cover_image();
		foreach ( $posts as $post ) {
			// Bail out if a post already exists with the same title.
			if ( $this->plugin->is_wpcom_vip_prod() ) {
				$exists = wpcom_vip_get_page_by_title(
					sanitize_text_field( (string) $post->title ),
					OBJECT,
					sanitize_text_field( (string) $post->children( 'wp', true )->post_type )
				);
			} else {
				$exists = get_page_by_title( // phpcs:ignore WordPressVIPMinimum.Functions.RestrictedFunctions.get_page_by_title_get_page_by_title
					sanitize_text_field( (string) $post->title ),
					OBJECT,
					sanitize_text_field( (string) $post->children( 'wp', true )->post_type )
				);
			}

			if ( ! empty( $exists ) ) {
				continue;
			}

			$post_data = [
				'post_title'   => esc_html( $post->title ),
				'post_date'    => esc_html( $post->children( 'wp', true )->post_date ),
				'post_parent'  => intval( $post->children( 'wp', true )->post_parent ),
				'post_type'    => esc_html( $post->children( 'wp', true )->post_type ),
				'post_content' => $this->kses_post( $post->children( 'content', true )->encoded ),
				'post_status'  => 'publish',
				'post_author'  => intval( $author ),
				'meta_input'   => $this->attach_meta_data( $post ),
			];

			$post_id = $this->insert_post( $post_data, $post );
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

		// Set featured image if upload was succesful.
		if ( ! is_wp_error( $this->featured_image ) ) {
			$thumbnail = set_post_thumbnail( $post_id, $this->featured_image );
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
	 *
	 * @return void
	 */
	public function update_blog_info() {
		// phpcs:disable WordPressVIPMinimum.Functions.RestrictedFunctions.get_page_by_title_get_page_by_title
		$home_page = get_page_by_title( __( 'Home', 'material-theme-builder' ) );
		$blog_page = get_page_by_title( __( 'Blog', 'material-theme-builder' ) );
		// phpcs:enable

		if ( $home_page ) {
			update_option( 'page_on_front', $home_page->ID );
			update_option( 'show_on_front', 'page' );
		}

		if ( $blog_page ) {
			update_option( 'page_for_posts', $blog_page->ID );
		}
	}

	/**
	 * Uploads our cover image into the gallery and attach it to most recent post
	 *
	 * @return int|WP_Error Uploaded image ID, error on fail
	 */
	public function upload_cover_image() {
		$image = \media_sideload_image(
			$this->image_location,
			null,
			esc_html__( 'Material Featured Image', 'material-theme-builder' ),
			'id'
		);

		return $image;
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
