/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import edit from './edit';
import save from './save';
import metadata from './block.json';

const { name } = metadata;

export { metadata, name };

export const settings = {
	...metadata,
	title: __( 'Tabs (Material)', 'material-theme-builder' ),
	description: __(
		'Organize and allow navigation between related groups of content.',
		'material-theme-builder'
	),
	keywords: [
		__( 'Material Tabs', 'material-theme-builder' ),
		__( 'Material Tabs', 'material-theme-builder' ),
	],
	icon: <i className="material-icons-outlined">tab</i>,
	edit,
	save,
	example: {
		attributes: {
			preview: true,
		},
	},
};
