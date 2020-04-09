import { __ } from '@wordpress/i18n';
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
