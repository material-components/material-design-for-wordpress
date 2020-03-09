<?php
/**
 * Hand-picked Posts Block class.
 *
 * @package MaterialThemeBuilder
 */

namespace MaterialThemeBuilder\Blocks;

use MaterialThemeBuilder\Plugin;

/**
 * Hand_Picked_Posts_Block class.
 */
class Hand_Picked_Posts_Block extends Posts_List_Blocks_Base {
	/**
	 * Constructor.
	 *
	 * @access public
	 *
	 * @param Plugin $plugin Plugin instance.
	 */
	public function __construct( Plugin $plugin ) {
		parent::__construct( $plugin );

		$this->block_name = 'material/hand-picked-posts';

		$this->block_extra_attributes = [
			'posts'    => [
				'type'    => 'array',
				'default' => [],
				'items'   => [ 'type' => 'integer' ],
			],
			'editMode' => [
				'type'    => 'boolean',
				'default' => true,
			],
		];
	}
}
