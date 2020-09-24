import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import icon from './components/block-icon';
import edit from './edit';
import save from './save';
import metadata from './block.json';
import transforms from './transforms';

import './style.css';

export const { name } = metadata;

export const settings = {
	...metadata,
	description: __(
		'Buttons allow users to take actions, and make choices, with a single tap.',
		'material-theme-builder'
	),
	title: __( 'Button (Material)', 'material-theme-builder' ),
	icon,
	edit,
	save,
	transforms,
};
