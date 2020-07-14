/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import edit from './edit';
import save from './save';

export const name = 'material/contact-form';

export const settings = {
	title: __( 'Contact Form (Material)', 'material-theme-builder' ),
	description: __(
		'A simple way to get feedback from folks visiting your site.',
		'material-theme-builder'
	),
	category: 'material',
	keywords: [ __( 'Material Contact Form', 'material-theme-builder' ) ],
	icon: <i className="material-icons-outlined">mail</i>,
	example: {
		attributes: {
			preview: true,
		},
	},
	edit,
	save,
};
