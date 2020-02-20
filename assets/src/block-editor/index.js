/**
 * WordPress dependencies
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import * as button from './blocks/button';
import * as recentPost from './blocks/recent-posts';

registerBlockType( `material/${ button.name }`, button.settings );
registerBlockType( `material/${ recentPost.name }`, recentPost.settings );
