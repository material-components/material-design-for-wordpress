/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Toolbar } from '@wordpress/components';

const DIRECTIONS = [
	{
		icon: <i className="material-icons">keyboard_arrow_left</i>,
		title: __( 'Move left', 'material-theme-builder' ),
		direction: 'left',
	},
	{
		icon: <i className="material-icons">keyboard_arrow_right</i>,
		title: __( 'Move right', 'material-theme-builder' ),
		direction: 'right',
	},
];

const OrderToolbar = ( {
	onChange,
	label = __( 'Change the tab order', 'material-theme-builder' ),
} ) => (
	<Toolbar
		label={ label }
		controls={ DIRECTIONS.map( control => ( {
			...control,
			onClick: onChange.bind( this, control.direction ),
		} ) ) }
	/>
);

export default OrderToolbar;
