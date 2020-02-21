import { __ } from '@wordpress/i18n';
import {
	TextIcon,
	OutlinedIcon,
	RaisedIcon,
	UnelevatedIcon,
} from './components/style-icons';

export default [
	{
		label: __( 'Text', 'material-theme-builder' ),
		value: 'text',
		src: TextIcon,
	},
	{
		label: __( 'Outlined', 'material-theme-builder' ),
		value: 'outlined',
		src: OutlinedIcon,
	},
	{
		label: __( 'Raised', 'material-theme-builder' ),
		value: 'raised',
		src: RaisedIcon,
	},
	{
		label: __( 'Unelevated', 'material-theme-builder' ),
		value: 'unelevated',
		src: UnelevatedIcon,
	},
];
