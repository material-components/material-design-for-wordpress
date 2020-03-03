/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Toolbar } from '@wordpress/components';

const DIRECTIONS = [
	{
		icon: <i className="material-icons">keyboard_arrow_left</i>,
		title: __( 'Move left' ),
		direction: 'left',
	},
	{
		icon: <i className="material-icons">keyboard_arrow_right</i>,
		title: __( 'Move right' ),
		direction: 'right',
	},
];

const OrderToolbar = ( { onChange, label = __( 'Change the tab order' ) } ) => (
	<Toolbar
		label={ label }
		controls={ DIRECTIONS.map( control => ( {
			...control,
			onClick: onChange.bind( this, control.direction ),
		} ) ) }
	/>
);

export default OrderToolbar;
