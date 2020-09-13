/* istanbul ignore file */

/**
 * WordPress dependencies
 */
import { updateCategory } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import { MaterialLogo } from './helpers';
import './blocks/data-table/hooks';

/**
 * Update the material category icon to the material logo.
 */
updateCategory( 'material', {
	icon: () => <MaterialLogo />,
} );
