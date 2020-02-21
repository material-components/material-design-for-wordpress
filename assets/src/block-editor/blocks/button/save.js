/**
 * External dependencies
 */
import classNames from 'classnames';

/**
 * Internal dependencies
 */
import hasBg from './utils/has-bg';

const ButtonSave = ( {
	attributes: {
		rel,
		url,
		icon,
		label,
		style,
		textColor,
		linkTarget,
		cornerRadius,
		iconPosition,
		backgroundColor,
	},
	className,
} ) => (
	<div className={ className }>
		<a
			href={ url ?? '#' }
			rel={ rel }
			target={ linkTarget ?? undefined }
			style={ {
				...( backgroundColor && hasBg( style ) ? { backgroundColor } : {} ),
				...( textColor ? { color: textColor } : {} ),
				...( cornerRadius !== undefined ? { borderRadius: cornerRadius } : {} ),
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
			<span className="mdc-button__label">{ label }</span>
			{ icon && iconPosition === 'trailing' && (
				<i className="material-icons mdc-button__icon">
					{ String.fromCharCode( icon?.hex ) }
				</i>
			) }
		</a>
	</div>
);

export default ButtonSave;
