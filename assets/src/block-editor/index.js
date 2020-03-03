/**
 * WordPress dependencies
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import * as button from './blocks/button';
import * as recentPost from './blocks/recent-posts';
import * as handPickedPost from './blocks/hand-picked-posts';

registerBlockType( `material/${ button.name }`, button.settings );
registerBlockType( `material/${ recentPost.name }`, recentPost.settings );
registerBlockType(
	`material/${ handPickedPost.name }`,
	handPickedPost.settings
);
