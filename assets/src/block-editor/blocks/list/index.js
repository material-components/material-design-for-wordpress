/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import edit from './edit';
import save from './save';
import {
	name as listItemName,
	settings as listItemSettings,
} from './inner-blocks/list-item';

registerBlockType( listItemName, listItemSettings );

export const name = 'material/list';

export const settings = {
	title: __( 'List', 'material-theme-builder' ),
	description: __( 'List stuff in a list', 'material-theme-builder' ),
	category: 'material',
	icon: <i className="material-icons">list</i>,
	attributes: {
		iconPosition: {
			type: 'string',
			default: 'none',
		},
	},
	edit,
	save,
};
