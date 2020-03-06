/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import './edit.css';

export const name = 'material/hello-world';
export const Edit = () => (
	<h2>{ __( 'Hello Editor', 'material-theme-builder' ) }</h2>
);
export const Save = () => (
	<h2>{ __( 'Hello Website', 'material-theme-builder' ) }</h2>
);

export const settings = {
	title: __( 'Hello World', 'material-theme-builder' ),
	icon: 'smiley',
	category: 'common',
	edit: Edit,
	save: Save,
};
