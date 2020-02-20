/**
 * External dependencies
 */
import classNames from 'classnames';

/**
 * Internal dependencies
 */
import hasBg from './utils/has-bg';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

const ButtonSave = ( {
	attributes: {
		label,
		url,
		style,
		iconPosition,
		icon,
		backgroundColor,
		textColor,
	},
	className,
} ) => (
	<div className={ className }>
		<a
			href={ url }
			style={ {
				...( backgroundColor && hasBg( style ) ? { backgroundColor } : {} ),
				...( textColor ? { color: textColor } : {} ),
			} }
			className={ classNames( 'mdc-button', {
				[ `mdc-button--${ style }` ]: true,
			} ) }
		>
			{ icon && iconPosition === 'leading' && (
				<i className="material-icons mdc-button__icon">
					{ String.fromCharCode( icon?.hex ) }
				</i>
			) }
			<div className="mdc-button__ripple"></div>
			<span className="mdc-button__label">
				{ label ?? __( 'BUTTON TEXT', 'material-theme-builder' ) }
			</span>
			{ icon && iconPosition === 'trailing' && (
				<i className="material-icons mdc-button__icon">
					{ String.fromCharCode( icon?.hex ) }
				</i>
			) }
		</a>
	</div>
);

export default ButtonSave;
