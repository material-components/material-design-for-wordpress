/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { BasicList, TwoLineList } from './components/list-styles';

export const LIST_STYLES = [
	{
		label: __( 'Basic List Item', 'material-theme-builder' ),
		value: 'basic',
		src: BasicList,
	},
	{
		label: __( 'List Item With Secondary Text', 'material-theme-builder' ),
		value: 'two-line',
		src: TwoLineList,
	},
];

export const ICON_POSITIONS = [
	{
		label: __( 'None', 'material-theme-builder' ),
		value: 'none',
	},
	{
		label: __( 'Leading', 'material-theme-builder' ),
		value: 'leading',
	},
	{
		label: __( 'Trailing', 'material-theme-builder' ),
		value: 'trailing',
	},
];

export const ICON_SIZES = [
	{
		label: __( 'Small', 'material-theme-builder' ),
		value: 'small',
	},
	{
		label: __( 'Large', 'material-theme-builder' ),
		value: 'large',
	},
];
