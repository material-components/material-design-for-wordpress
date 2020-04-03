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
		type,
		label,
		style,
		textColor,
		linkTarget,
		cornerRadius,
		iconPosition,
		backgroundColor,
		isSubmit,
	},
	className,
} ) => {
	if ( 'icon' === type ) {
		return (
			<div className={ className }>
				<a
					href={ url && ! isSubmit ? url : '#' }
					rel={ rel && ! isSubmit ? rel : undefined }
					target={ linkTarget && ! isSubmit ? linkTarget : undefined }
					className={ classNames( 'material-icons', 'mdc-icon-button', {
						'is-submit': isSubmit,
					} ) }
					style={ { ...( textColor ? { color: textColor } : {} ) } }
				>
					{ String.fromCharCode( icon?.hex ) }
				</a>
			</div>
		);
	}

	return (
		<div className={ className }>
			<a
				href={ url && ! isSubmit ? url : '#' }
				rel={ rel && ! isSubmit ? rel : undefined }
				target={ linkTarget && ! isSubmit ? linkTarget : undefined }
				style={ {
					...( backgroundColor && hasBg( style ) ? { backgroundColor } : {} ),
					...( textColor ? { color: textColor } : {} ),
					...( cornerRadius !== undefined
						? { borderRadius: `${ cornerRadius }px` }
						: {} ),
				} }
				className={ classNames( 'mdc-button', {
					'is-submit': isSubmit,
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
};

export default ButtonSave;
