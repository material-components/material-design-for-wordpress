/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import './style.css';
import edit from './edit';
import save from './save';
import metadata from './block.json';
import { example } from './example';

const { name } = metadata;

export { metadata, name };

export const settings = {
	title: __( 'List (Material)', 'material-theme-builder' ),
	description: __(
		'Lists allow you to list out your information in a clear manner.',
		'material-theme-builder'
	),
	icon: <i className="material-icons-outlined">list_alt</i>,
	keywords: [ __( 'Material List', 'material-theme-builder' ), 'mlist' ],
	edit,
	save,
	example,
};
