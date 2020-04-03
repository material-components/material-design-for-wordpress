/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import edit from './edit';
import BlockIcon from './components/block-icon';
import save from './save';

export const name = 'material/contact-form';

export const settings = {
	title: __( 'Contact Form', 'material-theme-builder' ),
	description: __(
		'A simple way to get feedback from folks visiting your site.',
		'material-theme-builder'
	),
	category: 'material',
	icon: BlockIcon,
	attributes: {
		emailTo: {
			type: 'string',
		},
		subject: {
			type: 'string',
			default: __(
				"You've received a new contact request",
				'material-theme-builder'
			),
		},
	},
	edit,
	save,
};
