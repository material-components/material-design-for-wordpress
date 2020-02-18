/**
 * WordPress dependencies
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import * as button from './blocks/button';

registerBlockType( `material/${ button.name }`, button.settings );
