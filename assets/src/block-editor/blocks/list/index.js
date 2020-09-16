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
import transforms from './transforms';
import { example } from './example';

const { name } = metadata;

export { metadata, name };

export const settings = {
	title: __( 'List (Material)', 'material-theme-builder' ),
	description: __(
		'Display text or images in a continuous, vertical index.',
		'material-theme-builder'
	),
	icon: <i className="material-icons-outlined">list_alt</i>,
	keywords: [ __( 'Material List', 'material-theme-builder' ), 'mlist' ],
	edit,
	save,
	example,
	transforms,
};
