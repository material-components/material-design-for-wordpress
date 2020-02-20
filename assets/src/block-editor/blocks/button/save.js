/**
 * External dependencies
 */
import classNames from 'classnames';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

const ButtonSave = ( {
	attributes: { label, url, style, iconPosition, icon },
	className,
} ) => (
	<div className={ className }>
		<a
			href={ url }
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
