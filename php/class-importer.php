<?php
/**
 * Material Theme Builder Importer.
 *
 * @package MaterialThemeBuilder
 */

namespace MaterialThemeBuilder;

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
	private $xml;
	
	/**
	 * 'wp' namespace URL
	 *
	 * @var string
	 */
	const XML_NS_URI = 'http://wordpress.org/export/1.2/';

	/**
	 * Return location of file to import
	 *
	 * @return string Path to demo file
	 */
	private function get_import_file() {
		$location = $this->plugin->locate_plugin();

		return $location['dir_path'] . '/assets/demo-content.xml';
	}

	/**
	 * Render form UI
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

		<h2><?php esc_html_e( 'Material Theming Demo', 'material-theme-builder' ); ?></h2>

		<form action="<?php echo esc_url( admin_url( 'options-general.php?page=material_demo' ) ); ?>" method="post">
			<?php wp_nonce_field( 'mtb-install-demo' ); ?>
			<button class="button button-primary" name="mtb-install-demo" value="1">
				<?php esc_html_e( 'Install demo content', 'material-theme-builder' ); ?>
			</button>
		</form>

		<?php
		return ob_get_clean();
	}
	
	/**
	 * Verify nonce and init import process
	 *
	 * @return string Status message
	 */
	public function import_demo() {
		$nonce = filter_input( INPUT_POST, '_wpnonce', FILTER_SANITIZE_STRING );

		if ( ! wp_verify_nonce( $nonce, 'mtb-install-demo' ) ) {
			wp_die( esc_html__( "There's been an error performing this action, please try again", 'material-theme-builder' ) );
		}

		$import_file = $this->get_import_file();

		$this->xml = \simplexml_load_file( $import_file );
		
		$taxonomies = $this->import_terms();
		
		$posts = $this->import_posts();

		$this->update_blog_info();

		$this->add_menu_items();

		$this->setup_widgets();

		return '<p>' . esc_html__( 'Success! Your demo site has been setup', 'material-theme-builder' ) . '</p>';
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

		?>
		<p>
			<?php esc_html_e( 'Terms successfully imported', 'material-theme-builder' ); ?>
		</p>
		<?php
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
			wp_update_nav_menu_item(
				$menu->term_id,
				0,
				[
					'menu-item-title'  => $menu_item,
					'menu-item-status' => 'publish',
					'menu-item-url'    => '#',
				]
			);
		}

		// Set menu to "tabs" location.
		$menu_locations = get_theme_mod( 'nav_menu_locations' );

		$locations['menu-1'] = $menu->term_id;

		set_theme_mod( 'nav_menu_locations', $locations );
		?>
		<p>
			<?php esc_html_e( 'Menu items created succesfully', 'material-theme-builder' ); ?>
		</p>
		<?php
	}
	
	/**
	 * Loops through post items and sets data for insertion
	 *
	 * @return void
	 */
	public function import_posts() {
		$posts = $this->xml->channel->item;

		foreach ( $posts as $post ) {
			$post_data = [
				'post_title'   => esc_html( $post->title ),
				'post_date'    => esc_html( $post->children( 'wp', true )->post_date ),
				'post_parent'  => intval( $post->children( 'wp', true )->post_parent ),
				'post_type'    => esc_html( $post->children( 'wp', true )->post_type ),
				'post_content' => wp_kses_post( $post->children( 'content', true )->encoded ),
				'post_status'  => 'publish',
			];

			$post_data['meta_input'] = $this->attach_meta_data( $post );

			$post_id = $this->insert_post( $post_data, $post );
		}

		?>
		<p>
			<?php esc_html_e( 'Posts, comments and pages successfully imported', 'material-theme-builder' ); ?>
		</p>
		<?php
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
	 * Register widgets to use in footer sidebar
	 *
	 * @return void
	 */
	public function setup_widgets() {
		$widgets          = $this->get_widgets();
		$existing_widgets = get_option( 'sidebars_widgets' );

		// Reset footer widgets.
		$existing_widgets['footer'] = [];
		
		foreach ( $widgets as $widget_type => $widget ) {
			$existing_widgets['footer'] = array_merge( $existing_widgets['footer'], $this->build_widget_ids( $widget, $widget_type ) );

			// Save widget options in database.
			update_option( "widget_{$widget_type}", $widget );
		}

		// Save new widget status.
		update_option( 'sidebars_widgets', $existing_widgets );
	}
	
	/**
	 * Create widget ids based on their widget type
	 *
	 * @param  array  $widgets      Widgets to convert.
	 * @param  string $widget_type  Type of widget to create.
	 * @return array                Widgets to register
	 */
	public function build_widget_ids( $widgets, $widget_type ) {
		$built_widgets = [];

		foreach ( $widgets as $key => $widget ) {
			$built_widgets[] = $widget_type . '-' . $key;
		}

		return $built_widgets;
	}
	
	/**
	 * Define default widgets data
	 *
	 * @return array Widgets to include
	 */
	private function get_widgets() {
		ob_start();
		?>
		<img class="size-full wp-image-38 alignleft" src="http://localhost:8088/wp-content/uploads/2020/05/Vector.png" alt="" width="82" height="82" />Suspendisse dui mi, dictum quis porttitor quis, cursus sed sem. Quisque faucibus cursus semper. Aenean tristique eget nisl vitae euismod. Maecenas non consequat erat. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
		<?php
		$about_html = ob_get_clean();

		ob_start();
		?>
		<a href="http://twitter.com"><span class="dashicons dashicons-twitter"></span> <span class="screen-reader-text">Twitter</span></a> 
		<a href="http://facebook.com"><span class="dashicons dashicons-facebook"></span> <span class="screen-reader-text">Facebook</span></a> 
		<a href="http://instagram.com"><span class="dashicons dashicons-instagram"></span> <span class="screen-reader-text">Instagram</span></a> 
		<a href="mailto:demo@material.io"><span class="dashicons dashicons-email"></span> <span class="screen-reader-text">Email</span></a>
		<?php
		$social_html = ob_get_clean();

		return [
			'text'        => [
				[
					'title'  => esc_html__( 'Explore', 'material-theme-builder' ),
					'text'   => esc_html__( 'Pellentesque habitant morbi tristique senectus et netus', 'material-theme-builder' ),
					'filter' => true,
					'visual' => true,
				],
				[
					'title'  => '',
					'text'   => esc_html__( 'Copyright © Material. All rights reserved. Maximus nec sagittis congue, pretium vitae sem.', 'material-theme-builder' ),
					'filter' => true,
					'visual' => true,
				],
			],
			'custom_html' => [
				[
					'title'   => esc_html__( 'About Material', 'material-theme-builder' ),
					'content' => wp_kses(
						$about_html,
						[
							'img' => [
								'class'  => [],
								'src'    => [],
								'alt'    => [],
								'width'  => [],
								'height' => [],
							],
						]
					),
				],
				[
					'title'   => '',
					'content' => wp_kses(
						$social_html,
						[
							'a'    => [ 'href' => [] ],
							'span' => [ 'class' => [] ],
						]
					),
				],
			],
			'search'      => [
				[
					'title' => '',
				],
			],
		];
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
		update_option( 'blogname', 'Material Theming' );

		$home_page = get_page_by_title( 'Home' );
		$blog_page = get_page_by_title( 'Blog' );

		if ( $home_page ) {
			update_option( 'page_on_front', $home_page->ID );
			update_option( 'show_on_front', 'page' );
		}

		if ( $blog_page ) {
			update_option( 'page_for_posts', $blog_page->ID );
		}
	}
}
