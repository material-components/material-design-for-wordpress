<?php
/**
 * Recent Posts Block class.
 *
 * @package MaterialThemeBuilder
 */

namespace MaterialThemeBuilder\Blocks;

use MaterialThemeBuilder\Plugin;

/**
 * Recent_Posts_Block class.
 */
class Recent_Posts_Block extends Posts_List_Blocks_Base {
	/**
	 * Constructor.
	 *
	 * @access public
	 *
	 * @param Plugin $plugin Plugin instance.
	 */
	public function __construct( Plugin $plugin ) {
		parent::__construct( $plugin );
		$this->block_name = 'material/recent-posts';

		$this->block_attributes = [
			'category' => [
				'type' => 'number',
			],
		];
	}
}
